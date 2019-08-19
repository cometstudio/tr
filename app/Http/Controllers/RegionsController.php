<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Region;

class RegionsController extends Controller
{
    public function get()
    {
        $Regions = Region::with('districts')->get()->keyBy('id');

        return response()->json($Regions);
    }
}
