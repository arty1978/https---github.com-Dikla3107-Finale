import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from './navbar.interface';


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
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
}
