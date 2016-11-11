module.exports = {
  extends: ['airbnb'],
  rules: {
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'react/prop-types': 0,
    'arrow-parens': ['error', 'always', {
      requireForBlockBody: true,
    }],
    'brace-style': ['error', 'stroustrup'],
    'no-use-before-define': [2, "nofunc"],
    'spaced-comment': ['error', 'always', { 'exceptions': ['/'] }]
  },
};
