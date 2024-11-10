module.exports = {
  ...require('@adonisjs/prettier-config'),
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  tailwindFunctions: ['tv', 'twMerge'],
}
