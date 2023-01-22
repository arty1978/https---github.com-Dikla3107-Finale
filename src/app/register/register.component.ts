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
    console.log(data, 'data regibutton');
    

    const sub = this.http.post<Register>("users/create", data).subscribe(item => {
      sub.unsubscribe();
      console.log(sub, "sub register");
      
      this.router.navigate(['']);
      
    })  
  } 

  buildForm(item: Register) {
    this.form = new FormGroup({

      userName: new FormControl(item.userName, [Validators.required]),

      fullName: new FormControl(item.fullName, [Validators.required]),

      email: new FormControl(item.email, [Validators.required]),

      password: new FormControl(item.password, [Validators.required]),

      passwordConfirmation: new FormControl(item.passwordConfirmation, [Validators.required]),
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
          passwordConfirmation: ''
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


