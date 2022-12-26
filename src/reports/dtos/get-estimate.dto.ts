import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";

export class GetEstimateDto {
    @ApiProperty({
        description: 'make',
        example: "Kia"
    })
    @IsString()
    make: string;

    @ApiProperty({
        description: 'model',
        example: "Optima"
    })
    @IsString()
    model: string;

    @ApiProperty({
        description: 'year',
        example: "2010"
    })
    // Transform will destructure the value of the request and parse to a number
    // the result is assigned to the property 'year'
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(1930)
    @Max(2050)
    year: number;

    @ApiProperty({
        description: 'mileage',
        example: "5000"
    })
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;

    @ApiProperty({
        description: 'lng',
        example: "120"
    })
    @Transform(({ value }) => parseFloat(value))
    @IsLongitude()
    lng: number;

    @ApiProperty({
        description: 'lat',
        example: "50"
    })
    @Transform(({ value }) => parseFloat(value))
    @IsLatitude()
    lat: number;

}