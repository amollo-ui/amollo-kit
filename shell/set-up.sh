#!/usr/bin/env bash
# After adding the hooks to the directory $ROOT_DIR/.husky, this bin file must be executed

# -e  Exit immediately if a command exits with a non-zero status.
set -e

ROOT_DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && cd .. && pwd)"
cd $ROOT_DIR

printf '🪝 Setting up Git hooks\n'

chmod ug+x .husky/* && chmod ug+x .git/hooks/*
npm set-script prepare "husky install" && yarn prepare

echo "✅ Git hooks are set up!"
