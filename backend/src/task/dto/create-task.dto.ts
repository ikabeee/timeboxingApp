import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsBoolean()
  status: boolean;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  readonly startTime: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  readonly endTime: Date;
}
