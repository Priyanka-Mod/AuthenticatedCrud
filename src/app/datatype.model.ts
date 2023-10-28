export interface LogIn{
    email:string,
    password:string
}
export interface userDetail{
    name: string; 
    email: string; 
    dob: Date; 
    number: number; 
    institute: string; 
    catagory: string; 
    percentage: number; 
    gender: string
}
export interface User{
    id:number
    name: string,
    dob: Date,
    email:string,
    number:number,
    education:{
        institute:string,
        catagory:string,
        percentage:number
    },
    hobby?: {
        music:boolean,
        art:boolean,
        dance:boolean,
        read:boolean,
    },
    gender:string,
    address?:{addedAddress:string}[],
    summary?:string
}