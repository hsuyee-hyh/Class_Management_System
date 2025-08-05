<?php

use App\Models\Enums\Semester;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('course_name');
            $table->string("description");
            $table->date('start_date');
            $table->date('end_date');
            $table->string('academic_year', 9);
            $table->enum('semester', [
                Semester::FIRST_SEMESTER->value,
                Semester::SECOND_SEMESTER->value,
            ])->default(Semester::FIRST_SEMESTER->value);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
