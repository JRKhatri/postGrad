import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient:HttpClient) { }

  getHomes$():any{

    return this.httpClient.get<any>('assets/homes.json')
  }
  bookHome$():any{
    console.log("Successfully booked")
    return of(null)

  }
}
