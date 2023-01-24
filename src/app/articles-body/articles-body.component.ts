import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, } from '@angular/router';
import { Subscription } from 'rxjs';
import { Articles } from '../articles/articles.interface';
import { HttpService } from '../http.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-articles-body',
  templateUrl: './articles-body.component.html',
  styleUrls: ['./articles-body.component.css']
})
export class ArticlesBodyComponent implements OnInit {
  sub: Subscription;
  articles: Articles;
  form: FormGroup;

/*   alternativeImage?: string | ArrayBuffer | null;
  alternativeImageName: string; */


/*   @ViewChild('imageInput')
  inputElem!: ElementRef<HTMLInputElement>; */


  add() {
    const data = this.form.value;

    const sub = this.http
      .post<Articles>('articles/create', data)
      .subscribe((item) => {
        sub.unsubscribe();
        this.router.navigate(['articles']);
      });
  }


  update() {
    console.log(this.form);

    for (const k in this.form.value) {
      (this.articles as any)[k] = this.form.value[k];
    }

    const sub = this.http
      .put<void>(`articles/updateone?_id=${this.articles._id}`, this.articles)
      .pipe()
      .subscribe(
        () => {
          console.log(this.articles, 'put method');
          sub.unsubscribe();
          this.router.navigate(['articles']);
        }
        // (err) => {
        //   alert('חביבי, הייתה שגיאה!');
        // }
      );
  }

  


buildForm(item: Articles){
this.form = new FormGroup({
  articleTitle: new FormControl(item.articleTitle, [Validators.required,
  ]),
  articleSubTitle: new FormControl(item.articleSubTitle, [Validators.required,
  ]),
  publishDate: new FormControl(item.publishDate, [
  ]),
  articleCategory: new FormControl(item.articleCategory, [Validators.required,
  ]),
  body: new FormControl(item.body,[Validators.required,
  ]),
  author: new FormControl(item.author, [Validators.required,
  ]),
}) 
console.log(this.form);

}


constructor(private http: HttpService, private route: ActivatedRoute, private router: Router, ) {

    this.sub = this.route.params.subscribe(data => {
      const id:any = data['id'];

      if (id) {
        const sub = this.http
          .get<Articles>(`articles/findArticle?_id=${id}`)
          .subscribe((data) => {
            console.log(sub, 'line 107 in the get method');
            this.articles = data;
            console.log(this.articles);

            this.buildForm(this.articles);
            sub.unsubscribe();
          });
      } else {
        this.articles = {
          _id: 0,
          articleTitle: '',
          articleSubTitle: '',
          publishDate: '',
          articleCategory:'',
          author: '',
          body: '',
          /* imgId: 0,
          imageName: '' */
          
        };
        console.log(this.articles);
        
        this.buildForm(this.articles);
      }
    });
}
ngOnInit() {
}

ngOnDestroy() {
  this.sub.unsubscribe();
}

}

