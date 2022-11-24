#!/usr/bin/env bash

# -e  Exit immediately if a command exits with a non-zero status.
set -e

cd "$(dirname "$0")/.." || exit

# Performs the following tasks in order:
#   - Build `@amollo-kit/components-override'

printf '👷‍♂️ Start building ...\n\n'

printf '📦 Building `@helpers` workspaces ...\n\n'
printf '  📦 Building `@amollo-kit/components-override`...\n'
yarn workspace @amollo-kit/components-override build
printf '  📦 @amollo-kit/components-override ✅\n\n'

printf '👷‍♂️ Building completed successfully ...\n\n'
