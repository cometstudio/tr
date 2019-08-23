<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Alert
 * @package App\Models
 * @property string $message
 * @property string $type
 * @property int $code
 */
class Alert extends Model
{
    public $fillable = [
        'message',
        'type',
        'code'
    ];

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);

        $this->reset();
    }

    public function reset()
    {
        $this->message = 'Success';
        $this->type = 'success';
        $this->code = 200;

        return $this;
    }

    public function warning(\Exception $e)
    {
        $this->message = $e->getMessage() ? $e->getMessage() : 'warning';
        $this->type = 'warning';
        $this->code = $e->getCode() ? $e->getCode() : 500;

        return $this;
    }

    public function error(\Exception $e)
    {
        $this->message = $e->getMessage() ? $e->getMessage() : 'error';
        $this->type = 'error';
        $this->code = $e->getCode() ? $e->getCode() : 500;

        return $this;
    }
}