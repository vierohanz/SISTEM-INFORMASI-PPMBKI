<?php

namespace Database\Seeders;

use App\Models\divisi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class Artikel extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $descriptions = [
            'Sebuah kegiatan yang bertujuan meningkatkan semangat kebersamaan.',
            'Acara rutin yang selalu dinanti oleh para peserta setiap tahunnya.',
            'Diperuntukkan bagi seluruh santri dengan berbagai lomba dan pelatihan.',
            'Memperkuat nilai-nilai keislaman melalui kegiatan interaktif.',
            'Menghadirkan narasumber inspiratif dari berbagai latar belakang.',
        ];
        for ($i = 1; $i <= 10; $i++) {
            DB::table('artikel_divisi')->insert([
                'id_divisi' => divisi::inRandomOrder()->first()->id,
                'judul' => 'Judul Artikel ' . $i,
                'tanggal_upload' => Carbon::now()->subDays($i),
                'deskripsi' => 'Event ini adalah bagian dari program tahunan. ' . $descriptions[array_rand($descriptions)],
            ]);
        }
    }
}
