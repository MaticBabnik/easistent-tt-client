/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: require('tailwindcss/preset'),
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'class',
    plugins: [
        function ({ addBase, theme }) {
            function extractColorVars(colorObj, colorGroup = '') {
                return Object.keys(colorObj).reduce((vars, colorKey) => {
                    const value = colorObj[colorKey]

                    const newVars =
                        typeof value === 'string'
                            ? { [`--color${colorGroup}-${colorKey}`]: value }
                            : extractColorVars(value, `-${colorKey}`)

                    return { ...vars, ...newVars }
                }, {})
            }

            addBase({
                ':root': extractColorVars(theme('colors'))
            })
        }
    ]
}





