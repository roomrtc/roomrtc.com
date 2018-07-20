import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentNewComponent } from './present-new.component';

describe('PresentNewComponent', () => {
  let component: PresentNewComponent;
  let fixture: ComponentFixture<PresentNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
