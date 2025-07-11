<?php

namespace App\Http\Controllers;

use App\Http\Resources\PSBResources;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PSBController extends Controller
{
    public function index(): JsonResponse
    {
        $artikels = DB::table('psb')
            ->join('divisi', 'psb.id_divisi', '=', 'divisi.id')
            ->select(
                'psb.id',
                'psb.id_divisi',
                'psb.judul',
                'psb.foto',
                'psb.tanggal_upload',
                'psb.status',
                'psb.tahun',
                'psb.deskripsi',
                'divisi.nama_divisi as nama_divisi'
            )
            ->orderBy('psb.tanggal_upload', 'desc')
            ->get()
            ->map(function ($item) {
                $item = (array) $item;
                $item['id_divisi'] = (object) ['nama_divisi' => $item['nama_divisi']];
                return (object) $item;
            });

        return response()->json([
            'success' => true,
            'message' => 'Data psb berhasil diambil',
            'data' => PSBResources::collection($artikels),
        ]);
    }

    public function latest(): JsonResponse
    {
        $artikels = DB::table('psb')
            ->join('divisi', 'psb.id_divisi', '=', 'divisi.id')
            ->select(
                'psb.id',
                'psb.id_divisi',
                'psb.judul',
                'psb.foto',
                'psb.tanggal_upload',
                'psb.status',
                'psb.tahun',
                'psb.deskripsi',
                'divisi.nama_divisi as nama_divisi'
            )
            ->orderBy('psb.tanggal_upload', 'desc')
            ->limit(6)
            ->get()
            ->map(function ($item) {
                $item = (array) $item;
                $item['id_divisi'] = (object) ['nama_divisi' => $item['nama_divisi']];
                return (object) $item;
            });

        return response()->json([
            'success' => true,
            'message' => 'psb terbaru berhasil diambil',
            'data' => PSBResources::collection($artikels),
        ]);
    }

    public function showAsId($id): JsonResponse
    {
        $artikel = DB::table('psb')
            ->join('divisi', 'psb.id_divisi', '=', 'divisi.id')
            ->select(
                'psb.id',
                'psb.id_divisi',
                'psb.judul',
                'psb.foto',
                'psb.tanggal_upload',
                'psb.status',
                'psb.tahun',
                'psb.deskripsi',
                'divisi.nama_divisi as nama_divisi'
            )
            ->where('psb.id', $id)
            ->first();

        if (!$artikel) {
            return response()->json([
                'success' => true,
                'message' => 'PSB tidak ditemukan',
            ], 404);
        }

        $artikel = (array) $artikel;
        $artikel['id_divisi'] = (object) ['nama_divisi' => $artikel['nama_divisi']];
        $artikel = (object) $artikel;

        return response()->json([
            'success' => true,
            'message' => 'Detail psb berhasil diambil',
            'data' => new PSBResources($artikel),
        ]);
    }

    public function storePendaftaran(Request $request, $id_psb)
    {
        // Cek apakah PSB dengan id tersebut ada dan statusnya Aktif
        $psb = DB::table('psb')->where('id', $id_psb)->where('status', 'Aktif')->first();

        if (!$psb) {
            return response()->json([
                'success' => false,
                'message' => 'Pendaftaran tidak tersedia untuk PSB ini.',
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:pendaftaran_psb,email',
            'nama_lengkap' => 'required|string|max:255',
            'nama_panggilan' => 'nullable|string|max:255',
            'kota_lahir' => 'required|string',
            'tanggal_lahir' => 'required|date',
            'kota' => 'required|string',
            'phone' => 'required|string',
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
            'anak_keberapa' => 'required|integer',
            'jumlah_saudara' => 'required|string',
            'instagram' => 'nullable|string',
            'kampus' => 'required|string',
            'jalur_masuk' => 'required|string',
            'beasiswa' => 'required|in:Iya,Tidak',
            'jurusan' => 'required|string',
            'angkatan' => 'required|string',
            'tau_ppm_dari_mana' => 'required|string',
            'bawa_kendaraan' => 'required|in:Iya,Tidak',
            'kendaraan' => 'required|in:Motor,Mobil,Lainnya',
            'deskripsi_diri' => 'required|string',
            'latar_belakang_keluarga' => 'required|string',
            'tempat_tinggal' => 'required|string',
            'alamat' => 'required|string',
            'pos' => 'required|integer',
            'golongan_darah' => 'required|in:A,B,AB,O',
            'tinggi_badan' => 'required|string',
            'berat_badan' => 'required|string',
            'riwayat_kesehatan' => 'required|string',
            'nama_ayah' => 'required|string',
            'pekerjaan_ayah' => 'required|string',
            'phone_ayah' => 'required|string',
            'nama_ibu' => 'required|string',
            'pekerjaan_ibu' => 'required|string',
            'phone_ibu' => 'required|string',
            'nama_wali' => 'required|string',
            'pekerjaan_wali' => 'required|string',
            'phone_wali' => 'required|string',
            'prestasi' => 'required|string',
            'minat' => 'required|string',
            'bakat' => 'required|in:Desain,Teknologi,Pendidikan,Olahraga',
            'pengalaman_sekolah' => 'required|in:OSIS,Kepanitiaan,Lainnya',
            'upload_biodata_calon_santri' => 'required|json',
            'upload_bukti_diterima_kuliah' => 'required|json',
            'upload_foto_setengah_badan' => 'required|json',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();
        $data['id_psb'] = $id_psb;

        DB::table('pendaftaran_psb')->insert($data);

        return response()->json([
            'success' => true,
            'message' => 'Pendaftaran berhasil disimpan'
        ]);
    }
}
