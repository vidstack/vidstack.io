export default {
  '*': ['prettier --write --ignore-unknown', 'cspell --no-must-find-files', 'eslint --fix'],
};
