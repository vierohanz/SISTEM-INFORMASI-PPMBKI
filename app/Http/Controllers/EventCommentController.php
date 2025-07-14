<?php

namespace App\Http\Controllers;

use App\Models\event;
use App\Models\komentar_event;
use Illuminate\Http\Request;

class EventCommentController extends Controller
{
    public function index($eventId)
    {
        $comments = komentar_event::where('id_event', $eventId)
            ->whereNull('id_parent')
            ->with('replies.replies.replies')
            ->latest()
            ->take(4)
            ->get();

        return response()->json(['data' => $comments]);
    }


    public function show($id)
    {
        $comment = komentar_event::with('replies')->findOrFail($id);
        return response()->json(['data' => $comment]);
    }

    public function store(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'konten' => 'required|string|max:255',
            'id_parent' => 'nullable|integer|exists:komentar_event,id',
        ]);

        $event = event::findOrFail($id);

        $comment = komentar_event::create([
            'id_event' => $event->id,
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
