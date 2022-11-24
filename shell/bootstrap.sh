#!/usr/bin/env bash

# -e  Exit immediately if a command exits with a non-zero status.
set -e

# Performs the following tasks in order:
#   - Install dependencies
cd "$(dirname "$0")/.." || exit

for i in "$@"; do
  case $i in
    -ni=*|--no-immutable=*)
      NI="${i#*=}"
      shift # past argument=value
      ;;
    *)
      # unknown option
      ;;
  esac
done

printf '🍀 Installing dependencies...\n\n'
if [ $NI ]; then
  yarn install
else
  # install packages based on the lock-file with Yarn
  yarn install --immutable
fi

printf '\n✅ Dependencies have been installed\n\n'

echo '✅ Initial download completed!\n'
