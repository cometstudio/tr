<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Events\UserSaving;

/**
 * Class User
 * @package App\Models
 */
class User extends Authenticatable
{
    use Notifiable;

    protected $dispatchesEvents = [
        'saving' => UserSaving::class,
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function publicProperties()
    {
        return $this->only([
            'id',
            'name',
            'email',
        ]);
    }

    public function properties()
    {
        return $this->hasMany('App\Models\Property', 'author_id', 'id')->orderByDesc('created_at');
    }
}
