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
        Schema::create('event', function (Blueprint $table) {
            $table->id();
            $table->integer('id_divisi')->nullable(false);
            $table->foreign('id_divisi')->references('id')->on('divisi')->cascadeOnUpdate()->cascadeOnDelete();
            $table->string('judul')->nullable(false);
            $table->string('foto')->nullable(false);
            $table->string('tanggal_upload')->nullable(false);
            $table->string('deskripsi')->nullable(false);
            $table->string('komentar')->nullable(false);
            $table->integer('tahun')->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event');
    }
};
