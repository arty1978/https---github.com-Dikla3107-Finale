import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from '../http.service';
import { Users } from '../users/users.interface';
import { UtilityService } from '../utility.service';
import { SignInResult } from './signInResult.interface';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  form: FormGroup;
  sub: Subscription;
  user: Users;


  signInButton() {
    const data = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    console.log(data, 'inside signIn function');

    const sub = this.http
      .post<SignInResult>('users/signin', data)
      .subscribe((item) => {
        console.log(item, '!!!');

        localStorage.setItem('token', item.token);
        localStorage.setItem('user', JSON.stringify(item.user));

        console.log(item, 'token of logged user');
        this.http.setToken();
        this.utility.setUser(item.user);

        sub.unsubscribe();
        this.router.navigate(['articles']);
        console.log(sub, 'inside post method signin.ts');
      });
  }
  buildForm(item: Users) {
    this.form = new FormGroup({
      email: new FormControl(item.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(item.password, [Validators.required]),
    });
  }
  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    public utility: UtilityService

  ) {
    this.user = {
      _id: 0,
      userName: '',
      fullName: '',
      email: '',
      password: '',
    };
    this.buildForm(this.user);
  }

  ngOnInit() { }
}