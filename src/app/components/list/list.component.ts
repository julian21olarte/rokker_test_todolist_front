import { Router } from '@angular/router';
import { TaskService } from './../../services/task.service';
import { Component, OnInit, Input, Renderer2, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent implements OnInit {

  @Input() public title: string;
  @Input() public pending: boolean;
  private tasks: Array<any>;
  private sortToggle: any;
  constructor(
    private taskService: TaskService,
    private router: Router,
    private renderer: Renderer2,
    private elementRef: ElementRef) {
    this.tasks = [];
    this.sortToggle = {
      name: {
        active: false,
        order: false
      },
      dueDate: {
        active: false,
        order: false
      },
      priority: {
        active: false,
        order: false
      }
    };
  }

  ngOnInit() {
    this.getTasks();
  }


  private getTasks() {
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
    this.tasks = this.tasks.sort( (task1, task2) => {
      if ( task1[data] > task2[data] === this.sortToggle[data].order) {
        return 1;
      }
      if ( task1[data] < task2[data] === this.sortToggle[data].order) {
        return -1;
      }
      return 0;
    });
    this.sortToggle[data].order = !this.sortToggle[data].order;
    this.changeIcon(data);
  }

  private changeIcon(data) {
    this.sortToggle[data].active = true;
    Object.keys(this.sortToggle).map(prop => {
      if (prop !== data) {
        this.sortToggle[prop].active = false;
      }
    });
  }

  public deleteTask(id) {
    this.taskService.deleteTask(id)
    .subscribe(taskDestroyed => {
      alert('Task Deleted!');
      this.getTasks();
    });
  }


  public editTask(task: any) {
    this.taskService.setCurrentTask(task);
    this.router.navigate(['editTask']);
  }



}


