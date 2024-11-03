import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Get('allTask')
  async getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(Number(id));
  }

  @Post('createTask')
  async createTask(@Body() data: Task) {
    console.log(this.taskService.createTask(data));
    return this.taskService.createTask(data);
  }

  @Post(':id')
  async deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(Number(id));
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() data: Task) {
    return this.taskService.updateTask(Number(id), data);
  }
}
