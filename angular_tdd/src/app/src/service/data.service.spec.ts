import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('DataService', () => {
  let service: DataService;
  let httpClient:HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(DataService);
  });

  it('should be return the list of homes', () => {
    //Spy on and mock the HttpClient.
    httpClient = TestBed.get(HttpClient)
    const homeMock = [
      {
       title: 'Home 1',
       image:'assets/listing.jpg',
       location:'New York'
      } ,
      {
       title: 'Home 2',
       image:'assets/listing.jpg',
       location:'Boston'
      } ,
      {
       title: 'Home 3',
       image:'assets/listing.jpg',
       location:'Chicago'
      } 
     ];

     spyOn(httpClient, 'get').and.returnValue(of(homeMock));
    //Use our service to get homes.
    const spy = jasmine.createSpy('spy')
    service.getHomes$().subscribe(spy)
     
    //Verify that the service returned mocked data.
    expect(spy).toHaveBeenCalledWith(homeMock);
    //verify that the service called the proper HTTP endpoint.
   expect(httpClient.get).toHaveBeenCalledWith('assets/homes.json')
  });
});
