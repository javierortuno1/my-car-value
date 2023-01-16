import { User } from '../users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// Their Repository is created by connecting the entity to the parent Module.
@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    // Column with an option for the property
    @Column({ default: false })
    approved: boolean;

    @Column()
    price: number;

    @Column()
    make: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    mileage: number;

    // ** Where was the car sold

    // Longitude
    @Column()
    lng: number;

    // Latitude
    @Column()
    lat: number;

    // Pass as argument 1- the Entity we are expecting to be associated as function
    // for avoiding circular dependency
    // 2- and the instance of that entity with the property we wish to associate
    // NOTE: Many to one is going to alter the Report Table 
    @ManyToOne(() => User, (user) => user.reports)
    user: User;

}