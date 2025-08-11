<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    /** @use HasFactory<\Database\Factories\CourseFactory> */
    use HasFactory;

    protected $fillable=[
        'course_name',
        'description',
        'photo',
        'start_date',
        'end_date',
        'academic_year',
        'semester',
        
    ];

    public function modules(){
        return $this->hasMany(Module::class);
    }
}
