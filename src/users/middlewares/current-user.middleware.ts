import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request} from "express";
import { User } from "../user.entity";
import { UsersService } from "../users.service";

declare global {
    // find the express libray
    namespace Express {
        // in the Request type
        interface Request {
            currentUser?: User;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {

    constructor(private usersService: UsersService) {}

    async use(req: Request, res: any, next: NextFunction) {
        const { userId } = req.session || {};

        if (userId) {
            const user = await this.usersService.findOne(userId);
            req.currentUser = user;
        }

        next();
    }

}