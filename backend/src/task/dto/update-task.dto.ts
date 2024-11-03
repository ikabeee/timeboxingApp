import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskPriority } from './create-task.dto';
import { Type } from 'class-transformer';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  readonly startTime: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  readonly endTime: Date;
}
