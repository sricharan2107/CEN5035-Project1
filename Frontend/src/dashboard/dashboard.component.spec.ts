import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboardService: DashboardService; // Declare the service

  const mockCategories = [
    { category: 'Web Development', image: 'assets/1.jpg' },
    { category: 'Cybersecurity', image: 'assets/2.jpg' },
    { category: 'AI & Machine Learning', image: 'assets/3.jpg' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: DashboardService,
          useValue: {
            getCategories: () => of(mockCategories)
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    dashboardService = TestBed.inject(DashboardService); //  Assign the service
    fixture.detectChanges();
  });

  it('should create the dashboard component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch categories on initialization', () => {
    spyOn(dashboardService, 'getCategories').and.returnValue(of(mockCategories)); // No more undefined error

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.categories.length).toBe(mockCategories.length);
    expect(component.categories).toEqual(mockCategories);
  });

  it('should display categories dynamically', () => {
    fixture.detectChanges();
    const categoryElements = fixture.debugElement.queryAll(By.css('.card-title'));
    expect(categoryElements.length).toBe(mockCategories.length);

    categoryElements.forEach((element, index) => {
      expect(element.nativeElement.textContent.trim()).toBe(mockCategories[index].category);
    });
  });

  it('should call goToCategory() when button is clicked', () => {
    spyOn(component, 'goToCategory');

    const button = fixture.debugElement.query(By.css('.btn-primary')).nativeElement;
    button.click();

    expect(component.goToCategory).toHaveBeenCalledWith(mockCategories[0].category);
  });
});
