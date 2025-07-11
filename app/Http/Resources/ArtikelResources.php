<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArtikelResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'nama_divisi' => $this->id_divisi->nama_divisi,
            'foto' => $this->foto,
            'judul' => $this->judul,
            'tanggal_upload' => $this->tanggal_upload,
            'deskripsi' => $this->deskripsi
        ];
    }
}
