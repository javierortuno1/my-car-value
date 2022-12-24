import { Report } from 'src/reports/report.entity';
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

    // Pass as argument 1- the Entity we are expecting to be associated as function
    // for avoiding circular dependency
    // 2- and the instance of that entity with the property we wish to associate
    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

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