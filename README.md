# Onestech Users

Bu proje Angular 17+ ile hazırlanmış, kullanıcı listesi ve kullanıcı detay sayfalarından oluşan örnek bir uygulamadır.

## Gereksinimler
- Node.js 18+
- npm 9+

## Kurulum ve Çalıştırma
```bash
npm install
npm start
```
Uygulama varsayılan olarak `http://localhost:4200` adresinde çalışır.

## Özellikler
- `/users`: Mock veriden beslenen kullanıcı listesi, sayfalama (5/10/20), yükleniyor ve boş durumları
- `/users/:id`: Detay ekranı; rolü `admin` olanlarda tüm alanlar read-only, `user` olanlarda düzenlenebilir form
- Routing, OnPush change detection, strict TypeScript

## Mimari Notlar
- Mock veri local servis ile `of(...).pipe(delay(...))` kullanılarak sağlanmaktadır; gerçek HTTP isteği yapılmaz.
- Standalone komponentler ve sinyaller (signals) kullanılmıştır.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
