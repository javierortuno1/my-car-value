import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

// Type safety around serialize
// determine if the passed object is a class
interface ClassConstructor {
    new (...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
   return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // // Run something before a request is handled by the request Handler
        // console.log('I am running before the handler', context);

        // outgoing response
        return next.handle().pipe(
            map((data: any) => {
                // // Run something before the response is sent out
                // console.log('I am running before the response is sent out', data);
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true
                })
            })
        )
    }

}
