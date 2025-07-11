<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class psb extends Model
{
    use Notifiable,
        SoftDeletes,
        HasFactory;

    protected $table = 'psb';
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
    public function pendaftaran_psb()
    {
        return $this->hasMany(pendaftaran_psb::class, 'id_psb');
    }
}
