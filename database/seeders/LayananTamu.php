<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LayananTamu extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('layanan_tamu')->insert([
            [
                'nama' => 'Kamar A',
                'kapasitas' => '2',
                'deskripsi' => 'Kamar dengan fasilitas dasar untuk tamu VIP. Cocok untuk kunjungan singkat.',
                'status' => 'Aktif',
            ],
            [
                'nama' => 'Kamar B',
                'kapasitas' => '4',
                'deskripsi' => 'Kamar luas dengan dua ranjang besar. Ideal untuk keluarga atau kelompok kecil.',
                'status' => 'Aktif',
            ],
            [
                'nama' => 'Kamar C',
                'kapasitas' => '1',
                'deskripsi' => 'Kamar tunggal minimalis, cocok untuk tamu individu dengan kebutuhan dasar.',
                'status' => 'Tidak Aktif',
            ],
            [
                'nama' => 'Kamar D',
                'kapasitas' => '3',
                'deskripsi' => 'Kamar standar dengan balkon kecil dan pencahayaan alami.',
                'status' => 'Aktif',
            ],
        ]);
    }
}
