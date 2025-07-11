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
        Schema::create('pendaftaran_event', function (Blueprint $table) {
            $table->id();
            $table->integer('id_event')->nullable(false);
            $table->foreign('id_event')->references('id')->on('event')->cascadeOnUpdate()->cascadeOnDelete();
            $table->string('nama_lengkap')->nullable(false);
            $table->string('asal_kelompok');
            $table->string('phone');
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan']);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pendaftaran_event');
    }
};
