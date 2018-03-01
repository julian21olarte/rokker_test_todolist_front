import { TaskService } from './../../services/task.service';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  private name: String;
  private dueDate: Date;
  private priority: Number;
  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
  }

  public addTask() {
    const task = {
      name: this.name,
      dueDate: this.dueDate,
      priority: this.priority,
    };
    if (!this.taskService.validateTask(task)) {
      alert('Please complete all fields!');
      return false;
    }
    console.log(task);
    this.taskService.addTask(task)
    .subscribe(taskStored => {
      alert('task added successfully!');
      this.router.navigate(['home']);
    });
  }


}
