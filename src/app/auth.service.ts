import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParamsOptions} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {User} from "./models/user";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);



  constructor(private http: HttpClient) {
  }

  public signIn() {

  }

  public signOut() {

  }

  public createUser(formGroup: FormGroup) {

  }

  private generateOptions(username: string, password: string) {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(`${username}:${password}`)
      })
    };
  }

}
