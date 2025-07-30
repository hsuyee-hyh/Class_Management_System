<?php

namespace App\Models\Enums;

enum UserRole: string
{
    case ADMIN = 'admin';
    case TEACHER = 'teacher';
    case STUDENT = 'student';

    public function label(): string
    {
        return match ($this) {
            self::ADMIN => 'Administrator',
            self::TEACHER => 'Teacher',
            self::STUDENT => 'Student',
        };
    }

    public function isAdmin(): bool
    {
        return $this === self::ADMIN;
    }

    public function isTeacher(): bool
    {
        return $this === self::TEACHER;
    }

    public function isStudent(): bool
    {
        return $this === self::STUDENT;
    }
}
