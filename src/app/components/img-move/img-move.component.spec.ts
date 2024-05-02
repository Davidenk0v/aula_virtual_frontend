import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgMoveComponent } from './img-move.component';

describe('ImgMoveComponent', () => {
  let component: ImgMoveComponent;
  let fixture: ComponentFixture<ImgMoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgMoveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
