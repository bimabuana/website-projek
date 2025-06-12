<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('device_controls', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(DB::raw('gen_random_uuid()'));
            $table->timestampTz('created_at')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestampTz('updated_at')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->boolean('water_pump')->default(false);
            $table->boolean('air_pump')->default(false);
            $table->integer('volume')->default(8000);
            $table->boolean('manual_override')->default(false);
            $table->string('mode')->default('auto');
            $table->string('source')->default('user');
        });


        // Trigger to auto-update updated_at
        DB::unprepared("
            CREATE OR REPLACE FUNCTION update_updated_at_column()
            RETURNS TRIGGER AS \$\$
            BEGIN
                NEW.updated_at = (now() at time zone 'UTC') at time zone 'Asia/Jakarta';
                RETURN NEW;
            END;
            \$\$ language 'plpgsql';

            DROP TRIGGER IF EXISTS set_updated_at ON device_controls;

            CREATE TRIGGER set_updated_at
            BEFORE UPDATE ON device_controls
            FOR EACH ROW
            EXECUTE PROCEDURE update_updated_at_column();
        ");
    }

    public function down(): void
    {
        Schema::dropIfExists('device_controls');
        DB::unprepared("DROP FUNCTION IF EXISTS update_updated_at_column()");
    }
};
