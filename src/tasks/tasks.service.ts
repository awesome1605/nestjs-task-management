import { Injectable } from '@nestjs/common';
import {Task, TaskStatus} from './task.model';
import {v1 as uuidv1} from 'uuid';
import { CreatTaskDTO } from './dto/create-task.dto';
import { getTasksFiletrDTO } from './dto/gettask-filter.dto';



@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDTO: getTasksFiletrDTO): Task[] {
        const {status, search} = filterDTO;
        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter(task => task.status === status);
                    }
        if (search) {
            tasks = tasks.filter(task => 
                task.title.includes(search) ||
                task.description.includes(search),   );
                     }

        return tasks;
    }
    
    getTaskById(id: string): Task{
        return this.tasks.find(task => task.id === id);
    }


    deleteTaskById(id: string): void{// does not return anything, optionally put void
        this.tasks = this.tasks.filter(task => task.id === id);

    }


    updateTaskStatusById(id: string, status: TaskStatus): Task  {
        const task = this.getTaskById(id) ;
        task.status=status;
        return task;
    }

    updateTaskTitleById(id: string, title: string): Task  {
        const task = this.getTaskById(id) ;
        task.title = title;
        return task;
    }

    updateTask(
        id: string,
        title: string,
        description: string,
        status: TaskStatus,
): Task    {
    const task = this.getTaskById(id) ;
    
    if(title){
        task.title = title;
    }
    if(description){
        task.description = description;
    }
    if(status){
        task.status = status;
    }
   return  task;
}



    createTask(createTaskDTO: CreatTaskDTO): Task  {
        const {title, description} = createTaskDTO;

        const task: Task = {
            id: uuidv1(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }


  getHello(): string{
        return 'Hello World';
    }
    
}
