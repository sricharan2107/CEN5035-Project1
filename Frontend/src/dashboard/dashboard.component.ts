

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true, 
  imports: [CommonModule] // Import CommonModule here
})
export class DashboardComponent implements OnInit {
  categories: any[] = [];

  constructor(private dashboardService: DashboardService, private router: Router) {}

  ngOnInit() {
    this.dashboardService.getCategories().subscribe(data => {
      // Assign an image to each category dynamically
      this.categories = data.map((category, index) => ({
        ...category, // Spread existing category data
        image: `assets/${index + 1}.jpg` // Assign corresponding image (1.jpg to 10.jpg)
      }));
      console.log("Categories with images:", this.categories);
    });
  }

  goToCategory(category: string) {
    this.router.navigate([`/${category}`]);
    // this.router.navigate(['/category', category]); // Navigate to category page
  }
}

//   technologies = [
//     { name: 'Web-Development', description: 'A powerful frontend framework by Google.', image:'/assets/web-devlopment.jpg' },
//     { name: 'Cybersecurity', description: 'A library for building user interfaces by Facebook.', image: 'assets/cyber-security.png' },
//     { name: 'AI-ML', description: 'A progressive JavaScript framework.', image: 'assets/aiml.jpg' },
//     { name: 'Cloud Computing', description: 'A runtime for executing JavaScript on the server.', image: 'assets/cloud-computing.jpg' },
//     { name: 'Databases', description: 'A versatile programming language.', image: 'assets/Database.jpg' },
//     { name: 'Operating Systems', description: 'A widely-used language for building web applications.', image: 'assets/operating-system.jpg' },
//     { name: 'Software Engineering', description: 'A powerful language for system development.', image: 'assets/software-engineering.jpg' },
//     { name: 'Networking', description: 'A language for managing relational databases.', image: 'assets/Networking.jpg' },
//     { name: 'DevOps & Automation', description: 'A language for managing relational databases.', image: 'assets/devops.jpg' }
