import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Their Repository is created by connecting the entity to the parent Module.
@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

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

}