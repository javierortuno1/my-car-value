import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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