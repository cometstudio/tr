<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Validation\UnauthorizedException;
use Auth;
use Log;
use App\Models\Alert;
use App\Models\User;

class UserController extends Controller
{
    public function signup(LoginRequest $Request)
    {
        try{
            $credentials = $Request->only([
                'email',
                'password',
            ]);

            if(Auth::attempt($credentials + ['disabled' => 0])) {
                $User = Auth::user();

                return response()->json([
                    'api_token'=>$User->api_token,
                    'user'=>$User->only([
                        'id',
                        'name',
                    ])
                ]);
            }else throw new UnauthorizedException('user.signup.failed', 401);

        }catch (\Exception $e){
            $Alert = (new Alert())->error($e);

            return response()->json($Alert, $Alert->code);
        }
    }
    public function login(LoginRequest $Request)
    {
        try{
            $credentials = $Request->only([
                'email',
                'password',
            ]);

            if(Auth::attempt($credentials + ['disabled' => 0])) {
                $User = Auth::user();

                return response()->json([
                    'api_token'=>$User->api_token,
                    'user'=>$User->only([
                        'id',
                        'name',
                    ])
                ]);
            }else if(!User::where('email', $credentials['email'])->first()){
                throw new UnauthorizedException('user.login.not_found', 404);
            }else{
                throw new UnauthorizedException('user.login.failed', 401);
            }
        }catch (\Exception $e){
            $Alert = (new Alert())->error($e);

            return response()->json($Alert, $Alert->code);
        }
    }
}
