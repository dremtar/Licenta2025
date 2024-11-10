import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../../services/patients.service';
import { Patient } from '../../models/hospital.model';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent implements OnInit {
  dataSource = new MatTableDataSource<Patient>([]);
  patients : Patient[] = [];

  constructor(private patientsService: PatientsService) { }

  ngOnInit(): void {
    this.initializeDataSource();
  }

  async initializeDataSource(){
    this.patients = await this.patientsService.getPatients();

    this.dataSource.data = this.patients;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();
  }

  getAge(birthDate: string): number {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const m = today.getMonth() - birthDateObj.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  }
}
