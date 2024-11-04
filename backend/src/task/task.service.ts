import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async getTaskById(id: number): Promise<Task> {
    const findTask = await this.prisma.task.findUnique({ where: { id } });
    if (!findTask) {
      throw new HttpException('TASK_NOT_FOUND', 404);
    }
    return this.prisma.task.findUnique({ where: { id } });
  }

  async createTask(data: Task): Promise<Task> {
    const taskData = {
      ...data,
      start_time: new Date(data.start_time),
      end_time: new Date(data.end_time),
    };
    return this.prisma.task.create({ data: taskData });
  }

  async updateTask(id: number, data: Task): Promise<Task> {
    const findTask = await this.prisma.task.findUnique({ where: { id } });
    if (!findTask) {
      throw new HttpException('TASK_NOT_FOUND', 404);
    }
    return this.prisma.task.update({ where: { id }, data });
  }

  async deleteTask(id: number): Promise<Task> {
    return this.prisma.task.delete({ where: { id } });
  }
}
