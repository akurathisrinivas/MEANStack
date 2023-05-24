export interface Organaisation {
    _id:string;
    state:string;
    organisationName:string;
    centers:[];
    
    status:boolean;
    createdAt:Date;
    updatedAt:Date;
    createdBy:string;
    updateBy:string;
}