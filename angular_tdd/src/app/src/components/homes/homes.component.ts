import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DataService } from '../../service/data.service';
import { DialogService } from '../../service/dialog.service';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css'],
 
})
export class HomesComponent implements OnInit {
  homes$ :any

  constructor(
    private dataService:DataService,
     private dialogService: DialogService
      ) { }

  ngOnInit(): void {
    this.homes$ = this.dataService.getHomes$()
    
  }
  openDialog(home:any){

    //info about the dialogbox from angular/material.io
    let info = {
        width: '250px',
        data: {home},
      };
    this.dialogService.open(BookComponent,info)

  }

}
