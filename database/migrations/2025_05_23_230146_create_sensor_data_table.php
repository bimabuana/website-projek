<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Aktifkan ekstensi pgcrypto untuk UUID
        DB::statement('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');

        // Buat tabel sensor_data
        Schema::create('sensor_data', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->timestampTz('created_at')->nullable(); // default-nya akan kita set lewat DB::statement di bawah
            $table->decimal('turbidity_level', 10, 2)->nullable();
            $table->decimal('tds_level', 10, 2)->nullable();
            $table->decimal('volume_liter', 10, 2)->nullable();
            $table->boolean('esp_status')->nullable();
            $table->boolean('water_pump_status')->nullable();
            $table->boolean('air_pump_status')->nullable();
        });

        // Atur default created_at ke waktu Jakarta
        DB::statement("ALTER TABLE sensor_data ALTER COLUMN created_at SET DEFAULT ((now() AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Jakarta')");
    }

    public function down(): void
    {
        Schema::dropIfExists('sensor_data');
    }
};
