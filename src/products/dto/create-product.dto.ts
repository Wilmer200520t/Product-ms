import { Type } from "class-transformer";
import { IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {
  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @Min(0)
  @Type(() => Number) // Transform the input to a number
  public price: number;
}
