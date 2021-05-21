/*
 * @Author: Sephiroth·D·Kid
 * @Date: 2020-03-24 10:03:09
 * @LastEditors: Sephiroth·D·Kid
 * @LastEditTime: 2020-04-14 10:01:59
 * @Description: DTO of user
 */

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RecordDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'score不能为空' })
  @IsNumber()
  readonly score: number;
  @ApiProperty()
  @IsNotEmpty({ message: 'floor不能为空' })
  @IsNumber()
  readonly floor: number;
}
