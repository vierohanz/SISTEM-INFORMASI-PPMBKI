<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class event extends Model
{
    use Notifiable,
        SoftDeletes,
        HasFactory;

    protected $table = 'event';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;
    protected $guarded = [];
    protected $casts = [
        'foto' => 'json',
    ];
    public function divisi()
    {
        return $this->belongsTo(divisi::class, 'id_divisi');
    }
    public function pendaftaran_event()
    {
        return $this->hasMany(pendaftaran_event::class, 'id_event');
    }
    public function komentar_event()
    {
        return $this->hasMany(komentar_event::class, 'id_event');
    }
}
