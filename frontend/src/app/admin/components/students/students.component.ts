import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/shared/services/student.service';
import { Router } from '@angular/router';
import { Student } from 'src/app/shared/models/student.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  url = environment.root;
  studentData: Student[] = [];
  dataSource: any;
  isLoading?: boolean;
  totalLength = [10, 25, 50, 100];
  pageIndex?: number;
  pageSize?: number;
  total!: number;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  displayedColumns: string[] = [
    'sno',
    'image',
    'studentName',
    'studentEmail',
    'studentMobile',
    'status',
    'actions',
  ];
  @ViewChild(MatSort, { static: true }) sort?: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  constructor(
    private studentService: StudentService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(){
      this.studentService.getStudent().subscribe((data) => {
      this.studentData = data as Student[];
      this.dataSource = new MatTableDataSource(this.studentData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.data.length;
    });
  }

  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  deleteStudent(student: string) {
    if (confirm("Are you sure! You want to delete this record?") === true) {
      this.studentService.deleteStudent(student).subscribe((data) => {
        this.getStudents();
        this.snackbar.open('Deleted Successfully', 'Ok', {
          duration: 2000,
        });
      });
    }
  }

  updateStudent(student: string) {
    this.router.navigate([`admin/students/${student}/edit`]);
  }

  async changeStatus(id: string, status: boolean) {
    if (status === false) {
      status = true;
    } else {
      status = false;
    }
    const Form = {
      status,
    };
    this.studentService.updateStudent(id, Form).subscribe((data) => {
      this.getStudents();
    });
}

}
