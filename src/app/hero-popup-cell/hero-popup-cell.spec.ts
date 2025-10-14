import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroPopupCell } from './hero-popup-cell';

describe('HeroPopupCell', () => {
  let component: HeroPopupCell;
  let fixture: ComponentFixture<HeroPopupCell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroPopupCell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroPopupCell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
