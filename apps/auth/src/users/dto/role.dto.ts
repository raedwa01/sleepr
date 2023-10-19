import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class RoleDto {
  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  id?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Field({ nullable: true })
  name?: string;
}
