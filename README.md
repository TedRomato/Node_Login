This repo contains simple application, that utilizes passport as a login system, and mongoDB for users database.

To configure your own routes, add your_route_name.js to routes. I recommend creating your routes as factory functions, such as in index.js route, because you need a passport instance to access users.

Keep naming in login and register ejs files the same. "Invalid login" is passed to login.ejs, and "User is taken" is passed to register.ejs as a variable on error.
