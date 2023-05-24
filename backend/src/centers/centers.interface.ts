export interface CenterInterface {
    
    courses: CourseInterface[];
   
}

export interface CourseInterface{

    courseName ?: String;
    createdBy ?: String;
    createdAt ?: Date;
    updatedBy ?: String;
    updatedAt ?: Date;
}