##!/bin/bash --login
# Bash script to run environment
export RAILS_ENV="development"

foreman start -e .env.development.local -f Procfile.dev