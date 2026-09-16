<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Medicine;
use Illuminate\Http\Request;

class MedicineController extends Controller
{
    // Fetch all medicines (for the list view)
    public function index()
    {
        return response()->json(Medicine::all(), 200);
    }

    // Add a new medicine (for the add form)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'quantity' => 'required|integer|min:0',
        ]);

        $medicine = Medicine::create($validated);

        return response()->json([
            'message' => 'Medicine added successfully',
            'medicine' => $medicine
        ], 201);
    }

    // Show a single medicine (for your details view)
    public function show($id)
    {
        $medicine = Medicine::find($id);
        
        if (!$medicine) {
            return response()->json(['message' => 'Medicine not found'], 404);
        }
        
        return response()->json($medicine, 200);
    }
}