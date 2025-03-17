import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../dashboard/dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: true, 
  imports: [CommonModule] 
})
export class CategoryComponent implements OnInit {
  categoryName: string = ''; // Ensure categoryName exists
  subCategories: any[] = []; // Ensure subCategories is declared

  constructor(private route: ActivatedRoute, private router: Router, private dashboardService: DashboardService) {}

  ngOnInit() {
    // Get the category from the URL
    this.categoryName = this.route.snapshot.paramMap.get('category') || '';

    // Fetch categories and filter by the selected category
    this.dashboardService.getCategories().subscribe(data => {
      const categoryData = data.find(cat => cat.category === this.categoryName);
      if (categoryData) {
        this.subCategories = categoryData.sub_categories;
        console.log("Subcategories of", this.categoryName, ":", this.subCategories);
      } else {
        console.log("Category not found:", this.categoryName);
      }
    });
  }

  // Navigate to quiz page
  goToQuizTopic(subCategory: string) {
    console.log(`Navigating to: /${this.categoryName}/${subCategory}`);
    this.router.navigate([`/${this.categoryName}/${subCategory}`]); 
  }
  
}


//   technologies = [
//     { name: 'Angular', description: 'A powerful frontend framework by Google.', image:'/assets/angular.png' },
//     { name: 'React', description: 'A library for building user interfaces by Facebook.', image: 'assets/react.jpg' },
//     { name: 'Vue.js', description: 'A progressive JavaScript framework.', image: 'assets/vue.jpg' },
//     { name: 'Node.js', description: 'A runtime for executing JavaScript on the server.', image: 'assets/nodejs.png' },
//     { name: 'Python', description: 'A versatile programming language.', image: 'assets/python.jpg' },
//     { name: 'Java', description: 'A widely-used language for building web applications.', image: 'assets/java.png' },
//     { name: 'C++', description: 'A powerful language for system development.', image: 'assets/cpp.jpg' },
//     { name: 'SQL', description: 'A language for managing relational databases.', image: 'assets/sql.jpg' }
//   ];