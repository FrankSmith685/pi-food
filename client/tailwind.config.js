/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'lading-page': "url('images/banner_page.jpg')",
      },
      backgroundSize:{
        'size':"100% 100%"
      },
      margin:{
        'left':'1000px',
        'px':'4px',
        'mx1':'2px'
      },
      padding:{
        'pa':'4px'
      },
      width:{
        'favorite1':'32.55%'
      },
      height:{
        'hmax':'550px',
        'hmaax':'88vh'
      },
      maxHeight:{
        'h_max':'88vh'
      },
      minHeight:{
        'h_min':'300px'
      },
      // ANIMATION 1
      keyframes: {
        wiggle: {
          '0% ': { 'margin-left': '-1000px' },
          '100%': { 'margin-left': '0px', },
        },
        imagen1: {
          '0%,100% ': { transform: ' translateY(20px)' },
          '50%': {transform: 'translateY(0px)' },
        },
        texto:{
          '0%': { width: ' 0%' },
          '100%': {width: '100%' },
        },
        buttonColor:{
          '0%,100% ': { 'color': ' red' },
          '50%': {'color': 'blue' },
        }
      },
      animation: {
        wiggle: 'wiggle 5s ease-in-out 1',
        imagen1: 'imagen1 1s ease-in-out 5',
        texto:'texto 3s ease-in-out 1',
        buttonColor:'buttonColor 5s ease-in-out infinite'

      },
      // ANIMATION 2
      
    },
  },
  plugins: [],
}
