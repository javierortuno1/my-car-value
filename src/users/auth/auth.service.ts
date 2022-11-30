import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "../users.service";
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signup(email: string, password: string) {
        // See if email is in use
        const users = await this.usersService.find(email)
        if (users.length) {
            throw new BadRequestException('Email in use');
        }

        //** Hash the user's password
        //Generate a salt
            // randomBytes returns a Buffer, similiar to an array but with raw data
            // like 0101101110
        const salt = randomBytes(8).toString('hex'); // size equal to 16

        //Hash the salt and the password together with a long of the hash
            // Cast to Buffer because scrypt should return a derivekey of type Buffer
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        // Join the hashed result and the salt together
        const result = salt + '.' + hash.toString('hex');
        // ******
        // create a new user and save it
        const user = await this.usersService.create(email, result);

        // return the user
        return user;
    }

    // Auth step, before signing the user in the system
    async signin(email: string, password: string) {
        // Destructuring Assignment 
            // Destructuring objects -> const { a, b } = obj;
            // Destructuring Arrays -> [first_elem, second_elem] = [1,2,3]
                // first_elem will be 1
                // second_elem will be 2
        // Then Destruct the result and obtain the first value and store it
        // under the user variable 
        const [user] = await this.usersService.find(email)
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // salt.hash
            // Split returns an array of strings then Destructuring Array
        const [salt, storedHash] = user.password.split('.');

        const hash = (await scrypt(password, salt, 32)) as Buffer;
        console.log(hash.toString('hex'));

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('bad password')
        }

        return user;
    }



}