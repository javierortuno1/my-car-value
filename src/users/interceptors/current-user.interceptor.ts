import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {

    constructor(private usersService: UsersService) {}

    async intercept(context: ExecutionContext, handler: CallHandler<any>): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        // Destructuring object form the session object halt by the cookie
        const { userId } = request.session || {};

        if (userId) {
            const user = await this.usersService.findOne(userId);

            // Communicate with the Decorator by assigning the user to the request
                // add a new attribute to the request
            request.currentUser = user;
        }

        return handler.handle();
    }
    
}