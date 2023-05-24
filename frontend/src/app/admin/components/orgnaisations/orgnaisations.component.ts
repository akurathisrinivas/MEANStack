import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrganisationsService } from 'src/app/shared/services/organisations.service';
import { environment } from 'src/environments/environment';
import { Organaisation } from 'src/app/shared/models/organisations.model';

@Component({
  selector: 'app-orgnaisations',
  templateUrl: './orgnaisations.component.html',
  styleUrls: ['./orgnaisations.component.scss']
})
export class OrgnaisationsComponent implements OnInit {
  url = environment.root;
  orgData: Organaisation[] = [];
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
    'organisationName',
    'status',
    'actions',
  ];
  @ViewChild(MatSort, { static: true }) sort?: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  constructor(

    private organisationService: OrganisationsService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {  }

  ngOnInit(): void {

    this.getOrganisations();
    //this.getOrganisations();
  }

  getOrganisations(){
    this.organisationService.getOrganisations().subscribe((data) => {
      this.orgData = data as Organaisation[];
      this.dataSource = new MatTableDataSource(this.orgData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.data.length;
    });
  }

  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  updateOrganaisation(organisation: string){
    this.router.navigate([`admin/organisations/${organisation}/edit`]);
  }

  deleteOrganaisation(organisation: string){
    this.organisationService.deleteOrganisation(organisation).subscribe((data) => {
      this.getOrganisations();
      this.snackbar.open('Deleted Successfully', 'Ok', {
        duration: 2000,
      });
    });
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
    this.organisationService.updateOrganisations(id, Form).subscribe((data) => {
      this.getOrganisations();
      this.snackbar.open('Status Changed Successfully', 'Ok', {
        duration: 2000,
      });
    });
}

}
