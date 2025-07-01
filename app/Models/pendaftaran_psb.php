<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class pendaftaran_psb extends Model
{
    use Notifiable,
        SoftDeletes,
        HasFactory;

    protected $table = 'pendaftaran_psb';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;
    protected $guarded = [];

    public function psb()
    {
        return $this->belongsTo(psb::class);
    }
}
