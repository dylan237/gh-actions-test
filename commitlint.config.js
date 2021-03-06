module.exports = {
  extents: ['@commitlint/config-conventional', 'cz'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      ['WIP', 'feat', 'fix', 'refactor', 'docs', 'test', 'chore', 'style', 'revert', 'perf', 'build'],
    ],
  },
}
