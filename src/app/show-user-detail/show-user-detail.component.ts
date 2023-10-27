import { Component ,OnInit} from '@angular/core';
import { UserDataService } from '../user-detail.service';
import { Router } from '@angular/router';
import {User} from '../datatype.model';
import { userDetail } from '../datatype.model';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-show-user-detail',
    templateUrl: './show-user-detail.component.html',
    styleUrls: ['./show-user-detail.component.css']
  }) 

export class ShowUserDetailComponent implements OnInit{
  formData:User;
  str:string='';
  userAddress:string='';
  userDetailArray:userDetail[];

  userArray:userDetail[] = [];
  displayColumn =['name','email','dob','number','institute','catagory','percentage','gender']; 

  constructor(private userData:UserDataService,
              private router:Router,
              private http:HttpClient){}
  ngOnInit(): void {

    this.http.get('http://localhost:3000/user-detail').subscribe(formData => {
      console.log(formData , "get")

      for(let i in formData){
        this.formData = formData[i];
      }

      const userDetail:userDetail= {
        name: this.formData.name,
        email:this.formData.email,
        dob:this.formData.dob,
        number:this.formData.number,
        institute:this.formData.education.institute,
        catagory:this.formData.education.catagory,
        percentage:this.formData.education.percentage,
        gender:this.formData.gender,
      }

      for(let key in  this.formData.hobby ){
        if(this.formData.hobby[key]) {
          this.str = this.str + '  ' + key; + '<br/>'
        }
      }

      for(let a in this.formData.address){
        if(this.formData.address[a]){
          this.userAddress += `  ${this.formData.address[a].addedAddress}\n\n`;
        }
      }
  
      if(this.str){
        this.displayColumn.push('hobby')
        userDetail['hobby']=this.str
      }

    
      if(this.userAddress){
        this.displayColumn.push('address')
        userDetail['address'] = this.userAddress;
      }

      if(this.formData.summary){
        this.displayColumn.push('summary')
        userDetail['summary']=this.formData.summary
      }

      this.displayColumn.push('action');
      this.userArray.push(userDetail)
      this.userDetailArray=this.userArray
    });
  }
  
  onEdit():void{
    this.router.navigate(['/form'])
  }
  onDelete(data:number):void{
    this.http.delete("http://localhost:3000/user-detail"+ "/id:" +data).subscribe(update=>{
      console.log(update)
    })
  }
  
  onShowAll(){
    this.router.navigate(['/showAll'])
  }
} 


