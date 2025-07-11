<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class divisi extends Model
{
    use Notifiable,
        SoftDeletes,
        HasFactory;

    protected $table = 'divisi';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;
    protected $guarded = [];

    public function artikel_divisi()
    {
        return $this->hasMany(artikel_divisi::class, 'id_divisi');
    }
    public function event()
    {
        return $this->hasMany(event::class, 'id_divisi');
    }
    public function psb()
    {
        return $this->hasMany(psb::class, 'id_divisi');
    }
}
