<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use DB;
use Log;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('path.public', function() {
            return base_path().'/dist';
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Log all DB queries
        if($this->app->environment('local')) {
            DB::listen(function ($query) {
                Log::info($query->sql, $query->bindings);
            });
        }

    }
}
