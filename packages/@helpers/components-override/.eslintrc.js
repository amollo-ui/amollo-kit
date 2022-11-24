module.exports = {
    "extends": "@amollo-lint/eslint-config-ts-prettier",
    "ignorePatterns": ["build"],
    "parserOptions": {
        "project": "tsconfig.json",
        "tsconfigRootDir": __dirname,
    },
};
