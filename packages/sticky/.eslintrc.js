module.exports = {
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
    es6: true,
  },
  root: true,
  overrides: [
		{
			// 3) Now we enable eslint-plugin-testing-library rules or preset only for matching testing files!
			files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
			extends: ['plugin:testing-library/react'],
      rules: {
        'testing-library/no-container': 'off',
      }
		},
	],
}