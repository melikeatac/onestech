import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50 text-gray-800">
      <header class="bg-white border-b border-gray-200">
        <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a routerLink="/" class="flex items-center gap-2 text-gray-900 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-primary-600">
              <path d="M11.7 1.046a.75.75 0 0 1 .6 0l8.25 3.75a.75.75 0 0 1 .45.684V9.75a.75.75 0 0 1-.45.684l-8.25 3.75a.75.75 0 0 1-.6 0l-8.25-3.75A.75.75 0 0 1 3 9.75V5.48a.75.75 0 0 1 .45-.684l8.25-3.75Z"/>
              <path d="M3 13.344v3.676c0 .286.17.546.43.666l8.57 3.926c.2.092.43.092.63 0l8.57-3.926a.75.75 0 0 0 .43-.666v-3.676l-8.25 3.75a2.25 2.25 0 0 1-1.8 0L3 13.344Z"/>
            </svg>
            OnesTech Users
          </a>
        </div>
      </header>
      <main class="py-6">
        <router-outlet />
      </main>
    </div>
  `,
})
export class AppComponent {
}
