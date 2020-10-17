##!/bin/bash --login
# Bash script to run environment
export RAILS_ENV="development"

sudo service postgresql restart &&
foreman run rake db:migrate db:test:prepare &&
foreman start -e .env.development.local -f Procfile.dev