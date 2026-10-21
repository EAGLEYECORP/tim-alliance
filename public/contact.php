<?php
/**
 * TIM ALLIANCE – form handler for the contact and newsletter forms.
 * Runs on the cPanel/PHP hosting (Genious). Sends each submission by e-mail to RECIPIENT.
 * Replies with JSON: {"ok":true} or {"ok":false,"error":"..."}.
 */

const RECIPIENT = 'contact@timalliance.ma';
// Must be an address on the site's own domain, otherwise most servers reject or spam-flag the mail.
const SENDER = 'no-reply@timalliance.ma';
const MIN_SECONDS_BETWEEN_SENDS = 30;

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function reply(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

function field(string $name, int $max = 200): string
{
    $v = isset($_POST[$name]) ? (string) $_POST[$name] : '';
    $v = trim(str_replace(["\r", "\0"], '', $v));
    return mb_substr($v, 0, $max);
}

function oneLine(string $v): string
{
    // Header-injection guard for anything that ends up in a mail header.
    return trim(preg_replace('/[\r\n]+/', ' ', $v));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    reply(405, ['ok' => false, 'error' => 'method']);
}

// Honeypot: real visitors never fill this hidden field.
if (field('bot-field') !== '') {
    reply(200, ['ok' => true]);
}

$form = field('form-name', 30);

// Light per-visitor, per-form throttle.
session_start();
$now = time();
$throttleKey = 'ta_last_send_' . preg_replace('/[^a-z]/', '', $form);
if (!empty($_SESSION[$throttleKey]) && $now - $_SESSION[$throttleKey] < MIN_SECONDS_BETWEEN_SENDS) {
    reply(429, ['ok' => false, 'error' => 'too_fast']);
}
$email = oneLine(field('email', 150));
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    reply(422, ['ok' => false, 'error' => 'email']);
}

if ($form === 'newsletter') {
    $subject = 'Site web – Nouvelle inscription newsletter';
    $lines = [
        'Nouvelle inscription à la newsletter depuis timalliance.ma',
        '',
        'E-mail : ' . $email,
    ];
} elseif ($form === 'contact') {
    $name = oneLine(field('nom', 120));
    $company = oneLine(field('entreprise', 150));
    $phone = oneLine(field('telephone', 40));
    $topic = oneLine(field('sujet', 60));
    $message = field('message', 5000);
    if ($name === '') {
        reply(422, ['ok' => false, 'error' => 'name']);
    }
    $subject = 'Site web – ' . ($topic !== '' ? $topic : 'Demande de contact') . ' – ' . $name;
    $lines = [
        'Nouveau message depuis le formulaire de contact de timalliance.ma',
        '',
        'Nom et prénom : ' . $name,
        'Entreprise    : ' . ($company !== '' ? $company : '-'),
        'E-mail        : ' . $email,
        'Téléphone     : ' . ($phone !== '' ? $phone : '-'),
        'Sujet         : ' . ($topic !== '' ? $topic : '-'),
        '',
        'Message :',
        $message !== '' ? $message : '-',
    ];
} else {
    reply(400, ['ok' => false, 'error' => 'form']);
}

$lines[] = '';
$lines[] = '—';
$lines[] = 'Envoyé le ' . date('d/m/Y à H:i') . ' depuis ' . ($_SERVER['REMOTE_ADDR'] ?? '?');

$headers = [
    'From: =?UTF-8?B?' . base64_encode('TIM ALLIANCE – Site web') . '?= <' . SENDER . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: TIM ALLIANCE website',
];

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$sent = mail(RECIPIENT, $encodedSubject, implode("\n", $lines), implode("\r\n", $headers), '-f' . SENDER);

if (!$sent) {
    reply(500, ['ok' => false, 'error' => 'mail']);
}

$_SESSION[$throttleKey] = $now;
reply(200, ['ok' => true]);
