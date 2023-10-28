import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../datatype.model';
import { userDetail } from '../datatype.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-show-all-users',
  templateUrl: './show-all-users.component.html',
  styleUrls: ['./show-all-users.component.css']
})
export class ShowAllUsersComponent implements OnInit {
  str: string
  formShowData: any
  formArray: User[] = []
  userAddress: string = '';
  userDetailArray: userDetail[];

  userArray: userDetail[] = [];
  displayColumn = ['name', 'email', 'dob', 'number', 'institute', 'catagory', 'percentage', 'gender', 'hobby', 'address', 'summary', 'action'];

  constructor(private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.http.get<User[]>('http://localhost:3000/user-detail').subscribe(formData => {
      console.log(formData, "get")
      this.formArray = formData
      for (let i in formData) {
        this.formShowData = this.formArray[i];
      }
      const userDetail: userDetail = {
        name: this.formShowData.name,
        email: this.formShowData.email,
        dob: this.formShowData.dob,
        number: this.formShowData.number,
        institute: this.formShowData.education.institute,
        catagory: this.formShowData.education.catagory,
        percentage: this.formShowData.education.percentage,
        gender: this.formShowData.gender,
      }

      for(let key in  this.formShowData.hobby ){
        if(this.formShowData.hobby[key]) {
          this.str = this.str + '  ' + key; + '<br/>'
        }
      }
      if(this.str){
        userDetail['hobby']=this.str
      }

      this.userArray.push(userDetail)
      this.userDetailArray = this.userArray

    });
  }
  onCreateUser(){
    this.router.navigate(['/form'])
  }
  onEdit(data: any): void {
    console.log(data)
    this.router.navigate(['/form', data])
  }
  onDelete(userId: number): void {
    this.http.delete("http://localhost:3000/user-detail" + "/" + userId).subscribe(deleteUpadated => {
      console.log(userId + 'is deleted')

      this.http.get<User[]>("http://localhost:3000/user-detail").subscribe(formData => {
        console.log(formData, "get")
        this.formArray = formData
        for (let i in formData) {
          this.formShowData = this.formArray[i];
        }
        const userDetail: userDetail = {
          name: this.formShowData.name,
          email: this.formShowData.email,
          dob: this.formShowData.dob,
          number: this.formShowData.number,
          institute: this.formShowData.education.institute,
          catagory: this.formShowData.education.catagory,
          percentage: this.formShowData.education.percentage,
          gender: this.formShowData.gender,
        }

        for (let key in this.formShowData.hobby) {
          if (this.formShowData.hobby[key]) {
            this.str = this.str + '  ' + key; + '<br/>'
          }
        }

        if (this.str) {
          userDetail['hobby'] = this.str
        }

        this.userArray.push(userDetail)
        this.userDetailArray = this.userArray
      })

    })
  }
}
