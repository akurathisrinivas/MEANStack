import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { State } from 'src/app/shared/models/state.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StateService } from 'src/app/shared/services/state.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit {

  url = environment.root;
  stateData: State[] = [];
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
    'stateName',
    'status',
    'actions',
  ];
  @ViewChild(MatSort, { static: true }) sort?: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  constructor(
    private stateService: StateService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getStates();
  }

  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  getStates(){
    this.stateService.getState().subscribe((data) => {
      this.stateData = data as State[];
      this.dataSource = new MatTableDataSource(this.stateData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.data.length;
    })
  }

  deleteState(student: string) {
    if (confirm("Are you sure! You want to delete this record?") === true) {
      this.stateService.deleteState(student).subscribe((data) => {
        this.getStates();
        this.snackbar.open('Deleted Successfully', 'Ok', {
          duration: 2000,
        });
      });
    }
  }

  updateState(state: string) {
    this.router.navigate([`admin/states/${state}/edit`]);
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
    this.stateService.updateState(id, Form).subscribe((data) => {
      this.getStates();
    });
}

}
