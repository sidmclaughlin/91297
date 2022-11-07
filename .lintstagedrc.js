module.exports = {
  '*.{js,jsx,ts,tsx}': ['npx eslint --fix', 'npx prettier --write'],
  '*.code-workspace': ['npx prettier --parser json --write'],
  '*.{json, yaml}': ['npx prettier --write'],
  'package.json': ['npx sort-package-json'],
};
