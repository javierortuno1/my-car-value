import { BadRequestException } from "@nestjs/common";
import { Test } from "@nestjs/testing"
import { User } from "../user.entity";
import { UsersService } from "../users.service";
import { AuthService } from "./auth.service"

describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;

    beforeEach(async () => {
        // Fake copy of users service
        fakeUsersService = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) => {
                // 'as User' as a way to indicate TS to treat the object as a UserObject. -> Casting
                return Promise.resolve({ id: 1, email, password } as User)
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
})
