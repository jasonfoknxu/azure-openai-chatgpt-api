# RESTful API Template (TypeScript + Express)

A very simple RESTful API Template for testing and demonstration. Basic structure only.

:warning: This template is **NOT** ready for production use! :warning:

### :notebook: Notices & Limitations
- Database connection is **NOT** implemented in this template
- The auth controller is **NOT** a complete solution :exclamation:
- Routes, controllers and models should be added to the API
- Delete the user route & auth controller if you don't need them

### :clipboard: Features
- TypeScript, ES2020 version
- Build with Express
- Gzip Compression
- Basic XSS Protection
- CORS-enabled (All Origins)
- Ready to support JSON Web Tokens (JWT)
- Support JSON Request
- Support SSL (HTTPS server)
- Support Config file

### :memo: How to use?
1. `git clone https://github.com/jasonfoknxu/restful-api-typescript-express-template` to download the source code 
2.  `yarn` or `npm install` to install all the dependencies
3. Edit the config in the `.env` file (`.testing.env` for testing)
4. Add & modify the controllers, models, routes ...
5. `yarn run build` or `npm run build` to compile the scripts
6. (Optional) `yarn run test` or `npm run test` to run the API server with testing config
7. `yarn start` or `npm start` to start the API server

### :file_folder: File Structure
```
.
├── dist                # The compiled scripts
├── node_modules        # The dependencies and the libraries
├── src                 # Directory of the source code
│   ├── controllers     # Directory for the controllers of the API
│   ├── middleware      # Directory for the middleware of the API
│   ├── models          # Directory for data models, database structure
│   ├── routes          # Directory for the API routes
│   ├── types           # The types and interface of TypeScript
│   └── utils           # The utilities used in the API
├── .env                # The config file of the API
├── .testing.env        # The testing config
├── package.json        # The Node.js ecosystem file
└── tsconfig.json       # Config of TypeScript
```

### :bookmark: Credits
- [Express](https://expressjs.com)
- [Dotenv](https://github.com/motdotla/dotenv)
- [Helmet](https://github.com/helmetjs/helmet)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [Node.js compression middleware](https://github.com/expressjs/compression)
- [Node.js CORS middleware](https://github.com/expressjs/cors)
- [XSS-Clean](https://github.com/jsonmaur/xss-clean)