<?php

namespace Database\Factories;

use App\Models\Enums\Semester;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'course_name' => fake()->text(10),
            'description' => fake()->text(),
            'academic_year'=>fake()->numberBetween(2019,2023)
                .'-'.($this->faker->numberBetween(2019,2023)+1),
            'semester' => Arr::random(Semester::cases())->value, 
        ];
    }
}
