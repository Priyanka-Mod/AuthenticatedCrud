import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {User} from '../datatype.model';
import { userDetail } from '../datatype.model';
import { HttpClient } from '@angular/common/http';
import { UserDataService } from 'src/user-data.service';

@Component({
    selector: 'app-show-user-detail',
    templateUrl: './show-user-detail.component.html',
    styleUrls: ['./show-user-detail.component.css']
  }) 

export class ShowUserDetailComponent implements OnInit{
  formUserData:User;
  hobby:string='';
  userAddress:string='';
  userDetailValues:userDetail[];
  userDetailsArray:userDetail[] = [];
  displayColumn =['name','email','dob','number','institute','catagory','percentage','gender']; 

  constructor(private router:Router,
              private http:HttpClient,
              private userService:UserDataService,
              private route: ActivatedRoute){}
  ngOnInit(): void {

    const userId = this.route.snapshot.params['id'];
    if(!userId){
      this.userService.getUser().subscribe(users => {

        for(let user in users){
          this.formUserData = users[user];
        }
  
        const userDetail:userDetail= {
          name: this.formUserData.name,
          email:this.formUserData.email,
          dob:this.formUserData.dob,
          number:this.formUserData.number,
          institute:this.formUserData.education.institute,
          catagory:this.formUserData.education.catagory,
          percentage:this.formUserData.education.percentage,
          gender:this.formUserData.gender,
        }
  
        for(let key in  this.formUserData.hobby ){
          if(this.formUserData.hobby[key]) {
            this.hobby = this.hobby + '  ' + key; + '<br/>'
          }
        }
  
        for(let address in this.formUserData.address){
          if(this.formUserData.address[address]){
            this.userAddress += `  ${this.formUserData.address[address].addedAddress}\n\n`;
          }
        }
    
        if(this.hobby){
          this.displayColumn.push('hobby')
          userDetail['hobby']=this.hobby
        }
  
      
        if(this.userAddress){
          this.displayColumn.push('address')
          userDetail['address'] = this.userAddress;
        }
  
        if(this.formUserData.summary){
          this.displayColumn.push('summary')
          userDetail['summary']=this.formUserData.summary
        }
  
        this.displayColumn.push('action');
        this.userDetailsArray.push(userDetail)
        this.userDetailValues=this.userDetailsArray
      });
    }
      

      
      if(userId){
        this.userService.editUser(userId).subscribe(formUserData => {
          console.log(formUserData)
          this.formUserData = formUserData
          const userDetail:userDetail= {
            name: this.formUserData.name,
            email:this.formUserData.email,
            dob:this.formUserData.dob,
            number:this.formUserData.number,
            institute:this.formUserData.education.institute,
            catagory:this.formUserData.education.catagory,
            percentage:this.formUserData.education.percentage,
            gender:this.formUserData.gender,
          }
    
          for(let key in this.formUserData.hobby ){
            if(this.formUserData.hobby[key]) {
              this.hobby = this.hobby + '  ' + key; + '<br/>'
            }
          }
    
          for(let address in this.formUserData.address){
            if(this.formUserData.address[address]){
              this.userAddress += `  ${this.formUserData.address[address].addedAddress}\n\n`;
            }
          }
      
          if(this.hobby){
            this.displayColumn.push('hobby')
            userDetail['hobby']=this.hobby
          }
    
        
          if(this.userAddress){
            this.displayColumn.push('address')
            userDetail['address'] = this.userAddress;
          }
    
          if(this.formUserData.summary){
            this.displayColumn.push('summary')
            userDetail['summary']=this.formUserData.summary
          }
    
          this.displayColumn.push('action');
          this.userDetailsArray.push(userDetail)
          this.userDetailValues=this.userDetailsArray
        });
      }
    
  
  }
  
  onEditUser():void{
    if(this.route.snapshot.params['id']){
      const userId = this.route.snapshot.params['id']
      this.userService.editUser(userId).subscribe((result) => {
        if(result){
          this.router.navigate(['/form',userId])
        }
      })
    }
    else{
      this.router.navigate(['/form'])
    }
    
  }
  onDeleteUser():void{
    this.userService.deleteUser(this.formUserData.id).subscribe(update=>{
      if (this.userDetailValues) {
        this.userDetailValues = undefined;
      }
    })
  }
  
  onShowAll(){
    this.router.navigate(['/user-list'])
  }
} 


