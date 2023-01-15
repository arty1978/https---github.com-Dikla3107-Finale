import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Articles } from '../home/articles.interface';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-check-article',
  templateUrl: './check-article.component.html',
  styleUrls: ['./check-article.component.css']
})
export class CheckArticleComponent {
  sub:Subscription;
  article: Articles;

  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router) {
    this.sub = this.route.params.subscribe(data => {
      const id: any = data['id'];

      if (id) {
        const sub = this.http.get<Articles>(`articles/findone/${id}`).subscribe(data => {
          this.article = data;
          sub.unsubscribe();
        });
      } 
        console.log(this.article);
    });
  }
}
