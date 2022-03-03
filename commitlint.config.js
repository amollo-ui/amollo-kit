const typeEnum = [
    "build",
    "chore",
    "ci",
    "docs",
    "feat",
    "fix",
    "perf",
    "refactor",
    "revert",
    "style",
    "test",
    "release",
];

module.exports = {
    "extends": ["@commitlint/config-conventional"],
    "rules": {
        "body-max-line-length": [1, "always", 100],
        "header-max-length": [0, "always", 72],
        "scope-empty": [2, "never"],
        "type-enum": [2, "always", typeEnum],
        "scope-ws": [2, "always", {
            "additionalScopes": ["root"]
        }]
    },
    "plugins": ["@amollo-lint/commitlint-plugin-scope-ws"],
};
