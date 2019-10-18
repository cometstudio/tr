<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserLoginRequest extends FormRequest
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
            'email'=>'required|email|max:32',
            'password'=>'required',
        ];
    }

    /**
     * @return array
     */
    public function messages()
    {
        return [
            'email.required'=>'user.validation.email.required',
            'email.email'=>'user.validation.email.email',
            'email.max'=>'user.validation.email.max',
            'password.required'=>'user.validation.password.required',
        ];
    }
}
