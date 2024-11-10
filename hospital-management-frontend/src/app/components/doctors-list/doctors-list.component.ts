import { Component } from '@angular/core';
import { DoctorsService } from '../../services/doctors.service';
import { Doctor } from '../../models/hospital.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrl: './doctors-list.component.scss'
})
export class DoctorsListComponent {
  doctors: Doctor[] = [];
  dataSource = new MatTableDataSource<Doctor>();

  constructor(private doctorService: DoctorsService) { }

  ngOnInit(): void {
    this.initializeDataSource();
  }

  async initializeDataSource(){
    this.doctors = await this.doctorService.getDoctors();

    this.dataSource.data= this.doctors;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // Apply the filter to the MatTableDataSource (case-insensitive)
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // If the filter is empty, reset the filter to display all rows
    if (!this.dataSource.filter) {
      this.dataSource.filter = '';
    }
  }
}
