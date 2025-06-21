import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRefundDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  sessionId: string;
}