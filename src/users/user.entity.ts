import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Exclude } from 'class-transformer';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    /** For the Built-in Interceptors */
    // @Exclude()
    password: string;

    // Hook
    @AfterInsert()
    logInsert() {
        console.log('Inserted User with id', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated User with id', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed User with id', this.id);
    }

}