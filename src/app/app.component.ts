import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  message: string = 'No message found :(';

  constructor(private http: HttpClient) {
  }

  title = 'remindinator-client';

  getMessage() {
    this.http.post("http://localhost:8080/persons/hello", {
      "name": "Jacob",
      "birth": 920679310
    }).subscribe(res => {
      console.log(res)
    })
    // this.http.get<string>("http://localhost:8080/persons/hello").pipe().subscribe(res => {
    //   console.log(res)
    // })
  }
}
