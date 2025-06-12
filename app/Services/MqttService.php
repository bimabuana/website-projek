<?php

namespace App\Services;

use PhpMqtt\Client\MqttClient;
use PhpMqtt\Client\ConnectionSettings;
use Illuminate\Support\Facades\Log;

class MqttService
{
    public function publish(array $payload)
    {
        $host = config('mqtt.host');
        $port = config('mqtt.port');
        $username = config('mqtt.username');
        $password = config('mqtt.password');
        $topic = config('mqtt.topic');
        $useTls = config('mqtt.tls');

        $clientId = 'laravel-' . uniqid();

        $settings = (new ConnectionSettings)
            ->setUsername($username)
            ->setPassword($password)
            ->setUseTls($useTls)
            ->setTlsVerifyPeer(true);

        try {
            Log::info("🔌 Connecting to MQTT at $host:$port...");
            $mqtt = new MqttClient($host, $port, $clientId, MqttClient::MQTT_3_1_1);
            $mqtt->connect($settings, true);
            $mqtt->publish($topic, json_encode($payload), 0);
            $mqtt->disconnect();
            Log::info("✅ MQTT publish success: " . json_encode($payload));
        } catch (\Throwable $e) {
            Log::error("❌ MQTT error: " . $e->getMessage());
        }
    }
}
