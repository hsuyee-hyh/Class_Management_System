import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

// import withMT from '@material-tailwind/html/withMT'; 

// import withMT from "@material-tailwind/html/utils/withMT";
// const withMT = require('@material-tailwind/html/withMT');
// const defaultTheme = require('tailwindcss/defaultTheme');
// const forms = require('@tailwindcss/forms');

// import withMT from '@material-tailwind/html/withMT';


/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                slab: ['Roboto Slab', 'serif'],
                // sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
