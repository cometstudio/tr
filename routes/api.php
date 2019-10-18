<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

// All ids must follow this pattern
Route::pattern('id', '[0-9]+');

// User
Route::prefix('user')->name('user.')->group(function () {
    Route::post('/signup', 'UserController@signup')->name('signup');
    Route::post('/login', 'UserController@login')->name('login');
    Route::post('/logout', 'UserController@logout')->name('logout');
});
// Areas
Route::prefix('areas')->name('areas.')->group(function () {
    Route::get('/', 'AreasController@get')->name('get');
});
// Regions
Route::prefix('regions')->name('regions.')->group(function () {
    Route::get('/', 'RegionsController@get')->name('get');
});
// Districts
Route::prefix('districts')->name('districts.')->group(function () {
    Route::get('/', 'DistrictsController@get')->name('get');
});
// Properties
Route::prefix('properties')->name('properties.')->group(function () {
    Route::post('/', 'PropertiesController@get')->name('get');
    // Property types
    Route::prefix('type')->name('type.')->group(function () {
        Route::get('/', 'PropertyTypesController@get')->name('get');
    });
});

// Auth is required
Route::middleware('auth:api')->group(function(){
    // User
    Route::prefix('user')->name('user.')->group(function () {
        Route::post('/', 'UserController@save')->name('save');
    });

    // SDC
    Route::prefix('sdc')->name('sdc.')->group(function () {
        Route::get('/', 'SDCController@login')->name('login');
    });
});
