import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { SignInResult } from './signin/signInResult.interface';
import { UtilityService } from './utility.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular';

  constructor(public utility: UtilityService, private http: HttpService, private router: Router) { }

  ngOnInit() {
    const sub = this.http.get<SignInResult>("login").pipe(finalize(() => {
      if (sub?.unsubscribe) {
        sub.unsubscribe();
      }
    })).subscribe(data => {
      if (data.status == 'error') {
        this.router.navigate(['login']);
      } else {
        this.utility.setUser(data.user);
      }
    });
  }
}
