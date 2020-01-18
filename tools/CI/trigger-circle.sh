#!/usr/bin/env bash

# todo: use correct repo url for pull requests and forks

echo "Triggering Circle build against deployed url $DEPLOY_URL branch $BRANCH"

# https://www.netlify.com/docs/continuous-deployment/#build-environment-variables
echo "Other Netlify variables"
echo "REPOSITORY_URL $REPOSITORY_URL"
echo "PULL_REQUEST $PULL_REQUEST"
echo "COMMIT_REF $COMMIT_REF"
echo "CONTEXT $CONTEXT"
echo "REVIEW_ID $REVIEW_ID"
echo "URL $URL"
echo "DEPLOY_URL $DEPLOY_URL"
echo "DEPLOY_PRIME_URL $DEPLOY_PRIME_URL"

# Circle API https://circleci.com/docs/api/v1-reference/
# pass deployed url to Cypress as an environment variable
# https://on.cypress.io/environment-variables

if [ "$PULL_REQUEST" = true ]; then
  echo "Triggering pull request build - cannot use BRANCH directly"
  # instead need to use review id (= pull request number)
  # and pass commit ref as revision
  # https://discuss.circleci.com/t/api-trigger-build-of-pull-request-from-fork/7784/19
  curl -u "${CIRCLE_API_USER_TOKEN}": \
        -d build_parameters[CYPRESS_baseUrl]="$DEPLOY_URL" \
        -d revision="$COMMIT_REF" \
        https://circleci.com/api/v1.1/project/github/rm3l/rm3l.org/tree/pull/"$REVIEW_ID"
else
  curl -u "${CIRCLE_API_USER_TOKEN}": \
        -d build_parameters[CYPRESS_baseUrl]="$DEPLOY_URL" \
        https://circleci.com/api/v1.1/project/github/rm3l/rm3l.org/tree/"$BRANCH"
fi
