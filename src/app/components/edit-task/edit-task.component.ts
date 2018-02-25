import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  private task: any;
  private formatDate: string;
  constructor(private activateRoute: ActivatedRoute, private router: Router, private taskService: TaskService) { }

  ngOnInit() {
    this.task = this.taskService.getCurrentTask();
    const date = new Date(this.task.dueDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    this.formatDate =  year + '-' + month + '-' + day;
    console.log(this.formatDate);
  }

  public editTask() {
    this.task.dueDate = new Date(this.formatDate);
    this.taskService.editTask(this.task)
    .subscribe(taskUpdated => {
      alert('task updated successfully!');
      this.router.navigate(['home']);
    });
  }

}
