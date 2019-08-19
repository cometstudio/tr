<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    public $timestamps = false;

    public function districts()
    {
        return $this->hasMany('App\Models\District', 'region_id', 'id')->orderBy('name');
    }
}
