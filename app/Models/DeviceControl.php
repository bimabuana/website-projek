<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class DeviceControl extends Model
{
    protected $fillable = [
        'water_pump',
        'air_pump',
        'volume',
        'manual_override',
        'source',
        'mode', // tambahkan ini
    ];
}
