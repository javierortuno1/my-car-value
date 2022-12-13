import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Their Repository is created by connecting the entity to the parent Module.
@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    // @Column()
    // make: string;

    // @Column()
    // model: string;

    @Column()
    price: number;

}