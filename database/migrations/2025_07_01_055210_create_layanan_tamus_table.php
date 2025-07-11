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
        Schema::create('layanan_tamu', function (Blueprint $table) {
            $table->id();
            $table->string('nama')->nullable(false);
            $table->string('kapasitas')->nullable(false);
            $table->string('foto')->nullable(true);
            $table->string('deskripsi')->nullable(false);
            $table->enum('status', ['Aktif', 'Tidak Aktif'])->nullable(false);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('layanan_tamu');
    }
};
