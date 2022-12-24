import { ApiProperty } from "@nestjs/swagger";
import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReportDto {
    @ApiProperty({
        description: 'price',
        example: "20000"
    })
    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number

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
    @IsNumber()
    @Min(1930)
    @Max(2050)
    year: number;

    @ApiProperty({
        description: 'mileage',
        example: "5000"
    })
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;

    @ApiProperty({
        description: 'lng',
        example: "120"
    })
    @IsLongitude()
    lng: number;

    @ApiProperty({
        description: 'lat',
        example: "50"
    })
    @IsLatitude()
    lat: number;

}