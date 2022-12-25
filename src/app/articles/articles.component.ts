import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Articles } from './articles.interface';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit{
  articles: Articles[] = [];

  edit(item: Articles) {
    this.router.navigate(['articles-body', item.id]);
  }
  remove(item: Articles) {
    const sub = this.http.delete<void>(`articles/${item.id}`).subscribe(data => {
      const i = this.articles.findIndex(x => x.id == item.id);
      this.articles.splice(i, 1);
      sub.unsubscribe();
    });
  }
  constructor(private http: HttpService, private router: Router) { }

  ngOnInit(): void {
    const sub = this.http.get<Articles[]>('articles').subscribe(data => {
      this.articles = data;
      sub.unsubscribe();
    });
  }


}
