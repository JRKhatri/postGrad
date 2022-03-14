import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show log', () => {
    expect(fixture.nativeElement.querySelector('[data-test="logo"]')).toBeTruthy()
  })

  it('should show search', () => {
    expect(fixture.nativeElement.querySelector('[data-test="search"]')).toBeTruthy()
  });


  it('should show filters', () =>{
    expect(fixture.nativeElement.querySelector('[data-test="home-type"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-test="date"]')).toBeTruthy()
    expect(fixture.nativeElement.querySelector('[data-test="price"]')).toBeTruthy()

  });
});
