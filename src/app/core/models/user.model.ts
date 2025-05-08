export interface User {
    id?: string;         // id du db.json
    uid?: string;        // uid Firebase
    email: string;
    name: string; 
    role?: 'admin' | 'user';
    

}