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

  onLogIn(data){
    console.log(data)
    this.router.navigate(['/form'])
  }
  onShowAll(){
    this.router.navigate(['/allUserDetails'])
  }
}
