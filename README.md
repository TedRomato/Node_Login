This repo contains simple application, that utilizes passport as a login system, and mongoDB for users database.

To configure your own routes, add your_route_name.js to routes. I recommend creating your routes as factory functions, such as in index.js route, because you need a passport instance to access users.

Keep original contents in login and register files the same, to avoid errors. "Invalid login" message is passed to login.ejs, and "User is taken" message is passed to register.ejs on error.

By default,succesful login and registration are redirected to '/'.
