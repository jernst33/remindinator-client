import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.scss']
})
export class GetUserComponent implements OnInit {

  user: any | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getUser() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(`thane:12345`)
      })
    };

    this.http.get<any>("http://localhost:8080/api/public/who-am-i", httpOptions).subscribe(res => {
      this.user = res;
      console.log(res);
    })
  }
}
