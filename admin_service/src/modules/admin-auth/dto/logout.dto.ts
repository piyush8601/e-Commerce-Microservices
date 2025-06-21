import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LogoutDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
