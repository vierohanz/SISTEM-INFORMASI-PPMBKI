<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Divisi extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('divisi')->insert([
            [
                'nama_divisi' => 'DIVOR',
                'deskripsi' => 'Menangani pengelolaan struktur organisasi, internalisasi, serta kebutuhan rumah tangga organisasi secara umum.',
            ],
            [
                'nama_divisi' => 'HUMED',
                'deskripsi' => 'Mengelola hubungan eksternal, publikasi, dokumentasi kegiatan, serta menjaga citra organisasi di masyarakat.',
            ],
            [
                'nama_divisi' => 'HSC',
                'deskripsi' => 'Bergerak di bidang kesehatan dan sosial, seperti penyuluhan kesehatan, kegiatan sosial, dan donasi kemanusiaan.',
            ],
            [
                'nama_divisi' => 'KEMAHASISWAAN',
                'deskripsi' => 'Fokus pada pengembangan potensi, minat, bakat, dan kesejahteraan mahasiswa melalui program-program strategis.',
            ],
            [
                'nama_divisi' => 'RT',
                'deskripsi' => 'Bertanggung jawab terhadap kebutuhan logistik, kebersihan, dan fasilitas organisasi secara menyeluruh.',
            ],
        ]);
    }
}
