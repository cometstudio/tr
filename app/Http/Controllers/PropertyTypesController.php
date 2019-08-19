<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PropertyType;

class PropertyTypesController extends Controller
{
    public function get()
    {
        $PropertyTypes = PropertyType::orderBy('name')->get()->keyBy('id');

        return response()->json($PropertyTypes);
    }
}
