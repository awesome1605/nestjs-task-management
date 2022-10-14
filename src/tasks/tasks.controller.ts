import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {Task, TaskStatus} from './task.model';
import { brotliDecompressSync } from 'zlib';
import { title } from 'process';
import { CreatTaskDTO } from './dto/create-task.dto';
import { getTasksFiletrDTO } from './dto/gettask-filter.dto';



@Controller('tasks')
export class TasksController {
    constructor (private tasksService: TasksService){}

   /* @Get()
    getHello() {
        return this.tasksService.getHello();
    }
    */

    @Get()
    getTasks(@Query() filterDTO: getTasksFiletrDTO): Task[]  {
        if(Object.keys(filterDTO).length ){
            return this.tasksService.getTasksWithFilters(filterDTO);
        }else{
            return this.tasksService.getAllTasks();
        }
        
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task{
        return this.tasksService.getTaskById(id);
    }


    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): void{
        this.tasksService.deleteTaskById(id);
    }


    @Patch('/:id/status')
    updateTaskStatusById(
        @Param('id')id: string,
        @Body('status')status: TaskStatus,
    ){
        return this.tasksService.updateTaskStatusById(id, status);
    }

    @Patch('/:id/title')
    updateTaskTitleById(
        @Param('id')id: string,
        @Body('title')title: string,
    ){
        return this.tasksService.updateTaskTitleById(id, title);
        
    }

    @Patch(':id')
    updateTask(
        @Param('id') id: string, 
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('status') status: TaskStatus,
        ){
            return this.tasksService.updateTask(id, title, description, status);
    }
     
    

    @Post()
    createTask(
      //  @Body('title') title: string,
    //    @Body('description') description: string,
        @Body() createTaskDTO: CreatTaskDTO
    ) : Task
    {
       return this.tasksService.createTask(createTaskDTO);
    }
}
