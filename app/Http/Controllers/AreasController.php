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
        $filter = $Request->all();

        $Areas = (new Area())->get($filter);

        return response()->json($Areas);
    }
}
