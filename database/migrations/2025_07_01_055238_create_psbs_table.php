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
        Schema::create('psb', function (Blueprint $table) {
            $table->id();
            $table->integer('id_divisi')->nullable(false);
            $table->foreign('id_divisi')->references('id')->on('divisi')->cascadeOnUpdate()->cascadeOnDelete();
            $table->string('judul')->nullable(false);
            $table->json('foto')->nullable(false);
            $table->date('tanggal_upload')->nullable(false);
            $table->longText('deskripsi')->nullable(false);
            $table->enum('status', ['Aktif', 'Tidak Aktif'])->nullable(false);
            $table->integer('tahun')->nullable(false);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('psb');
    }
};
