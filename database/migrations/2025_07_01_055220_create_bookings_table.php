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
        Schema::create('booking', function (Blueprint $table) {
            $table->id();
            $table->integer('id_layanan_tamu');
            $table->foreign('id_layanan_tamu')->references('id')->on('layanan_tamu')->cascadeOnUpdate()->cascadeOnDelete();
            $table->string('nama_tamu')->nullable(false);
            $table->date('tanggal_datang')->nullable(false);
            $table->date('tanggal_keluar')->nullable(false);
            $table->integer('kuantitas')->nullable(false);
            $table->string('deskripsi')->nullable(false);
            $table->enum('status', ['Aktif', 'Tidak Aktif'])->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking');
    }
};
