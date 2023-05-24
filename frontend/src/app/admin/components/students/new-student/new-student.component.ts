import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { StudentService } from 'src/app/shared/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/shared/models/student.model';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss']
})
export class NewStudentComponent implements OnInit {

  Url = environment.root;
  imagePath?: string;
  showImage?: boolean;
  imagePreview: any;
  imageName: any;
  file: any;
  id: any;
  studentData?: Student;

  studentForm = new FormGroup({
    studentName: new FormControl('', Validators.required),
    studentEmail: new FormControl('', Validators.required),
    studentMobile: new FormControl('', Validators.required),
    roomNo: new FormControl(''),
    cabinNo: new FormControl(''),
    mbbsBatch: new FormControl(''),
  })


  constructor(
    private studentService: StudentService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {

    
   }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    this.initForm();
  }

  initForm(){

    if (this.id) {
      this.showImage = true;
     
      this.studentService.getStudentById(this.id).subscribe(data => {
        this.studentData = data as Student;
        this.imagePath = this.studentData.image
        this.studentForm = this.formBuilder.group({
          studentName: new FormControl(this.studentData.studentName, Validators.required),
          studentEmail: new FormControl(this.studentData.studentEmail, Validators.required),
          studentMobile: new FormControl(this.studentData.studentMobile, Validators.required),
          roomNo: this.studentData.roomNo,
          cabinNo: this.studentData.cabinNo,
          mbbsBatch: this.studentData.mbbsBatch,
          status: this.studentData.status
        })
      })
      
      }
    }

  

  onSubmit() {

    if (this.id) {
      this.studentService.updateStudent(this.id, this.studentForm.value).subscribe(data => {
        this.updateImage(this.id)
      })
    }
    else {
      this.studentService.addStudent(this.studentForm.value).subscribe(data => {
        this.studentData = data as Student;
        console.log('studentdata',this.studentData);
        
        this.updateImage(this.studentData._id)
      })
    }
    this.router.navigate(['/admin/students/new-student'])

  }

  updateImage(id: string) {
    const fb = new FormData();
    fb.append('image', this.file);
    this.studentService.updateImage(id, fb).subscribe((resp) => {
    });
  }

  onFileSelected(event: any) {

    this.imageName = event.target.files[0].name;
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.file);
  }

}
