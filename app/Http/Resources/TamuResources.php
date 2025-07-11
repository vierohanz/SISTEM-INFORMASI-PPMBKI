<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TamuResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'nama_kamar' => $this->nama,
            'kapasitas' => $this->kapasitas,
            'status' => $this->status,
            'deskripsi' => $this->deskripsi,
            'foto' => $this->foto,
        ];
    }
}
