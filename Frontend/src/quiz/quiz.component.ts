import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../dashboard/dashboard.service';

//  TypeScript Interface
interface QuizTopic {
  quiz_topic: string;
}

interface SubCategory {
  sub_category: string;
  quiz_topics: QuizTopic[];
}

interface Category {
  category: string;
  sub_categories: SubCategory[];
}

@Component({
  selector: 'app-quiz',
  standalone: true,  
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  imports: [CommonModule] 
})
export class QuizComponent implements OnInit {
  categoryName: string = '';
  subCategoryName: string = '';
  quizTopics: QuizTopic[] = []; 

  constructor(private route: ActivatedRoute, private router: Router, private dashboardService: DashboardService) {}

  ngOnInit() {
    this.categoryName = this.route.snapshot.paramMap.get('category') || '';
    this.subCategoryName = this.route.snapshot.paramMap.get('sub_category') || '';

    this.dashboardService.getCategories().subscribe((data: Category[]) => {
      const categoryData = data.find((cat: Category) => cat.category === this.categoryName);
      if (categoryData) {
        const subCategoryData: SubCategory | undefined = categoryData.sub_categories.find(
          (sub: SubCategory) => sub.sub_category === this.subCategoryName
        );
        if (subCategoryData) {
          this.quizTopics = subCategoryData.quiz_topics || []; 
          console.log(`Quiz topics for ${this.subCategoryName}:`, this.quizTopics);
        } else {
          console.warn(`Subcategory "${this.subCategoryName}" not found in ${this.categoryName}`);
        }
      }
    });
  }

  takeQuiz(quizTopic: string) {
    console.log(`Navigating to: /${this.categoryName}/${this.subCategoryName}/${quizTopic}`);
    this.router.navigate([`/${this.categoryName}/${this.subCategoryName}/${quizTopic}/takequiz`]);
  }
  
}


//   technologies = [
//     { "name": "HTML & CSS", "image": "/assets/default.jpg" },
//     { "name": "ReactJS", "image": "/assets/default.jpg" },
//     { "name": "Angular", "image": "/assets/default.jpg" },
//     { "name": "Node.js", "image": "/assets/default.jpg" },
//     { "name": "Express.js", "image": "/assets/default.jpg" },
//     { "name": "ASP.NET", "image": "/assets/default.jpg" }
//   ]

//   // technologies = [
//   //   { name: 'Web-Development', description: 'A powerful frontend framework by Google.', image:'/assets/web-devlopment.jpg' },
//   //   { name: 'Cybersecurity', description: 'A library for building user interfaces by Facebook.', image: 'assets/cyber-security.png' },
//   //   { name: 'AI-ML', description: 'A progressive JavaScript framework.', image: 'assets/aiml.jpg' },
//   //   { name: 'Cloud Computing', description: 'A runtime for executing JavaScript on the server.', image: 'assets/cloud-computing.jpg' },
//   //   { name: 'Databases', description: 'A versatile programming language.', image: 'assets/Database.jpg' },
//   //   { name: 'Operating Systems', description: 'A widely-used language for building web applications.', image: 'assets/operating-system.jpg' },
//   //   { name: 'Software Engineering', description: 'A powerful language for system development.', image: 'assets/software-engineering.jpg' },
//   //   { name: 'Networking', description: 'A language for managing relational databases.', image: 'assets/Networking.jpg' },
//   //   { name: 'DevOps & Automation', description: 'A language for managing relational databases.', image: 'assets/devops.jpg' }
//   // ];
