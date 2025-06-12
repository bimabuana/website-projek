<?php

namespace App\Http\Controllers;

use App\Models\DeviceControl;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Jobs\PublishMqttMessage; // ✅ Tambahkan ini

class DeviceControlController extends Controller
{
    const MODE_AUTO = 'auto';
    const MODE_MANUAL = 'manual';

    public function index()
    {
        $control = DeviceControl::latest()->first();
        return Inertia::render('DeviceControl', ['control' => $control]);
    }

    public function getLatestStatus()
    {
        $control = DeviceControl::latest()->first();

        if (!$control) {
            return response()->json([
                'mode' => null,
                'manual_override' => false,
                'volume' => 0,
                'water_pump' => false,
                'air_pump' => false,
            ]);
        }

        return response()->json($control);
    }

    public function updateMode(Request $request)
    {
        $validated = $request->validate([
            'mode' => 'required|in:auto,manual',
        ]);

        $mode = $validated['mode'];
        $latest = DeviceControl::latest()->first();

        if ($latest && $latest->mode === $mode) {
            return response()->json(['message' => "Mode $mode sudah aktif."], 200);
        }

        $manual_override = $mode === self::MODE_MANUAL;

        // ✅ Gunakan Job Queue untuk publish MQTT
        dispatch(new PublishMqttMessage(['mode' => $mode]));

        $this->createControl([
            'mode' => $mode,
            'manual_override' => $manual_override,
            'volume' => 0,
            'water_pump' => false,
            'air_pump' => false,
        ]);

        return response()->json(['message' => "Mode $mode berhasil diaktifkan."], 200);
    }

    public function controlPump(Request $request)
    {
        $validated = $request->validate([
            'water_pump' => 'nullable|boolean',
            'air_pump' => 'nullable|boolean',
        ]);

        $latest = DeviceControl::latest()->first();

        if (!$latest || $latest->mode !== self::MODE_MANUAL) {
            return response()->json(['error' => 'Mode saat ini bukan manual.'], 403);
        }

        // ✅ Gunakan Job Queue untuk publish MQTT
        dispatch(new PublishMqttMessage($validated));

        $this->createControl([
            'mode' => self::MODE_MANUAL,
            'manual_override' => true,
            'volume' => $latest->volume,
            'water_pump' => $validated['water_pump'] ?? $latest->water_pump,
            'air_pump' => $validated['air_pump'] ?? $latest->air_pump,
        ]);

        return response()->json(['message' => 'Status pompa berhasil diperbarui.']);
    }

    public function setVolumeAuto(Request $request)
    {
        $validated = $request->validate([
            'volume' => 'required|integer|min:1000|max:10000',
        ]);

        $latest = DeviceControl::latest()->first();

        if (!$latest || $latest->mode !== self::MODE_AUTO) {
            return response()->json(['error' => 'Mode saat ini bukan auto.'], 403);
        }

        // ✅ Gunakan Job Queue untuk publish MQTT
        dispatch(new PublishMqttMessage(['volume' => $validated['volume']]));

        $this->createControl([
            'mode' => self::MODE_AUTO,
            'manual_override' => false,
            'volume' => $validated['volume'],
            'water_pump' => false,
            'air_pump' => false,
        ]);

        return response()->json(['message' => 'Volume berhasil diperbarui.']);
    }

    private function createControl(array $data)
    {
        DeviceControl::create(array_merge(['source' => 'user'], $data));
    }
}
