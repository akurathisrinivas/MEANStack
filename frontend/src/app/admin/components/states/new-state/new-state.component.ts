import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from 'src/app/shared/models/state.model';
import { StateService } from 'src/app/shared/services/state.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-state',
  templateUrl: './new-state.component.html',
  styleUrls: ['./new-state.component.scss']
})
export class NewStateComponent implements OnInit {

  Url = environment.root;
  id: any;
  stateData?: State;

  stateForm = new FormGroup({
    stateName: new FormControl('', Validators.required),
  })

  constructor(
    private stateService: StateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    this.initForm();
  }
  initForm() {
    //alert(this.id)
    if (this.id) {
     
     
      this.stateService.getStateById(this.id).subscribe(data => {
        this.stateData = data as State;
        this.stateForm = this.formBuilder.group({
          stateName: new FormControl(this.stateData.stateName, Validators.required),
          status: this.stateData.status
         
        })
      })
      
      }
  }

  onSubmit() {

    if (this.id) {
      
      
      let data={
        stateName:this.stateForm.value.stateName,
        status:this.stateForm.value.status,
        updatedBy:'Srinivas',
      }
     //console.log(data);
      this.stateService.updateState(this.id, data).subscribe(data => {
        
      })
      window.location.reload();
      this.router.navigate(['/admin/states']);
     
    }
    else {
      this.stateService.addState(this.stateForm.value).subscribe(data => {
        this.stateData = data as State;
        console.log('statedata',this.stateData);
        
        
      })
      this.router.navigate(['/admin/states'])
    }
   

  }

}
