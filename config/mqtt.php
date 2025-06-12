<?php

return [
    'host' => env('MQTT_HOST'),
    'port' => env('MQTT_PORT', 1883),
    'username' => env('MQTT_USERNAME'),
    'password' => env('MQTT_PASSWORD'),
    'topic' => env('MQTT_TOPIC', 'sensor/air/control'),
    'tls' => env('MQTT_TLS', true),
];