<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class layanan_tamu extends Model
{
    use Notifiable,
        SoftDeletes,
        HasFactory;

    protected $table = 'layanan_tamu';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;
    protected $guarded = [];
    public function booking()
    {
        return $this->hasMany(booking::class, 'id_layanan_tamu');
    }
}
