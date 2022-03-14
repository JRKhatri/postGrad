import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment'
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  checkIn !:string
  checkOut !:string
//MAT_DIALOG_DATA contains the data that we passed in info = data properties when book btn clicked
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private dataService:DataService, public dialogRef:MatDialogRef<BookComponent>, private _snackBar:MatSnackBar) { }
  ngOnInit(): void {
    
  }

  calculateTotal(checkIn:any, checkOut:any){
    console.log(checkIn)
    const checkInDate = moment(checkIn);
    const checkOutDate = moment(checkOut);
   const nights = checkOutDate.diff(checkInDate, 'days');
   if(nights>0){
    return this.data.home.price * nights;
   }
   return 0
   
  }

  bookHome(){
    return this.dataService.bookHome$().subscribe(() =>{
      this.dialogRef.close();
      this._snackBar.open('Succefully Booked Home',"", {
        duration:2000,
       
      })
    });

  }

}
