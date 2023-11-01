<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Member extends Model
{
    use HasFactory;
    protected $table= 'users_member';

    protected $fillable = [
        'users_id',
        'no_telp',
        'tgl_lahir',
        'jk',
        'no_ktp',
        'photo',
    ];


    public function users()
    {
        return $this->hasOne(User::class,'id','users_id');
    }

    /**
     * photo
     *
     * @return Attribute
     */
    protected function photo(): Attribute
    {
        return Attribute::make(
            get: fn ($photo) => asset('/storage/' . $photo),
        );
    }
}
