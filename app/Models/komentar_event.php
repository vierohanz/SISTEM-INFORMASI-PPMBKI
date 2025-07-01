<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class komentar_event extends Model
{
    use Notifiable,
        SoftDeletes,
        HasFactory;

    protected $table = 'komentar_event';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;
    protected $guarded = [];

    public function event()
    {
        return $this->belongsTo(event::class);
    }
}
