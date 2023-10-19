import {
  IsArray,
  IsEmail,
  IsOptional,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator';
import { RoleDto } from './role.dto';
import { Type } from 'class-transformer';
import { Field, InputType } from '@nestjs/graphql';
import { Role } from '@app/common';

@InputType()
export class CreateUserDto {
  @IsEmail()
  @Field()
  email: string;

  @IsStrongPassword()
  @Field()
  password: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => Role)
  @Field(() => [Role], { nullable: true })
  roles?: Role[];
}
