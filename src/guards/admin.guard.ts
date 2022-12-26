import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class AdminGuard implements CanActivate{
    // context represents the incoming request for HTTP
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        // if userId does not exit then a falsy is return
        if (!request.currentUser) {
            return false
        }

        return request.currentUser.admin;
    }

}