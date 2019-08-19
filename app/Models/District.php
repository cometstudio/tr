<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    public $timestamps = false;

    public function region()
    {
        return $this->belongsTo('App\Models\Region', 'region_id', 'id')->orderBy('name');
    }
}
