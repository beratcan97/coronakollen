import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from "../../services/crud.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  form: FormGroup;
  dateDATA = new Date();
  
  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private router: Router) { }

  ngOnInit() {
    this.createForm();
    // this.getCurrentCaseInSwedenAndPopulaateForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      currentCasesInSweden: '',
      deaths: '',
      recovered: '',
      severeCases: '',
      displayDate: this.dateDATA.getFullYear() + '-' + (this.dateDATA.getMonth() + 1) + '-' + this.dateDATA.getDate(),
      date: this.dateDATA,
      updatedBy: 'admin'
    });
  }

  getCurrentCaseInSwedenAndPopulaateForm(): void {
    this.crudService.getCurrentCaseInSweden().subscribe((DATA: any) => {
      this.form.patchValue({
        currentCasesInSweden: DATA.payload.data().currentCasesInSweden,
        deaths: DATA.payload.data().deaths,
        recovered: DATA.payload.data().recovered,
        severeCases: DATA.payload.data().severeCases,
        displayDate: this.dateDATA.getFullYear() + '-' + (this.dateDATA.getMonth() + 1) + '-' + this.dateDATA.getDate(),
        date: this.dateDATA,
        updatedBy: 'admin'
      });
    });
  }

  updateDatabase(): void {
    // this.crudService.updateCurrentCaseInSweden(this.form.value);
    this.router.navigate(['..']);
  }
}
