import { Component, OnInit } from '@angular/core';
import { Users } from '../users/users.interface';
import { Menu } from './navbar.interface';
import { UtilityService } from '../utility.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  active: string = '';
  menu: Menu[] = [

    { route: '/', title: 'Home' },
    { route: '/articles', title: 'Articles' },
    { route: '/signup', title: 'SignUp' },
    { route: '/signin', title: 'SignIn' },
  ];
  constructor(public utility: UtilityService) { }

  ngOnInit(): void {
  }
}
