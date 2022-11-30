import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    // context refers to the incoming request (previously passed by interceptor)
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        // the current user property was added by the interceptor
        return request.currentUser;
    }
);