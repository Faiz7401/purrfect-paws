import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CatsFactPage } from './cats-fact.page';

describe('CatsFactPage', () => {
  let component: CatsFactPage;
  let fixture: ComponentFixture<CatsFactPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CatsFactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
