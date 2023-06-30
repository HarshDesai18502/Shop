import { IsString, IsUrl } from 'class-validator';

export class createProductDto {
  @IsString()
  title: string;

  @IsUrl()
  imageUrl: string;
}
