import { Test } from "@nestjs/testing"
import { User } from "../user.entity";
import { UsersService } from "../users.service";
import { AuthService } from "./auth.service"

// A test block
it('can create an instance of auth service', async () => {
    // Fake copy of users service
    const fakeUsersService: Partial<UsersService> = {
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
    const service = module.get(AuthService);

    // we validate that the service exist
    expect(service).toBeDefined();
})