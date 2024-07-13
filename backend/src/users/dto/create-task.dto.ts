import { IsNotEmpty } from 'class-validator';

export class AssignTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  assignedToUserId: number;
}
