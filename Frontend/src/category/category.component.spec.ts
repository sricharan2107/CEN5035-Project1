import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryComponent } from './category.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => 'Computer Science' // Mock category name
      }
    }
  };

  const mockSubCategories = [
    { sub_category: 'Programming Languages' },
    { sub_category: 'Data Structures' },
    { sub_category: 'Algorithms' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryComponent, HttpClientTestingModule], // ✅ Import standalone component
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
  
    // manually set subCategories
    component.subCategories = mockSubCategories;
  
    fixture.detectChanges();
  });

  

  // 1. Check if component is created
  it('should create the category component', () => {
    expect(component).toBeTruthy();
  });

  
  
  //  3. Check if the correct number of subcategories is displayed
  it('should display the correct number of subcategory cards', () => {
    //  Manually set subcategories before running the test
    component.subCategories = mockSubCategories;
    fixture.detectChanges(); // ✅ Trigger UI update
  
    //  Now, query the DOM for .card elements
    const subcategoryElements = fixture.debugElement.queryAll(By.css('.card'));
  
    //  Verify the correct number of subcategory cards are rendered
    expect(subcategoryElements.length).toBe(mockSubCategories.length);
  });
  

  // 4. Check if subcategory names are rendered correctly
  it('should display correct subcategory names', () => {
    fixture.detectChanges();
    const subcategoryTitles = fixture.debugElement.queryAll(By.css('.card-title'));

    subcategoryTitles.forEach((element, index) => {
      expect(element.nativeElement.textContent.trim()).toBe(mockSubCategories[index].sub_category);
    });
  });

  // 5. Check if button click triggers `goToQuizTopic()`
  it('should call goToQuizTopic() when the button is clicked', () => {
    spyOn(component, 'goToQuizTopic');
  
    //  Ensure the subcategories are set before querying the DOM
    component.subCategories = mockSubCategories;
    fixture.detectChanges(); // Trigger change detection
  
    const button = fixture.debugElement.query(By.css('.btn-primary'));
    
    expect(button).toBeTruthy(); // Ensure button exists before clicking
  
    button.nativeElement.click();
    
    expect(component.goToQuizTopic).toHaveBeenCalledWith(mockSubCategories[0].sub_category);
  });
  

  //  6. Handle empty subcategories gracefully
  it('should display no subcategories if the API returns an empty array', () => {
    component.subCategories = [];
    fixture.detectChanges();

    const subcategoryElements = fixture.debugElement.queryAll(By.css('.card'));
    expect(subcategoryElements.length).toBe(0);
  });
});
