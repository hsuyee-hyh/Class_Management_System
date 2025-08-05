<?php 

namespace App\Models\Enums;

enum Semester: string{
    case FIRST_SEMESTER = '1st Semester';
    case SECOND_SEMESTER = '2nd Semester';

    public function label(): string
    {
        return match($this) {
            self::FIRST_SEMESTER => '1st Semester',
            self::SECOND_SEMESTER => '2nd Semester',
        };
    }

    public function isFirstSemester() : bool{
        return $this === self::FIRST_SEMESTER;
    }

    public function isSecondSemester() : bool{
        return $this === self::SECOND_SEMESTER;
    }
}