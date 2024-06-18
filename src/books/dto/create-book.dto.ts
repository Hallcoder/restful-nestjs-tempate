import { IsNotEmpty } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBookDTO{
    @ApiProperty()
    @IsNotEmpty() 
    name: string;
    @ApiProperty()
    @IsNotEmpty() 
    author:string;
    @ApiProperty()
    @IsNotEmpty() 
    publisher:string;
    @ApiProperty()
    @IsNotEmpty() 
    publicationYear:number;
    @ApiProperty()
    @IsNotEmpty() 
    subject:string;
}