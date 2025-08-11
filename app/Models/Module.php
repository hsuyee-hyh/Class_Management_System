<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    //
    protected $fillable = [
        'module_no',
        'title',
        'video_path',
        'video_origin_path',
        'presentation_path',
        'presentation_origin_path',
        'course_id'
    ];

    // automatically cast json to array, array to json
    protected $casts = [
        'video_path' => 'array',
        'video_origin_path' => 'array',
    ];

    public function course(){
        return $this->belongsTo(Course::class);
    }
}
