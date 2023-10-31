import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './app/datatype.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService{
  
  constructor(private readonly http:HttpClient) { }
  updateUser(userData:User){
    return this.http.post<User>('http://localhost:3000/user-detail',userData)
  }
  editUser(userId:number){
    return this.http.get<User>('http://localhost:3000/user-detail'+"/"+userId)
  }
  updateSingleUser(userId:number , userData){
    return this.http.put<User>('http://localhost:3000/user-detail'+"/"+userId,userData)
  }
  getUser(){
    return this.http.get<User | User[]>('http://localhost:3000/user-detail')
  }
  deleteUser(userId:number){
    return this.http.delete<User>('http://localhost:3000/user-detail'+"/"+userId)
  }
}