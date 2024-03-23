export interface User {
    id?: string;
    name?: string;
    email: string;
    password?: string;
    leaves?: {
        sl?:number,
        cl?:number
    }
    position?: string;
    role?: string;
}