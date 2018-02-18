import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class TaskService {

    private url: string;
    private currentTask: any;
    constructor(private http: Http) {
        this.url = 'https://rokker-test-todolist.herokuapp.com/task';
        this.currentTask = null;
    }

    public getTasks() {
        return this.http.get(this.url);
    }

    public addTask(task) {
        const data = {
            name: task.name,
            dueDate: task.dueDate,
            priority: task.priority
        };
        console.log(data);
        return this.http.post(this.url + '/create', data);
    }

    public deleteTask(id) {
        return this.http.get(`${this.url}/destroy/${id}`);
    }

    public editTask(task) {
        return this.http.post(this.url + '/update', {task, taskId: task._id});
    }

    public getCurrentTask() {
        return this.currentTask;
    }

    public setCurrentTask(task: any) {
        console.log(task);
        this.currentTask = task;
    }
}
