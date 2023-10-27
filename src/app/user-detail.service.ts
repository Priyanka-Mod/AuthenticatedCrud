import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './datatype.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService{
  private formDataSubject: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  
//   constructor(private http:HttpClient) { 
// //   userDetails(data:User){
// //     return this.http.post('http://localhost:3000/user-detail',data)
//   }
//     userDetails(data:User){
//         return this.http.post('http://localhost:3000/user-detail',data)
//     }

//     showUserDetail(){
//         return this.http.get("http://localhost:3000/user-detail")
//     }


  getUserFormData(): Observable<User> {
    return this.formDataSubject.asObservable();
  }
}