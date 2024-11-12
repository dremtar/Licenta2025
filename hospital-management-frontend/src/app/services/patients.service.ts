import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client, Patient } from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private apiUrl = 'https://localhost:44360/api'; // Update this to match your API URL
  private hospitalClient =  new Client(this.http, this.apiUrl);

  constructor(private http: HttpClient) { }

  async getPatients(): Promise<Patient[]> {
   return await this.hospitalClient.getPatients().toPromise() || [];
  }

  async getPatient(id: number): Promise<Patient> {
    return await this.hospitalClient.getPatientId(id).toPromise() || new Patient();
   }
  

}
