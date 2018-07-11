# EvolentContacts

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.
This project build the SPA for maintaining contacts.
The current implementation relies on dummy contact list for demonstration purpose. Please read below to configure the app to consume APIs.

## Building

### Development environment

Run `npm run start` for a dev server. You will be navigated to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Production ready build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. 

## Configure API server

1. configure the API server in `proxy.conf.json` before building
2. replace dummy Promises from `src/app/core/api.service.ts` by commented http reqests

## Browser Support
The application should run on most modern browsers that support HTML5, CSS3 and ES6.
For best result, we recoment latest version of Chrome.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
