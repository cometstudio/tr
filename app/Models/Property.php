<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    public function type()
    {
        return $this->belongsTo('App\Models\PropertyType', 'type_id', 'id');
    }

    public function district()
    {
        return $this->belongsTo('App\Models\District', 'district_id', 'id')->with('region');
    }

    public function author()
    {
        return $this->belongsTo('App\Models\User', 'author_id', 'id')->select([
            'id',
            'name',
        ]);
    }
}
