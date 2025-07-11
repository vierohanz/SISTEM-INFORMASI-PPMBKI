<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArtikelResources;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ArtikelController extends Controller
{
    public function index(): JsonResponse
    {
        $artikels = DB::table('artikel_divisi')
            ->join('divisi', 'artikel_divisi.id_divisi', '=', 'divisi.id')
            ->select(
                'artikel_divisi.id',
                'artikel_divisi.id_divisi',
                'artikel_divisi.judul',
                'artikel_divisi.foto',
                'artikel_divisi.tanggal_upload',
                'artikel_divisi.deskripsi',
                'divisi.nama_divisi as nama_divisi'
            )
            ->orderBy('artikel_divisi.tanggal_upload', 'desc')
            ->get()
            ->map(function ($item) {
                $item = (array) $item;
                $item['id_divisi'] = (object) ['nama_divisi' => $item['nama_divisi']];
                return (object) $item;
            });

        return response()->json([
            'success' => true,
            'message' => 'Data artikel berhasil diambil',
            'data' => ArtikelResources::collection($artikels),
        ]);
    }

    public function latest(): JsonResponse
    {
        $artikels = DB::table('artikel_divisi')
            ->join('divisi', 'artikel_divisi.id_divisi', '=', 'divisi.id')
            ->select(
                'artikel_divisi.id',
                'artikel_divisi.id_divisi',
                'artikel_divisi.judul',
                'artikel_divisi.foto',
                'artikel_divisi.tanggal_upload',
                'artikel_divisi.deskripsi',
                'divisi.nama_divisi as nama_divisi'
            )
            ->orderBy('artikel_divisi.tanggal_upload', 'desc')
            ->limit(6)
            ->get()
            ->map(function ($item) {
                $item = (array) $item;
                $item['id_divisi'] = (object) ['nama_divisi' => $item['nama_divisi']];
                return (object) $item;
            });

        return response()->json([
            'success' => true,
            'message' => 'Artikel terbaru berhasil diambil',
            'data' => ArtikelResources::collection($artikels),
        ]);
    }

    public function showAsId($id): JsonResponse
    {
        $artikel = DB::table('artikel_divisi')
            ->join('divisi', 'artikel_divisi.id_divisi', '=', 'divisi.id')
            ->select(
                'artikel_divisi.id',
                'artikel_divisi.id_divisi',
                'artikel_divisi.judul',
                'artikel_divisi.foto',
                'artikel_divisi.tanggal_upload',
                'artikel_divisi.deskripsi',
                'divisi.nama_divisi as nama_divisi'
            )
            ->where('artikel_divisi.id', $id)
            ->first();

        if (!$artikel) {
            return response()->json([
                'success' => true,
                'message' => 'Artikel tidak ditemukan',
            ], 404);
        }

        $artikel = (array) $artikel;
        $artikel['id_divisi'] = (object) ['nama_divisi' => $artikel['nama_divisi']];
        $artikel = (object) $artikel;

        return response()->json([
            'success' => true,
            'message' => 'Detail artikel berhasil diambil',
            'data' => new ArtikelResources($artikel),
        ]);
    }
}
