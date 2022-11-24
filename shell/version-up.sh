#!/usr/bin/env bash

cd "$(dirname "$0")/.." || exit

for i in "$@"; do
  case $i in
    -v=*|--version=*)
      VERSION="${i#*=}"
      shift # past argument=value
      ;;
    *)
      # unknown option
      ;;
  esac
done

find_word () {
  local first arg
  first="$1"
  shift
  for arg in "$@"; do
      [[ $first == "$arg" ]] && return
  done
  false
}

FOLLOWING_COMMANDS_MSG="version by semver convention can be one of the following: 'major', 'minor', 'patch', 'premajor', 'preminor', 'prepatch', or 'prerelease'. See https://semver.org"
echo $@
if [ $VERSION ]; then
  if find_word "$VERSION" "major" "minor" "patch" "premajor" "preminor" "prepatch" "prerelease"; then continue
  else
    echo $FOLLOWING_COMMANDS_MSG
    exit 1
  fi

  COMMAND="env-cmd lerna version $VERSION --conventional-commits --no-push --no-commit-hooks"
  echo "$COMMAND $@"
  eval "$COMMAND $@"
else
  echo "No <version> was passed. yarn versionup [-v|--version=<version>]"
  echo $FOLLOWING_COMMANDS_MSG
  exit 1
fi
