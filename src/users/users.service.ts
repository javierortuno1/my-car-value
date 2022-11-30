import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {

    /**
     * @InjectRepository tells the DI Container to have a class Repository
     * handling users.
     * DI Container does not work with Generic Types like in this case.
     * Repository<User> : Generic Type of TypeORM that will be an
     * instance of Repository handling User 
    */ 
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    create(email: string, password: string): Promise<User> {
        // const { email, password } = userDto;
        // User Entity Instance created in our App 
        const userEntityInstance: User = this.repo.create({ email, password });

        // If we pass the palin data as object to the save, we will not create
        // an Entity in the app and the Hooks will not be executed.
        // persistence of the data into the DB
        return this.repo.save(userEntityInstance);
    }

    findOne(id: number) {
        // in case that the id is not provided
        if (!id) {
            return null
        }
        return this.repo.findOneBy({ id });
    }

    find(email: string) {
        return this.repo.find( { where: { email } });
    }

    async update(id: number, attributes: Partial<User>) {
        // Fetch data from DB.
        const userEntityInstance = await this.findOne(id);
        if (!userEntityInstance) {
            throw new NotFoundException('user not found');
        }

        // Update the found Entity Instance with new data.
        Object.assign(userEntityInstance, attributes);

        // Update the data of the user by saving it and implementing the hooks.
        return this.repo.save(userEntityInstance);
    }

    async remove(id: number) {
        // Fetch data from DB.
        const userEntityInstance = await this.findOne(id);
        if (!userEntityInstance) {
            throw new NotFoundException('user not found');
        }

        // Remove the record from the DB and implementing the hooks.
        return this.repo.remove(userEntityInstance);
    }

}
