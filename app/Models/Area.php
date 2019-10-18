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
        $Builder = Region::select([
            'uuid',
            'name',
        ]);
        if(!empty($filter['q'])) $Builder->where('name', 'LIKE', '%' . $filter['q'] . '%');
        $Regions = $Builder->get();

        if(!empty($filter['q'])){
            /**
             * @var $Districts Collection
             */
            $Builder = District::select([
                'uuid',
                'region_id',
                'name',
            ]);
            if(!empty($filter['q'])) $Builder->where('name', 'LIKE', '%' . $filter['q'] . '%');
            $Districts = $Builder->get();
        }

        $Areas = !empty($Districts) ? $Regions->concat($Districts) : $Regions;

        return $Areas;
    }
}
