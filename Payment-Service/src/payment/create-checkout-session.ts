import { IsString, IsInt, IsNotEmpty, Length } from 'class-validator';

export class CreateCheckoutSessionDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsInt()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  currency: string;
}