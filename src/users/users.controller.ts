import { 
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    NotFoundException,
    UseInterceptors,
    ClassSerializerInterceptor,
    Session,
    UseGuards
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';
import { AuthService } from './auth/auth.service';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) {}

        // // Example for the ssesion cookie libray
        // @Get('/colors/:color')
        // setColor(@Param('color') color: string, @Session() session: any) {
        //     console.log(session);
        //     session.color = color;
        // }

        // @Get('/colors')
        // getColor(@Session() session: any) {
        //     console.log(session);
        //     return session.color;
        // }

    // @Get('/whoami')
    // whoAmI(@Session() session: any){
    //     // if there is no session sent from the client, then the uses is not signed up/in yet
    //     const result = this.userService.findOne(session.userId);
    //     if (!result) {
    //         throw new NotFoundException('user not found');
    //     }
    //     return result;
    // }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    // The @CurrentUSer() will return the session object holding the user
    whoAmI(@CurrentUser() user: User){
        // We use the type User entity because the global interceptor will map it to UserDTO.
        // Remember that this info is comming from the decorator + local interceptor. And what is comming from ther is an User
        if (!user) {
            throw new NotFoundException('Current User Not found');
        }
        return user;
    }

    @Post('/signout')
    @UseGuards(AuthGuard)
    async signout(@Session() session: any) {
        session.userId = null;
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        // this.userService.create(body.email, body.password)
        const user = await this.authService.signup(body.email, body.password);
        // add a new attribute to the the session object
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    

    // @UseInterceptors(new SerializeInterceptor(UserDto))
    // @Serialize(UserDto)
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        // it returns a promise
        const user = await this.userService.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException('user not found');
        }

        return user;
    }

    @Get()
    find(@Query('email') email: string) {
        return this.userService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string){
        return this.userService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() body: UpdateUserDto) {
        return this.userService.update(parseInt(id), body)
    }


}
