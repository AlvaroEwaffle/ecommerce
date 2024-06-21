// src/products/dto/create-product.dto.ts
import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @IsNumber()
  stock: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  thumbnails?: string[];
}