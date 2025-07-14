<?php

namespace App\Http\Controllers;

use App\Models\artikel_divisi;
use App\Models\komentar_artikel;
use Illuminate\Http\Request;

class ArticleCommentController extends Controller
{
    public function index($articleId)
    {
        $comments = komentar_artikel::where('id_artikel_divisi', $articleId)
            ->whereNull('id_parent')
            ->with('replies.replies.replies')
            ->latest()
            ->take(4)
            ->get();

        return response()->json(['data' => $comments]);
    }


    public function show($id)
    {
        $comment = komentar_artikel::with('replies')->findOrFail($id);
        return response()->json(['data' => $comment]);
    }

    public function store(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'konten' => 'required|string|max:255',
            'id_parent' => 'nullable|integer|exists:komentar_artikel,id',
        ]);

        $article = artikel_divisi::findOrFail($id);

        $comment = komentar_artikel::create([
            'id_artikel_divisi' => $article->id,
            'id_parent' => $request->id_parent,
            'nama' => $request->nama,
            'konten' => $request->konten,
        ]);

        return response()->json([
            'message' => 'Komentar berhasil disimpan',
            'data' => $comment,
        ], 201);
    }
}
