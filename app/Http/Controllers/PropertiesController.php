<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Property;
use DB;

class PropertiesController extends Controller
{
    public function get(Request $Request)
    {
        $Builder = Property::with('type')
            ->join('districts', 'properties.district_id', 'districts.id')
            ->with('district', 'author');

        // Apply filters
        if($Request->get('region')) $Builder->where('districts.region_id', $Request->get('region'));
        if($Request->get('district')) $Builder->where('districts.id', $Request->get('district'));

        $Properties = $Builder
            ->select([
                DB::raw('properties.*')
            ])
            ->get()
            ->keyBy('id');

        return response()->json($Properties);
    }
}
