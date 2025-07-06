<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class Users extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'timdevppm',
            'email' => 'timdevppm@gmail.com',
            'password' => Hash::make('Password123'), // ganti dengan password aman
            'email_verified_at' => now(),
        ]);
    }
}
