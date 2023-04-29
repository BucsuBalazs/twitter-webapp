import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfeedComponent } from './myfeed.component';

describe('MyfeedComponent', () => {
  let component: MyfeedComponent;
  let fixture: ComponentFixture<MyfeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyfeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
