<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class komentar_artikel extends Model
{
    use Notifiable,
        SoftDeletes,
        HasFactory;

    protected $table = 'komentar_artikel';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;
    protected $guarded = [];

    public function artikel_divisi()
    {
        return $this->belongsTo(artikel_divisi::class, 'id_artikel_divisi');
    }

    public function parent()
    {
        return $this->belongsTo(self::class, 'id_parent');
    }

    public function replies()
    {
        return $this->hasMany(self::class, 'id_parent');
    }
}
