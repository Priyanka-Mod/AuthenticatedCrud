import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './app/datatype.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService{
  private formDataSubject: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  
  constructor(private http:HttpClient) { }
  userDetailPostService(userData:User){
    return this.http.post<User>('http://localhost:3000/user-detail',userData)
  }
  userDetailGetIdService(userId:number){
    return this.http.get<User>('http://localhost:3000/user-detail'+"/"+userId)
  }
  userDetailPutService(userId:number , userData){
    return this.http.put<User>('http://localhost:3000/user-detail'+"/"+userId,userData)
  }
  userDetailGetService(){
    return this.http.get<User | User[]>('http://localhost:3000/user-detail')
  }
  userDetailDeleteService(userId:number){
    return this.http.delete<User>('http://localhost:3000/user-detail'+"/"+userId)
  }
}