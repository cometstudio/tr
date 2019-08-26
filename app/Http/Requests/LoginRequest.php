<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email'=>'required|email',
            'password'=>'required',
        ];
    }

    /**
     * @return array
     */
    public function messages()
    {
        return [
            'email.required'=>'email is required',
            'email.email'=>'provide a real email please',
            'password.required'=>'password is required',
        ];
    }
}
