import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
    deleteCourse(course: string) {
      throw new Error('Method not implemented.');
    }

    Url = environment.root;
    studentId: number;
    private headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(
        private httpClient: HttpClient,
        ) {
          this.studentId = 0
         }
    

    addStudent(student: any) {
       // console.log('student',student);
        
    return this.httpClient.post(`${this.Url}/student`, student);
    }
    updateStudent(id: string, student: any){
        return this.httpClient.patch(`${this.Url}/student/${id}`, student);
    }
    updateImage(id: string, files: any) {
        return this.httpClient.put(`${this.Url}/student/image/${id}`, files);
      }

      getStudentById(id: string) {
        return this.httpClient.get(`${this.Url}/student/${id}`);
      }
    getStudent(){
        return this.httpClient.get(`${this.Url}/student`);
    }
    
    deleteStudent(id: string) {
      return this.httpClient.delete(`${this.Url}/student/${id}`, { headers: this.headers });
    }

    setter(StudentId: any) {
      this.studentId = StudentId;
    }
    getter() {
      return this.studentId;
    }

}