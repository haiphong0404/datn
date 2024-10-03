module.exports = {
    parser: 'babel-eslint',
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
    ],
    rules: {
      'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
      'react/react-in-jsx-scope': 'off', // Nếu bạn sử dụng React 17 trở lên
    },
    settings: {
      react: {
        version: 'detect', // Tự động phát hiện phiên bản React
      },
    },
  };
  