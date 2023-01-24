import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {User} from "../models/user";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {


  userForm: FormGroup = new FormGroup<any>({});

  constructor(private http: HttpClient,
              private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [null, Validators.required],
      birth: [null, Validators.required],
      email: [null, Validators.required],
      password:[null, Validators.required],
      human: [null, Validators.required],
    });
  }

  title = 'remindinator-client';

  getMessage() {
    this.http.post("http://localhost:8080/persons", {
      "name": "Jacob",
      "birth": 920679310
    }).subscribe(res => {
      console.log(res)
    })
    // this.http.get<string>("http://localhost:8080/persons/hello").pipe().subscribe(res => {
    //   console.log(res)
    // })
  }

  onSubmit() {
    console.log(this.userForm);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(`${this.userForm.get('name')?.value}:${this.userForm.get('password')?.value}`)
      })
    };

    this.http.post<User>("http://localhost:8080/api/public", {
      name: this.userForm.get('name')?.value,
      birth: new Date(""),
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
      human: this.userForm.get('human')?.value,
    }).subscribe(result => {
      this.authService.signIn(result)
      console.log(result)
      this.router.navigate(['/calendar-page'])
    })

  }
}
