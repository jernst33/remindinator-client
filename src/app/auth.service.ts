import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParamsOptions} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "./models/user";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);



  constructor(private http: HttpClient) {
  }

  public signIn(username: string, password: string): void {
    this.http.get<User>("http://localhost:8080/api/public/who-am-i", this.generateOptions(username, password)).subscribe(res => {
      this.user$.next(res);
    });
  }

  public signOut(): Promise<void> {
    this.user$.next(null);
    return new Promise<void>(() => {});
  }

  public createUser(formGroup: FormGroup): Observable<User> {

    const username: string = formGroup.get('name')?.value;
    const password: string = formGroup.get('password')?.value;

    return this.http.post<User>("http://localhost:8080/api/public", {
      username,
      birth: new Date(""),
      email: formGroup.get('email')?.value,
      password,
      human: formGroup.get('human')?.value,
    }, this.generateOptions(username, password));
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
