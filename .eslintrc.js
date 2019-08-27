module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    "prettier/prettier": ["error", { "singleQuote": true, "trailingComma": false }],
    'semi': 2,
    'quotes': [2, 'single', {avoidEscape: true}],
    "trailingComma": 0,
    "comma-dangle": 0
  }
};
