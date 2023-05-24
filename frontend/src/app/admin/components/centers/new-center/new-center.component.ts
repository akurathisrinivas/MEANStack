import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from 'src/app/shared/services/state.service';
import { CenterService } from 'src/app/shared/services/center.service';
import { environment } from 'src/environments/environment';
import { Center } from 'src/app/shared/models/center.model';

@Component({
  selector: 'app-new-center',
  templateUrl: './new-center.component.html',
  styleUrls: ['./new-center.component.scss']
})
export class NewCenterComponent implements OnInit {

  Url = environment.root;
  id: any;
 
  stateData?: any;
  orgData?: any;
  centerData?: any;
  selected='none';

  centerForm = new FormGroup({
    state: new FormControl('', Validators.required),
    organisation: new FormControl('', Validators.required),
    centerName: new FormControl('',Validators.required),
   
  })

  constructor(
    private stateService:StateService,
    private centerService:CenterService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    this.initForm();
    this.stateService.getState().subscribe(data => {
      this.stateData = data;

    });

  }

  initForm(){
    if (this.id) {
      
    }
  }

  getOrganistions(stateId : string){

    this.centerService.getOrganisationsByState(stateId).subscribe(data => {
      this.orgData = data;
    });

  }

  onSubmit(){

    if (this.id) {
     // this.organisationService.updateOrganisations(this.id, this.organaisationForm.value).subscribe(data => {
       
      //})
      this.snackbar.open('Updated Successfully', 'Ok', {
        duration: 2000,
      });

      
      this.router.navigate([`/admin/organisations/${this.id}/edit`])
    }
    else {
      
      this.centerForm.value.createdBy= window.sessionStorage.getItem('name');

      this.centerService.addCenter(this.centerForm.value).subscribe(data => {
        this.centerData = data as Center;
        console.log('centerData',this.centerData);
        
        
      })
      this.snackbar.open('Added Successfully', 'Ok', {
        duration: 2000,
      });
      this.router.navigate(['/admin/organisations'])
    }

  }

}
