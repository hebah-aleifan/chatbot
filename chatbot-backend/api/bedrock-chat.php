<?php
require_once '../vendor/autoload.php';

use Aws\BedrockRuntime\BedrockRuntimeClient;
use Aws\Exception\AwsException;

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['message']) || empty(trim($input['message']))) {
    http_response_code(400);
    echo json_encode(['error' => 'Message is required']);
    exit();
}

$message = trim($input['message']);

try {
    $aiResponse = callBedrockService($message);
    echo json_encode(['response' => $aiResponse]);
} catch (Exception $e) {
    error_log($e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error']);
}

function callBedrockService($message) {
    $client = new BedrockRuntimeClient([
        'region' => 'us-east-1',
        'version' => 'latest'
    ]);

    $payload = [
        'inputText' => $message,
        'textGenerationConfig' => [
            'maxTokenCount' => 512,
            'temperature' => 0.7,
            'topP' => 0.9
        ]
    ];

    try {
        $result = $client->invokeModel([
            'modelId' => 'amazon.titan-text-express-v1',
            'contentType' => 'application/json',
            'accept' => 'application/json',
            'body' => json_encode($payload)
        ]);

        $response = json_decode($result['body'], true);
        return $response['results'][0]['outputText'] ?? 'No response generated';
    } catch (AwsException $e) {
        throw new Exception('Bedrock API error: ' . $e->getMessage());
    }
}
?>