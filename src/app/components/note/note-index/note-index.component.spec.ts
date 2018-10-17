import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteIndexComponent } from './note-index.component';

describe('NoteIndexComponent', () => {
  let component: NoteIndexComponent;
  let fixture: ComponentFixture<NoteIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
