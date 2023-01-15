import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { GridArticles } from '../../../dadad/gridArticles.interface';
import { Articles } from '../home/articles.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  articles: Articles[] = [];



  constructor(private http: HttpService, private router: Router) { }

  ngOnInit(): void {
    const sub = this.http.get<Articles[]>('articles').subscribe((data) => {
      this.articles = data;
      sub.unsubscribe();
    });
  }

}


