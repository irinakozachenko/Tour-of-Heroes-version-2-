import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOutput } from './test-output';

describe('TestOutput', () => {
  let component: TestOutput;
  let fixture: ComponentFixture<TestOutput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestOutput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestOutput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
