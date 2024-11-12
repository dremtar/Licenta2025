import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client, Doctor } from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  private apiUrl = 'https://localhost:44360/api'; // Update this to match your API URL
  private hospitalClient =  new Client(this.http, this.apiUrl);
  constructor(private http: HttpClient,
  ) { }

  async getDoctors(): Promise<Doctor[]> {
    return await this.hospitalClient.getDoctors().toPromise() || [];
  }
  
  // Add more methods as needed
}
