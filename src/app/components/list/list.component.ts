import { Router } from '@angular/router';
import { TaskService } from './../../services/task.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() title: String;
  @Input() pending: Boolean;
  private tasks: Array<any>;
  private sortToggle: Boolean;
  constructor(
    private taskService: TaskService,
    private router: Router) { 
    this.tasks = [];
    this.sortToggle = true;
  }

  ngOnInit() {
    this.getTasks();
  }


  public getTasks() {
    this.taskService.getTasks()
    .subscribe(tasks => {
      this.tasks = tasks.json()
      .filter(task => {
        return this.pending ? 
          new Date(task.dueDate) > new Date() : 
          new Date(task.dueDate) < new Date();
      });
    });
  }

  public sortTasks(data) {
    console.log(this.tasks.length);
    this.tasks = this.tasks.sort( (task1, task2) => {
      console.log(task1[data]);
      if( task1[data]>task2[data] == this.sortToggle ) {
        return 1;
      }
      if( task1[data]<task2[data] == this.sortToggle ) {
        return -1;
      }
      return 0;
    });
    this.sortToggle = !this.sortToggle;
  }


  public deleteTask(id) {
    this.taskService.deleteTask(id)
    .subscribe(taskDestroyed => {
      alert('Task Deleted!');
      this.getTasks();
    })
  }

  
  public editTask(task: any) {
    this.taskService.setCurrentTask(task);
    this.router.navigate(['editTask']);
  }



}


