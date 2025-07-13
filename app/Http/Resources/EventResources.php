<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama_divisi' => $this->id_divisi->nama_divisi,
            'foto' => $this->foto,
            'judul' => $this->judul,
            'tanggal_upload' => $this->tanggal_upload,
            'status' => $this->status,
            'tahun' => $this->tahun,
            'deskripsi' => $this->deskripsi
        ];
    }
}
