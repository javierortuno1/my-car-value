import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class AuthGuard implements CanActivate{
    // context represents the incoming request for HTTP
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        // if userId does not exit then a falsy is return
        return request.session.userId
    }

}