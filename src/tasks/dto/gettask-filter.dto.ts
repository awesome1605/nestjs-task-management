import { TaskStatus } from "../task.model"

export class getTasksFiletrDTO{
    status: TaskStatus;
    search: string;
}