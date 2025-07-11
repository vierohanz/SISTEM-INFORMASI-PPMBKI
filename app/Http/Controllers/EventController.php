<?php

namespace App\Http\Controllers;

use App\Http\Resources\EventResources;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class EventController extends Controller
{
    public function index(): JsonResponse
    {
        $artikels = DB::table('event')
            ->join('divisi', 'event.id_divisi', '=', 'divisi.id')
            ->select(
                'event.id',
                'event.id_divisi',
                'event.judul',
                'event.foto',
                'event.tanggal_upload',
                'event.status',
                'event.tahun',
                'event.deskripsi',
                'divisi.nama_divisi as nama_divisi'
            )
            ->orderBy('event.tanggal_upload', 'desc')
            ->get()
            ->map(function ($item) {
                $item = (array) $item;
                $item['id_divisi'] = (object) ['nama_divisi' => $item['nama_divisi']];
                return (object) $item;
            });

        return response()->json([
            'success' => true,
            'message' => 'Data event berhasil diambil',
            'data' => EventResources::collection($artikels),
        ]);
    }

    public function latest(): JsonResponse
    {
        $artikels = DB::table('event')
            ->join('divisi', 'event.id_divisi', '=', 'divisi.id')
            ->select(
                'event.id',
                'event.id_divisi',
                'event.judul',
                'event.foto',
                'event.tanggal_upload',
                'event.status',
                'event.tahun',
                'event.deskripsi',
                'divisi.nama_divisi as nama_divisi'
            )
            ->orderBy('event.tanggal_upload', 'desc')
            ->limit(6)
            ->get()
            ->map(function ($item) {
                $item = (array) $item;
                $item['id_divisi'] = (object) ['nama_divisi' => $item['nama_divisi']];
                return (object) $item;
            });

        return response()->json([
            'success' => true,
            'message' => 'Event terbaru berhasil diambil',
            'data' => EventResources::collection($artikels),
        ]);
    }

    public function showAsId($id): JsonResponse
    {
        $artikel = DB::table('event')
            ->join('divisi', 'event.id_divisi', '=', 'divisi.id')
            ->select(
                'event.id',
                'event.id_divisi',
                'event.judul',
                'event.foto',
                'event.tanggal_upload',
                'event.status',
                'event.tahun',
                'event.deskripsi',
                'divisi.nama_divisi as nama_divisi'
            )
            ->where('event.id', $id)
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
            'message' => 'Detail event berhasil diambil',
            'data' => new EventResources($artikel),
        ]);
    }
}
