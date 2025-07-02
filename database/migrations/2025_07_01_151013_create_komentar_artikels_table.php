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
        Schema::create('komentar_artikel', function (Blueprint $table) {
            $table->id();
            $table->integer('id_artikel_divisi')->nullable(false);
            $table->foreign('id_artikel_divisi')->references('id')->on('artikel_divisi')->cascadeOnUpdate()->cascadeOnDelete();
            $table->integer('id_parent')->nullable(true);
            $table->foreign('id_parent')->references('id')->on('komentar_artikel')->cascadeOnUpdate()->cascadeOnDelete();
            $table->string('nama')->nullable(false);
            $table->string('konten')->nullable(false);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('komentar_artikel');
    }
};
