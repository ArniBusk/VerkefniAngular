import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAvatarStatsComponent } from './store-avatar-stats.component';

describe('StoreAvatarStatsComponent', () => {
  let component: StoreAvatarStatsComponent;
  let fixture: ComponentFixture<StoreAvatarStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreAvatarStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreAvatarStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
