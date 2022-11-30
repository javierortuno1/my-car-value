import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing"
import { User } from "../user.entity";
import { UsersService } from "../users.service";
import { AuthService } from "./auth.service"

describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;

    beforeEach(async () => {
        const users: User[] = [];
        // Fake copy of users service
        fakeUsersService = {
            find: (email: string) => {
                const filteredUsers: User[] = users.filter(user => user.email == email)
                return Promise.resolve(filteredUsers)
            },
            create: (email: string, password: string) => {
                // 'as User' as a way to indicate TS to treat the object as a UserObject. -> Casting
                const user = {id: Math.floor(Math.random() * 999999), email, password} as User;
                users.push(user)
                return Promise.resolve(user)
            }
        }

        // We create a module for the testing feature of the auth service
            // PRoviders: List of things we want to registe in our testing DI container
                // provide: If anyone asks for the UsersService, then use the value of 'useValue'
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService
                }
            ]
        }).compile();

        // we create the service
        service = module.get(AuthService);
    })

    // A test block
    it('can create an instance of auth service', async () => {
        // we validate that the service exist
        expect(service).toBeDefined();
    })

    it('creates a new user with a salted and hashed password', async () => {
        const user = await service.signup('dasda@dadas.com', '123456');

        // Making sure that the password has been salted and hashed.
        expect(user.password).not.toEqual('123456');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    })

    it('throws an error if user signs up with email that is in use', async () => {
        // Make the fakeUsersService find a fake user entity
        fakeUsersService.find = () =>
          Promise.resolve([{ id: 1, email: 'a@a.com', password: '1' } as User]);

        await expect(service.signup('a@a.com', '1'))
                .rejects.toThrow(BadRequestException);
      });

    it('throws if signin is called with an unused email', async () => {
        await expect(service.signin('asdflkj@asdlfkj.com', 'passdflkj'))
                .rejects.toThrow(NotFoundException);
    });

    it('throws if an invalid password is provided', async () => {
        fakeUsersService.find = () =>
          Promise.resolve([
            { email: 'asdf@asdf.com', password: 'laskdjf' } as User
          ]);
        await expect(service.signin('asdf@asdf.com', 'password'))
                .rejects.toThrow(BadRequestException);
    });

    it('returns a user if correct password is provided', async() => {
        await service.signup('a@a.com', 'password');
        const user = await service.signin('a@a.com', 'password');
        expect(user).toBeDefined()
    });
})
