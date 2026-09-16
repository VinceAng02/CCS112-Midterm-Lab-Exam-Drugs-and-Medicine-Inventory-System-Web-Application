<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/run-migration', function () {
    try {
        Illuminate\Support\Facades\Artisan::call('migrate');
        return "Database table created successfully!";
    } catch (\Exception $e) {
        return "Error: " . $e->getMessage();
    }
});
