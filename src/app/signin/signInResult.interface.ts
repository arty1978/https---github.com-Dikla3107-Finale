import { Users } from "../users/users.interface";
export interface SignInResult{
    user: Users;
    token: string;
    status: "error" | "success";
}