<?php

namespace Database\Seeders;

use App\Models\divisi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class PSB extends Seeder
{
    public function run(): void
    {
        $statuses = ['Aktif', 'Tidak Aktif'];
        $currentYear = now()->year;
        $descriptions = [
            'Sebuah kegiatan yang bertujuan meningkatkan semangat kebersamaan.',
            'Acara rutin yang selalu dinanti oleh para peserta setiap tahunnya.',
            'Diperuntukkan bagi seluruh santri dengan berbagai lomba dan pelatihan.',
            'Memperkuat nilai-nilai keislaman melalui kegiatan interaktif.',
            'Menghadirkan narasumber inspiratif dari berbagai latar belakang.',
        ];

        $kemahasiswaan = divisi::where('nama_divisi', 'KEMAHASISWAAN')->first();

        if (!$kemahasiswaan) {
            throw new \Exception("Divisi KEMAHASISWAAN belum ada di tabel divisi.");
        }

        for ($i = 1; $i <= 2; $i++) {
            $tahun = $currentYear - rand(0, 3);
            DB::table('psb')->insert([
                'id_divisi' => $kemahasiswaan->id,
                'judul' => 'PSB ' . $tahun,
                'deskripsi' => 'Event ini adalah bagian dari program tahunan. ' . $descriptions[array_rand($descriptions)],
                'tanggal_upload' => Carbon::now()->subDays($i),
                'status' => $statuses[array_rand($statuses)],
                'tahun' => $tahun,
            ]);
        }
    }
}
