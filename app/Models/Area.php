<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;

class Area
{
    /**
     * @param array $filter
     * @return Collection
     */
    public function get(array $filter = [])
    {
        /**
         * @var $Regions Collection
         */
        $Builder = Region::with('districts');
        if(!empty($filter['q'])) $Builder->where('name', 'LIKE', '%' . $filter['q'] . '%');
        $Regions = $Builder->get();

        /**
         * @var $Districts Collection
         */
        $Builder = District::with('region');
        if(!empty($filter['q'])) $Builder->where('name', 'LIKE', '%' . $filter['q'] . '%');
        $Districts = $Builder->get();

        $Areas = $Regions->concat($Districts);

        return $Areas;
    }
}
