<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Alert
 * @package App\Models
 * @property string $message
 * @property int $code
 */
class Alert extends Model
{
    public $fillable = [
        'message',
        'code'
    ];

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);

        $this->reset();
    }

    public function reset()
    {
        $this->message = 'Error';
        $this->code = 500;

        return $this;
    }

    public function error(\Exception $e)
    {
        $this->message = $e->getMessage() ? $e->getMessage() : 'Error';
        $this->code = $e->getCode() ? $e->getCode() : 500;

        return $this;
    }
}