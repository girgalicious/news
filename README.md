# menu

steps to run

open terminal for backend
git clone https://github.com/girgalicious/news.git
bundle install
touch .env.development.local
add ENV variables from example .env file
retrieve API Key from https://newsapi.org/
run bash.start.sh in terminal

open new terminal for frontend
cd client
yarn install-ignore-engines
touch .env
add ENV variables from example .env file
run grunt server in terminal
navigate to localhost:8082 in browser