<?php

namespace App\Http\Controllers;

use App\Models\District;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use App\Models\Region;
use App\Models\Area;

class AreasController extends Controller
{
    /**
     * @param Request $Request
     * @return \Illuminate\Http\JsonResponse
     */
    public function get(Request $Request)
    {
        $Areas = (new Area())->get($Request->all());

        return response()->json($Areas);
    }
}
