import { IsOptional, IsString, IsUrl } from 'class-validator';

export class updateProductDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsUrl()
  @IsOptional()
  imageUrl: string;
}
