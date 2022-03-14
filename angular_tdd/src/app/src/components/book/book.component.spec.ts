import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { spyOnClass } from 'jasmine-es6-spies';
import { of } from 'rxjs';
import { DataService } from '../../service/data.service';
import { BookComponent } from './book.component';
import {MatSnackBar} from '@angular/material/snack-bar'



describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let dialogData: any;
  let dataService: jasmine.SpyObj<DataService>;
  let dialogService:jasmine.SpyObj<MatDialogRef<BookComponent>>;
  let notificationService:jasmine.SpyObj<MatSnackBar>

  //function that going gives us selector value(for easiness)
  let el = (selector: any) => fixture.nativeElement.querySelector(selector);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookComponent],
      imports: [FormsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: DataService, useFactory: () => spyOnClass(DataService) },
        {provide: MatDialogRef, useFactory:()=> spyOnClass(MatDialogRef) },
        {provide : MatSnackBar, useFactory:() => spyOnClass(MatSnackBar)}

      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);

    //grab the reference data from the TestBed-reference what been passed to the component through constructor as MAT_DIALOG_DATA
    dialogData = TestBed.get(MAT_DIALOG_DATA);  //garb the instance of injected value
    dataService = TestBed.get(DataService);
    dialogService = TestBed.get(MatDialogRef)
    notificationService = TestBed.get(MatSnackBar)
    component = fixture.componentInstance;

    const homes = require('../../../../assets/homes.json');
    dialogData.home = homes[0];
    fixture.detectChanges();

  });
  //should show title
  it('should show the title', () => {
    expect(el('[data-test="title"]').textContent).toContain('Book Home 1')
  });
  //show price
  it('should check price', () => {
    expect(el('[data-test="price"]').textContent).toContain('$115 per night')
  });
  //show check in date field
  it('should show checkin date field', () => {
    expect(el('[data-test="check-in"] input')).toBeTruthy()
  });

  //show check out date field
  it('should show checkout date field', () => {
    expect(el('[data-test="check-out"]')).toBeTruthy()
  });

  //show total amount
  it('should show total amount', () => {
    //user enter check in date = 1/20/2022;
    const checkIn = el('[data-test="check-in"] input');
    checkIn.value = '1/20/2022'
    checkIn.dispatchEvent(new Event('input')) //simulate 

    //user enter check out date = 1/24/2022;
    const checkOut = el('[data-test="check-out"] input');
    checkOut.value = '1/24/2022'
    checkOut.dispatchEvent(new Event('input')) //simulate 

    fixture.detectChanges();

    //assert that the total shows 3*115 = 345
    expect(el('[data-test="total"]').textContent).toContain('Total : $345');
  })
  //should book home after clicking book button:-
  it('should book home after Book button clicked', () => {
    dataService.bookHome$.and.returnValue(of(null));
    const checkIn = el('[data-test="check-in"] input');
    checkIn.value = '1/20/2022'
    checkIn.dispatchEvent(new Event('input')) //simulate 

    //user enter check out date = 1/24/2022;
    const checkOut = el('[data-test="check-out"] input');
    checkOut.value = '1/24/2022'
    checkOut.dispatchEvent(new Event('input')) //simulate 

    fixture.detectChanges();

    
    el('[data-test="book-btn"] button').click();
     //user click book btn - assert that the data service was used to book home
    expect(dataService.bookHome$).toHaveBeenCalled();
  }); 

  it('should close the diallog and shot notification after clicking Book Btn', () =>{
    dataService.bookHome$.and.returnValue(of(null));
    const checkIn = el('[data-test="check-in"] input');
    checkIn.value = '1/20/2022'
    checkIn.dispatchEvent(new Event('input')) //simulate 

    //user enter check out date = 1/24/2022;
    const checkOut = el('[data-test="check-out"] input');
    checkOut.value = '1/24/2022'
    checkOut.dispatchEvent(new Event('input')) //simulate 

    fixture.detectChanges();

    
    el('[data-test="book-btn"] button').click();
     //user click book btn - assert that the data service was used to book home
    expect(dialogService.close).toHaveBeenCalled();
    expect(notificationService.open).toHaveBeenCalled();


  })
  

});
