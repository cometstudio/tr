<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class District
 * @package App\Models
 * @property int $id
 * @property string $uuid
 * @property int $region_id
 * @property string $name
 */
class District extends Model
{
    public $timestamps = false;

    public function region()
    {
        return $this->belongsTo('App\Models\Region', 'region_id', 'id')->orderBy('name');
    }
}
