<?php

Route::get('/login', function(){
    return 'Docs';
})->name('login');

/** Vue App if no match */

Route::get('/{any?}', function () {
    return \File::get(public_path() . '/index.html');
})->where('any', '.*')->name('vue');
