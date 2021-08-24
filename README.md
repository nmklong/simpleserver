# Requirements
1. `mysql@5.6`
1. `node@10.16.1`
   1. See https://docs.npmjs.com/downloading-and-installing-node-js-and-npm for how to install
1. `knex@0.21.21`
   1. Install globally `npm install knex -g`
    
# Database
1. This project will run fine if you can prepare:
   1. A database called `simpleserver`
   1. user is `root` and password is `password`
1. If you have customized database name and different usernames and passwords then modify `knexfile.js` with your new credentials

# Install modules
1. In project root, run `npm install` to install packages for the server
2. Go to `client/` directory and run `npm install` to install packages for React client

# Run migration
1. In root Run knex migration: `knex migrate:latest`
   1. This will generate a `product` table in your mysql  database
    
# Start the server
Start express server: `node server.js`

Terminal should display `Server running on http://localhost:7555`

# Start react client
1. Go to `client/` directory
1. Run `npm start`, this will start React server
1. You can now access `localhost:3000` to view the frontend


