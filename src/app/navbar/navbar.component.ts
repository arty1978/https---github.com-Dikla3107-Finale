import { Component, OnInit } from '@angular/core';
import { Menu } from './navbar.interface';
import { UtilityService } from '../utility.service';
import { NavigationEnd, Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {



  user: UtilityService;
  active: string = '';
  menu: Menu[] = [

    { route: '/', title: 'Home' },
    { route: '/articles', title: 'Articles', isConnected: true },
    /* { route: '/signup', title: 'SignUp' },
    { route: '/signin', title: 'SignIn' }, */
  ];
  

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.utility.removeUser();
  }

  closeNav(){
    this.utility.isNavOpen = false;
  }
  openNav(){
    this.utility.isNavOpen = true;
  }
  
  constructor(public utility: UtilityService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.active = event.url;
      }
    })
  }
  ngOnInit(): void {

  }
}

