import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserPostsComponent } from './manage-user-posts.component';

describe('ManageUserPostsComponent', () => {
  let component: ManageUserPostsComponent;
  let fixture: ComponentFixture<ManageUserPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageUserPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUserPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
