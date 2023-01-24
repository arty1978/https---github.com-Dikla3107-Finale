import { Routes } from "@angular/router";
import { ArticlesBodyComponent } from "./articles-body/articles-body.component";
import { ArticlesComponent } from "./articles/articles.component";
import { CheckArticleComponent } from "./check-article/check-article.component";
import { HomeComponent } from "./home/home.component";
import { NoSignInComponent } from "./no-sign-in/no-sign-in.component";
import { RegisterComponent } from "./register/register.component";
import { SigninComponent } from "./signin/signin.component";

import { UsersComponent } from "./users/users.component";




export const routes: Routes =[
    { path: '', component: HomeComponent },
    { path: 'articles', component: ArticlesComponent },
    { path: 'articles-body', component: ArticlesBodyComponent },
    { path: 'articles-body/:id', component: ArticlesBodyComponent },
    { path: 'signup', component: RegisterComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'checkarticle/:id', component: CheckArticleComponent },
    { path: 'users', component: UsersComponent },
    { path: 'didnt sign in', component: NoSignInComponent },
    


];