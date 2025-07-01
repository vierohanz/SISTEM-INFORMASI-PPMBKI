<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class artikel_divisi extends Model
{
    use Notifiable,
        SoftDeletes,
        HasFactory;

    protected $table = 'artikel_divisi';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;
    protected $guarded = [];
    public function divisi()
    {
        return $this->belongsTo(divisi::class);
    }
}
