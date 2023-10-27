import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../datatype.model';
import { userDetail } from '../datatype.model';


@Component({
  selector: 'app-show-all-users',
  templateUrl: './show-all-users.component.html',
  styleUrls: ['./show-all-users.component.css']
})
export class ShowAllUsersComponent implements OnInit {

  formArray
  userAddress:string='';
  userDetailArray:userDetail[];

  userArray:userDetail[] = [];
  displayColumn =['name','email','dob','number','institute','catagory','percentage','gender']; 

  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/user-detail').subscribe(formData => {
      console.log(formData , "get")
      this.formArray = formData

      
    });
  }
}
