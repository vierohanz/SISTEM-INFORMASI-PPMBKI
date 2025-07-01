<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class booking extends Model
{
    use Notifiable,
        SoftDeletes,
        HasFactory;

    protected $table = 'booking';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;
    protected $guarded = [];

    public function layanan_tamu()
    {
        return $this->belongsTo(layanan_tamu::class);
    }
}
