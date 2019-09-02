<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Property;
use DB;
use Arr;
use App\Models\Alert;

class PropertiesController extends Controller
{
    public function get(Request $Request)
    {
        try{

            $Builder = Property::with('type')
                ->join('districts', 'properties.district_id', 'districts.id')
                ->join('regions', 'regions.id', 'districts.region_id')
                ->with('district', 'author');

            // Apply filters
            // Areas
            $areas = $Request->input('data.areas');
            if(!empty($areas)){
                $areaUUIDs = Arr::pluck($areas, 'uuid');

                $Builder->where(function($q) use ($areaUUIDs){
                    $q->whereIn('districts.uuid', $areaUUIDs);
                    $q->orWhereIn('regions.uuid', $areaUUIDs);
                });
            }

            $Properties = $Builder
                ->select([
                    DB::raw('properties.*')
                ])
                ->get()
                ->keyBy('id');

            return response()->json($Properties);
        }catch (\Exception $e){
            $Alert = (new Alert())->error($e);

            return response()->json($Alert, $Alert->code());
        }
    }
}
