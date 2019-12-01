import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AiTestComponent } from './ai-test.component';

describe('AiTestComponent', () => {
  let component: AiTestComponent;
  let fixture: ComponentFixture<AiTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AiTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AiTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
