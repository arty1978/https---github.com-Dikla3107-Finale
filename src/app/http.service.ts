import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class HttpService{
    private readonly url ='hhtp://localhost:4000';
    private readonly  options = {withCredentials: true};

    get<T>(route: string){
        return this.httpClient.get<T>(`${this.url}/${route}`, this.options);
    }

    post<T>(route: string){
        return this.httpClient.post<T>(`${this.url}/${route}`, this.options);
    }

    put<T>(route: string){
        return this.httpClient.put<T>(`${this.url}/${route}`, this.options);
    }

    delete<T>(route: string){
            return this.httpClient.delete<T>(`${this.url}/${route}`, this.options)
    }


    constructor(private httpClient: HttpClient) { }

}