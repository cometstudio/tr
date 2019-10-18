<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Auth;

class UserProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'=>'required|max:32',
            'email'=>'required|email|max:32',
        ];
    }

    /**
     * @return array
     */
    public function messages()
    {
        return [
            'name.required'=>'user.validation.name.required',
            'email.required'=>'user.validation.email.required',
            'email.email'=>'user.validation.email.email',
            'email.max'=>'user.validation.email.max',
        ];
    }
}
