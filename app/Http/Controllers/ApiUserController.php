<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\UnauthorizedException;
use Auth;
use Log;
use Illuminate\Support\Str;

class ApiUserController extends Controller
{
    public function login(Request $Request)
    {
        try{
            $credentials = $Request->only([
                'email',
                'password',
            ]);

            if(Auth::attempt($credentials + ['disabled' => 0])) {
                // Authentication passed...
                $User = Auth::user();

                $data = [
                    'apiToken'=>$User->api_token,
                    'user'=>[
                        'id'=>$User->id,
                        'name'=>$User->name,
                    ]
                ];

                return response()->json($data);
            }else throw new UnauthorizedException;
        }catch (\Exception $e){
            return response()->json([
                'error'=>[
                    'message'=>'Unauthorized '.$e->getFile() . ' at ' . $e->getLine() . ' with '.$e->getMessage()
                ]
            ], 401);
        }
    }
}
