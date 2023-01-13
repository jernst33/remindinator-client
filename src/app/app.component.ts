import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  message: string = 'No message found :(';
  userForm: FormGroup = new FormGroup<any>({});

  constructor(private http: HttpClient,
              private fb: FormBuilder) {
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

    this.http.post("http://localhost:8080/api/public", {
      name: this.userForm.get('name')?.value,
      birth: new Date(""),
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
      human: this.userForm.get('human')?.value,
    }, httpOptions).subscribe(result => {
      console.log(result)
    })

  }
}
