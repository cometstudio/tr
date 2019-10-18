<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Region
 * @package App\Models
 * @property int $id
 * @property string $uuid
 * @property string $name
 */
class Region extends Model
{
    public $timestamps = false;

    public function districts()
    {
        return $this->hasMany('App\Models\District', 'region_id', 'id')->orderBy('name');
    }
}
