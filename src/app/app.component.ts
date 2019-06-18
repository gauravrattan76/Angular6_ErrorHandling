import {retryWhen} from 'rxjs/operators';
import { Component,OnInit} from '@angular/core';
import {messageService} from './messageService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[messageService],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private _messageService :messageService){}
  employeeList:any;
  errorMessage:any;

  ngOnInit(){
       this._messageService.getEmployees().subscribe((data)=>
       this.employeeList = data,
       (error) => this.errorMessage = error)
  }
}
