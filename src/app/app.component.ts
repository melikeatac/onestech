import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <header class="bg-white border-b border-gray-200">
        <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a routerLink="/" class="flex items-center gap-2 text-gray-900 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-primary-600">
              <path d="M11.7 1.046a.75.75 0 0 1 .6 0l8.25 3.75a.75.75 0 0 1 .45.684V9.75a.75.75 0 0 1-.45.684l-8.25 3.75a.75.75 0 0 1-.6 0l-8.25-3.75A.75.75 0 0 1 3 9.75V5.48a.75.75 0 0 1 .45-.684l8.25-3.75Z"/>
              <path d="M3 13.344v3.676c0 .286.17.546.43.666l8.57 3.926c.2.092.43.092.63 0l8.57-3.926a.75.75 0 0 0 .43-.666v-3.676l-8.25 3.75a2.25 2.25 0 0 1-1.8 0L3 13.344Z"/>
            </svg>
            OnesTech Users
          </a>
          <nav class="text-sm flex items-center gap-3">
            <a routerLink="/users" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Kullanıcılar</a>
            <button (click)="toggleTheme()" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
              <svg *ngIf="!isDark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M12 2.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V3A.75.75 0 0112 2.25zm0 15a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM4.5 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H5.25A.75.75 0 014.5 12zm12 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM6.22 6.22a.75.75 0 011.06 0L8.34 7.28a.75.75 0 01-1.06 1.06L6.22 7.28a.75.75 0 010-1.06zm9.44 9.44a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM2.25 12a.75.75 0 01.75-.75H4.5a.75.75 0 010 1.5H3A.75.75 0 012.25 12zm16.5 0a.75.75 0 01.75-.75H21a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM6.22 17.78a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zm9.44-11.56a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 010-1.06z" clip-rule="evenodd"/></svg>
              <svg *ngIf="isDark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0112 21.75 9.75 9.75 0 1117.748 2.25a9 9 0 004.004 12.752z" /></svg>
              Tema
            </button>
          </nav>
        </div>
      </header>
      <main class="py-6">
        <router-outlet />
      </main>
    </div>
  `,
})
export class AppComponent {
  isDark = false;
  toggleTheme(): void {
    this.isDark = !this.isDark;
    const root = document.documentElement.classList;
    if (this.isDark) root.add('dark'); else root.remove('dark');
  }
}
