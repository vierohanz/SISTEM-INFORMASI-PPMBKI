<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pendaftaran_psb', function (Blueprint $table) {
            $table->id();
            $table->integer('id_psb')->nullable(false);
            $table->foreign('id_psb')->references('id')->on('psb')->cascadeOnUpdate()->cascadeOnDelete();
            $table->string('email')->unique();
            $table->string('nama_lengkap')->nullable(false);
            $table->string('nama_panggilan');
            $table->string('kota_lahir');
            $table->date('tanggal_lahir');
            $table->string('kota');
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan']);
            $table->integer('anak_keberapa');
            $table->string('jumlah_saudara');
            $table->integer('phone');
            $table->string('instagram');
            $table->string('kampus');
            $table->string('jalur_masuk');
            $table->enum('beasiswa', ['Iya', 'Tidak']);
            $table->string('jurusan');
            $table->string('angkatan');
            $table->string('tau_ppm_dari_mana');
            $table->enum('bawa_kendaraan', ['Iya', 'Tidak']);
            $table->enum('kendaraan', ['Motor', 'Mobil', 'Lainnya']);
            $table->string('deskripsi_diri');
            $table->string('latar_belakang_belakang');
            $table->string('tempat_tinggal');
            $table->string('alamat');
            $table->integer('pos');
            $table->enum('golongan_darah', ['A', 'B', 'AB', 'O']);
            $table->string('tinggi_badan');
            $table->string('berat_badan');
            $table->string('riwayat_kesehatan');
            $table->string('nama_ayah');
            $table->string('pekerjaan_ayah');
            $table->string('phone_ayah');
            $table->string('nama_ibu');
            $table->string('pekerjaan_ibu');
            $table->string('phone_ibu');
            $table->string('nama_wali');
            $table->string('pekerjaan_wali');
            $table->string('prestasi');
            $table->string('minat');
            $table->enum('bakat', ['Desain', 'Teknologi', 'Pendidikan', 'Olahraga']);
            $table->enum('pengalaman_sekolah', ['OSIS', 'Kepanitiaan', 'Lainnya']);
            $table->string('upload_biodata_calon_santri');
            $table->string('upload_bukti_diterima_kuliah');
            $table->string('upload_foto_setengah_badan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pendaftaran_psb');
    }
};
