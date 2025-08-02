<?php

namespace App\Http\Controllers;

use App\Http\Resources\TamuResources;
use App\Models\booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class TamuController extends Controller
{
    public function index()
    {
        $data = DB::table('layanan_tamu')
            ->where('status', 'Aktif')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Data tamu aktif berhasil diambil',
            'data' => TamuResources::collection($data)
        ]);
    }


    public function show($id)
    {
        $tamu = DB::table('layanan_tamu')
            ->where('id', $id)
            ->where('status', 'Aktif')
            ->first();

        if (!$tamu) {
            return response()->json([
                'success' => false,
                'message' => 'Tamu tidak ditemukan atau tidak aktif'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Detail kamar aktif berhasil diambil',
            'data' => new TamuResources((object) $tamu)
        ]);
    }

    public function booking_kamar()
    {
        $bookings = DB::table('booking')
        ->join('layanan_tamu', 'booking.id_layanan_tamu', '=', 'layanan_tamu.id')
        ->whereNull('booking.deleted_at')
        ->select(
            'booking.id',
            'layanan_tamu.nama as kamar',
            'booking.nama_tamu',
            'booking.tanggal_datang',
            'booking.tanggal_keluar',
            'booking.status'
        )
            ->get();
        return response()->json([
            'success' => true,
            'message' => 'Sewa Kamar berhasil difetch',
            'data' => $bookings
        ]);
    }


    public function store(Request $request, $id)
    {
        $layanan = DB::table('layanan_tamu')->where('id', $id)->first();

        if (!$layanan) {
            return response()->json([
                'success' => false,
                'message' => 'Layanan tamu tidak ditemukan',
            ], 404);
        }

        if ($layanan->status !== 'Aktif') {
            return response()->json([
                'success' => false,
                'message' => 'Layanan tamu tidak aktif, tidak dapat dibooking',
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'nama_tamu' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'tanggal_datang' => 'required|date',
            'tanggal_keluar' => 'required|date|after_or_equal:tanggal_datang',
            'kuantitas' => 'required|integer|min:1',
            'deskripsi' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $validator->validated();
        $data['id_layanan_tamu'] = $id;
        $data['status'] = 'Pending';

        if ($data['kuantitas'] > $layanan->kapasitas) {
            return response()->json([
                'success' => false,
                'message' => "Jumlah tamu melebihi kapasitas kamar ({$layanan->kapasitas}).",
            ], 422);
        }

        $overlap = DB::table('booking')
        ->where('id_layanan_tamu', $id)
            ->whereNull('deleted_at')
            ->whereIn('status', ['Pending', 'Diterima'])
            ->where(function ($query) use ($data) {
                $query->whereDate('tanggal_datang', '<', $data['tanggal_keluar'])
                ->whereDate('tanggal_keluar', '>', $data['tanggal_datang']);
            })
            ->exists();

        if ($overlap) {
            return response()->json([
                'success' => false,
                'message' => 'Kamar sudah dibooking pada rentang tanggal tersebut.',
            ], 409);
        }


        DB::table('booking')->insert($data);

        $pesan = "Assalamu'alaikum Warahmatullahi Wabarakatuh,\n\nYth. Bapak/Ibu {$data['nama_tamu']},\n\nJaza Kummulahukhoira telah melakukan pemesanan layanan tamu *{$layanan->nama}*. Permintaan kunjungan Anda telah kami terima untuk tanggal {$data['tanggal_datang']} sampai {$data['tanggal_keluar']}.\n\nKami akan menghubungi Anda kembali setelah proses verifikasi selesai.\n\nWassalamu'alaikum Warahmatullahi Wabarakatuh.";

        $waResult = $this->sendWhatsappNotification($data['phone'], $pesan);

        if ($waResult && isset($waResult['status']) && $waResult['status'] === true) {
            Log::info('✅ WA terkirim dari store()', [
                'to' => $data['phone'],
                'nama' => $data['nama_tamu'],
                'reason' => $waResult['reason'] ?? 'Unknown',
                'fonnte_response' => $waResult,
            ]);
        } else {
            Log::warning('⚠️ WA gagal dikirim dari store()', [
                'to' => $data['phone'],
                'nama' => $data['nama_tamu'],
                'reason' => $waResult['reason'] ?? 'Unknown',
                'fonnte_response' => $waResult,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Booking berhasil disimpan dengan status Pending',
        ]);
    }


    public function sendWhatsappNotification($to, $message)
    {
        try {
            $client = new \GuzzleHttp\Client();

            $res = $client->request('POST', 'https://api.fonnte.com/send', [
                'headers' => [
                    'Authorization' => env('FONNTE_TOKEN'),
                ],
                'form_params' => [
                    'target' => $to,
                    'message' => $message,
                ]
            ]);

            $body = json_decode($res->getBody(), true);

            Log::info('WhatsApp Notification Sent', [
                'to' => $to,
                'message' => $message,
                'response' => $body
            ]);

            return $body;
        } catch (\Exception $e) {
            Log::error('WhatsApp Notification Failed', [
                'to' => $to,
                'message' => $message,
                'error' => $e->getMessage(),
            ]);

            return null;
        }
    }
}
