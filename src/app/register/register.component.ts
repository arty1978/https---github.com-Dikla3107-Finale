import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from '../http.service';
import { Register } from './registrer.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  register: Register;
  sub: Subscription;


  regiButton() {
    const data = this.form.value;
    console.log(data, 'data');
    

    const sub = this.http.post<Register>("users/create", data).subscribe(item => {
      sub.unsubscribe();
      console.log(sub, "sub");
      
      this.router.navigate(['']);
      
    })  
  } 

  buildForm(item: Register) {
    this.form = new FormGroup({

      userName: new FormControl(item.userName, [Validators.required]),

      fullName: new FormControl(item.fullName, [Validators.required]),

      email: new FormControl(item.email, [Validators.required]),

      password: new FormControl(item.password, [Validators.required]),

      verifyYourPassword: new FormControl(item.verifyYourPassword, [Validators.required]),
    });
    console.log(this.form, 'this form');
    
  }


  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router,) {
    this.sub = this.route.params.subscribe(data => {
      const id: any = data['id'];

      if (id) {
        const sub = this.http.get<Register>(`/users/find/${id}`).subscribe(data => {
          this.register = data;
          this.buildForm(this.register);
          sub.unsubscribe();
        });
      } else {
        this.register = {
          _id: 0,
          userName: '',
          fullName: '',
          email: '',
          password: '',
          verifyYourPassword: ''
        };

          this.buildForm(this.register);
          console.log(this.register, 'this register constructor');
          
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}


