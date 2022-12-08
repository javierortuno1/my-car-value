import { ValidationPipe } from "@nestjs/common";
import cookieSession = require('cookie-session');

// This function allow me to setup the App for the development and testing environment since it can be inported
export const setupApp = (app: any) => {
    app.use(
        cookieSession({
            keys: ['qwertz']
        }));
      // Apply the pipe for any incomming request to the instance app
      app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true
        })
      );
}