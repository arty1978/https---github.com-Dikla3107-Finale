import { Injectable } from '@angular/core';
import { Users } from './users/users.interface';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {
    private user?: Users;

    setUser(user?: Users) {
        this.user = user;
    }

    getUser() {
        return this.user;
    }

    constructor() { }
}