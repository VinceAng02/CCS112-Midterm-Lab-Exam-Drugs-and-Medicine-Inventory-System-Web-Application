<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Api\MedicineController;

// Public login route
Route::post('/login', function (Request $request) {
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();
        return response()->json(['message' => 'Logged in successfully'], 200);
    }

    return response()->json(['message' => 'Invalid credentials'], 401);
});

// PUBLIC Medicine Store Route (Allows saving data without strict cookie/token checks)
Route::post('/medicines', [MedicineController::class, 'store']);
Route::get('/medicines', [MedicineController::class, 'index']);

// Protected routes (requires user to be logged in via Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', function (Request $request) {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Logged out']);
    });

    Route::get('/medicines/{id}', [MedicineController::class, 'show']);
});