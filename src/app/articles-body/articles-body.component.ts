import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, } from '@angular/router';
import { Subscription } from 'rxjs';
import { Articles } from '../articles/articles.interface';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-articles-body',
  templateUrl: './articles-body.component.html',
  styleUrls: ['./articles-body.component.css']
})
export class ArticlesBodyComponent implements OnInit {
  sub: Subscription;
  articles: Articles;
  form: FormGroup;
  alternativeImage?: string | ArrayBuffer | null;
  alternativeImageName: string;


  @ViewChild('imageInput')
  inputElem!: ElementRef<HTMLInputElement>;

update(){
  for (const k in this.form.value) {
    (this.articles as any)[k] = this.form.value[k];
  }
  if (this.alternativeImage) {
    this.articles.image = this.alternativeImage;
    this.articles.imageName = this.alternativeImageName;
  }

  const sub = this.http.put<void>("articles", this.articles).subscribe(() => {
    sub.unsubscribe();
    this.router.navigate(['articles']);
  }, (err) => {
    alert("Error")
  });
}

add(){
  const data = this.form.value;

  if (this.alternativeImage) {
    data.image = this.alternativeImage;
    data.imageName = this.alternativeImageName;
  }

  const sub = this.http.post<Articles>("articles", data).subscribe(item => {
    sub.unsubscribe();
    this.router.navigate(['articles']);
  });
}


buildForm(item: Articles){
this.form = new FormGroup({
  articleName: new FormControl(item.articleName, [Validators.required,
  ]),
  articleCategory: new FormControl(item.articleCategory, [Validators.required,
  ]),
  author: new FormControl(item.author, [Validators.required,
  ]),
  publishDate: new FormControl(this.date.transform(item.publishDate, 'yyyy-MM-dd'), [
    Validators.required,
  ]),
  body: new FormControl(item.body, [Validators.required,
  ]),
  imgId: new FormControl(item.imgId, [
    Validators.required,
  ]),
})
}

  selectImage() {
    this.inputElem.nativeElement.click();
  }

  imageChange() {
    const files = this.inputElem.nativeElement.files;

    if (files?.length) {
      const reader = new FileReader();

      reader.onload = (ev) => {
        this.alternativeImage = ev.target?.result;
        this.alternativeImageName = files[0].name;
      };

      reader.readAsDataURL(files[0]);
    }
  }



constructor(private http: HttpService, private route: ActivatedRoute, private date: DatePipe, private router: Router) {
    this.sub = this.route.params.subscribe(data => {
      const id = data['id'];

      if (id) {
        const sub = this.http.get<Articles>(`articles/${id}`).subscribe(data => {
          this.articles = data;
          this.buildForm(this.articles);
          sub.unsubscribe();
        });
      } else {
        this.articles = {
          id: 0,
          articleName: '',
          articleCategory:'',
          author: '',
          publishDate: '',
          body: '',
          imgId: 0,
          
        };

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

