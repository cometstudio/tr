<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserProfileRequest;
use Illuminate\Validation\UnauthorizedException;
use Auth;
use Log;
use App\Models\Alert;
use App\Models\User;

class UserController extends Controller
{
    public function signup(UserLoginRequest $Request)
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
                    'user'=>$User->publicProperties()
                ]);
            }else throw new UnauthorizedException('user.signup.failed', 401);

        }catch (\Exception $e){
            $Alert = (new Alert())->error($e);

            return response()->json($Alert, $Alert->code());
        }
    }

    public function login(UserLoginRequest $Request)
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
                    'user'=>$User->publicProperties()
                ]);
            }else if(!User::where('email', $credentials['email'])->first()){
                throw new UnauthorizedException('user.login.not_found', 404);
            }else{
                throw new UnauthorizedException('user.login.failed', 401);
            }
        }catch (\Exception $e){
            $Alert = (new Alert())->error($e);

            return response()->json($Alert, $Alert->code());
        }
    }

    public function save(UserProfileRequest $Request)
    {
        try{
            $data = $Request->all();

            $User = Auth::user();

            if(!$User->update($data)) throw new \Exception('error.update');

            return response()->json([
                'user'=>$User->publicProperties(),
                'message'=>'success',
            ]);
        }catch (\Exception $e){
            $Alert = (new Alert())->error($e);

            return response()->json($Alert, $Alert->code());
        }
    }
}
