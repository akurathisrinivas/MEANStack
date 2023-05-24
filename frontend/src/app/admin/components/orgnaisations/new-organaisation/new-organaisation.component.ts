import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Organaisation } from 'src/app/shared/models/organisations.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrganisationsService } from 'src/app/shared/services/organisations.service';
import { ActivatedRoute,Router } from '@angular/router';
import { State } from 'src/app/shared/models/state.model';
import { StateService } from 'src/app/shared/services/state.service';
@Component({
  selector: 'app-new-organaisation',
  templateUrl: './new-organaisation.component.html',
  styleUrls: ['./new-organaisation.component.scss']
})
export class NewOrganaisationComponent implements OnInit {
  
  Url = environment.root;
  imagePath?: string;
  showImage?: boolean;
  imagePreview: any;
  imageName: any;
  file: any;
  id: any;
  organaisationData?: Organaisation;
  stateData?: any;
  selected='none';

  organaisationForm = new FormGroup({
    state: new FormControl('', Validators.required),
    organisationName: new FormControl('', Validators.required),
    centers: new FormControl(''),
   
  })
  
  constructor(
    private organisationService: OrganisationsService,
    private stateService:StateService,
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
   // console.log('stateData',this.stateData);
    
  }

  initForm(){
    if (this.id) {
    this.organisationService.getOrganisationById(this.id).subscribe(data => {

      this.organaisationData = data as Organaisation;
        
        this.organaisationForm = this.formBuilder.group({
          state: new FormControl(this.organaisationData.state, Validators.required),
          organisationName: new FormControl(this.organaisationData.organisationName, Validators.required),
          centers: this.organaisationData.centers,
          status: this.organaisationData.status
        })

    });
  }
  }

  onSubmit() {

    if (this.id) {
      this.organisationService.updateOrganisations(this.id, this.organaisationForm.value).subscribe(data => {
       
      })
      this.snackbar.open('Updated Successfully', 'Ok', {
        duration: 2000,
      });

      
      this.router.navigate([`/admin/organisations/${this.id}/edit`])
    }
    else {
      
      this.organaisationForm.value.createdBy= window.sessionStorage.getItem('name');
      this.organisationService.addOrganisations(this.organaisationForm.value).subscribe(data => {
        this.organaisationData = data as Organaisation;
        console.log('organaisationData',this.organaisationData);
        
        
      })
      this.snackbar.open('Added Successfully', 'Ok', {
        duration: 2000,
      });
      this.router.navigate(['/admin/organisations'])
    }
    

  }

}
