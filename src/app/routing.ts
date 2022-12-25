import { Routes } from "@angular/router";
import { ArticlesComponent } from "./articles/articles.component";
import { HomeComponent } from "./home/home.component";




export const routes: Routes =[
    { path: '', component: HomeComponent },
    { path: 'articles', component: ArticlesComponent },


];