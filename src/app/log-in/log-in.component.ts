import { Component} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  emailValue: string ;
  passwordValue: string;
  
  constructor(private router: Router ){}

  onLogInUser(){
    this.router.navigate(['/form'])
  }
  onShowAllUser(){
    this.router.navigate(['/allUserDetails'])
  }
}
