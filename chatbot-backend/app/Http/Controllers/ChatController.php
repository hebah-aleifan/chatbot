<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Aws\BedrockRuntime\BedrockRuntimeClient;
use Aws\Exception\AwsException;

class ChatController extends Controller
{
    public function chat(Request $request): JsonResponse
    {
        $request->validate([
            'message' => 'required|string|max:1000'
        ]);

        try {
            $response = $this->callBedrockService($request->message);
            return response()->json(['response' => $response]);
        } catch (\Exception $e) {
            \Log::error('Chat API error: ' . $e->getMessage());
            return response()->json(['error' => 'Internal server error'], 500);
        }
    }

    private function callBedrockService(string $message): string
    {
        $client = new BedrockRuntimeClient([
            'region' => config('aws.region', 'us-east-1'),
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
            throw new \Exception('Bedrock API error: ' . $e->getMessage());
        }
    }
}