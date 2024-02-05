import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListViewComponent } from './tasks-list-view.component';

describe('TasksListViewComponent', () => {
  let component: TasksListViewComponent;
  let fixture: ComponentFixture<TasksListViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasksListViewComponent]
    });
    fixture = TestBed.createComponent(TasksListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
