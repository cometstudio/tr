<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\District;

class DistrictsController extends Controller
{
    public function get()
    {
        $Districts = District::with('region')->get()->keyBy('id');

        return response()->json($Districts);
    }
}
