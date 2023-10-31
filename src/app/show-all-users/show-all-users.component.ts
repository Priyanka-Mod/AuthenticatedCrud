import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../datatype.model';
import { userDetail } from '../datatype.model';
import { Router } from '@angular/router';
import { UserDataService } from 'src/user-data.service';


@Component({
  selector: 'app-show-all-users',
  templateUrl: './show-all-users.component.html',
  styleUrls: ['./show-all-users.component.css']
})
export class ShowAllUsersComponent implements OnInit {
  formShowUserData: User
  userDataArray: User[] = []
  userAddress: string = '';
  userDetailValues: userDetail[];

  userDetailArray: userDetail[] = [];
  displayColumn = ['name', 'email', 'dob', 'number', 'institute', 'catagory', 'percentage', 'gender', 'hobby', 'address', 'summary', 'action'];

  constructor(private http: HttpClient,
    private userData:UserDataService,
    private router: Router) { }

  ngOnInit(): void {
    this.userData.userDetailGetService().subscribe(formData => {
      this.userDataArray = formData as User[];   //to define that it is of type user[] in get request
      for (let i in formData) {
        this.formShowUserData = this.userDataArray[i];
      }
      const userDetail: userDetail = {
        name: this.formShowUserData.name,
        email: this.formShowUserData.email,
        dob: this.formShowUserData.dob,
        number: this.formShowUserData.number,
        institute: this.formShowUserData.education.institute,
        catagory: this.formShowUserData.education.catagory,
        percentage: this.formShowUserData.education.percentage,
        gender: this.formShowUserData.gender,
      }

      this.userDetailArray.push(userDetail)
      this.userDetailValues = this.userDetailArray

    });
  }
  onCreateUser(){
    this.router.navigate(['/form'])
  }
  onEditUser(userId: number): void {
    this.router.navigate(['/form', userId])
  }
  onDeleteUser(userId: number): void {
    this.userData.userDetailDeleteService(userId).subscribe(deleteUpadated => {

      this.userData.userDetailGetService().subscribe(formData => {
        this.userDataArray = formData as User[]
        for (let i in formData) {
          this.formShowUserData = this.userDataArray[i];
        }
        const userDetail: userDetail = {
          name: this.formShowUserData.name,
          email: this.formShowUserData.email,
          dob: this.formShowUserData.dob,
          number: this.formShowUserData.number,
          institute: this.formShowUserData.education.institute,
          catagory: this.formShowUserData.education.catagory,
          percentage: this.formShowUserData.education.percentage,
          gender: this.formShowUserData.gender,
        }

        this.userDetailArray.push(userDetail)
        this.userDetailValues = this.userDetailArray
      })

    })
  }
}
