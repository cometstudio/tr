<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropertyType extends Model
{
    public $timestamps = false;

    public function properties()
    {
        return $this->hasMany('App\Models\Property', 'type_id', 'id');
    }
}
