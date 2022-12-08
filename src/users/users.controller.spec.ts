import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth/auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';

/*****
 *  1) Mock the services to be injected in the controller
 *    - AuthService
 *    - UsersService
 *
 * 2)  Implement the mocked methods
 * 3) Add mock services as providers of the module
 *   example:  providers: [
        {
          provide: UsersService,   --> Whenever someona asks for this provider
          useValue: fakeUsersService   --> Then provide the mock Service
        }
      ]
 * 
 * 
 * 
 */
describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;


  // Considered as a DI Container
  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve( { id, email: "abcd@abcd.com", password: "abcd" } as User)
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: "abcd" } as User])
      },
      // remove: (id: number) => {
      //   return Promise.resolve({ id, email: "abcd@abcd.com", password: "abcd" } as User)
      // },
      // update: (id: number) => {
      //   return Promise.resolve({ id, email: "abcd@abcd.com", password: "abcd1" } as User)
      // }
    };
    fakeAuthService = {
      // signup: (email: string, password: string) => {},
      signin: (email: string, password: string) => {
        return Promise.resolve({ id:1, email, password} as User)
      }
    };


    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.find('abcd@abcd.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('abcd@abcd.com')
  })

  it('signin updates session object and returns user', async () => {
    const session = { userId: -1 };
    const user = await controller.signin(
      { email: 'abcd@abcd.com', password: '123'},
      session
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  })
});
