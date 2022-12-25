import { Expose, Transform } from "class-transformer";

export class ReportDto {
    id: number;
    @Expose()
    price: number;
    @Expose()
    year: number;
    @Expose()
    lng: number;
    @Expose()
    lat: number;
    @Expose()
    make: string;
    @Expose()
    model: string;
    @Expose()
    mileage: number;

    // Transform will received an argument that contains the 'obj' property.
    // ({obj}) destructuring the obj from the argument the result is the original ReportEntity
    // With their association with the userEntity. From the association we only one the userId
    // The extracted value is assigned in the userId property
    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: number;

}