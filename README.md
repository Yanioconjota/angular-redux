# angular-redux

`ng g c folder/component --skip-tests -is`
Generates a component without .spec.ts and .scss files

Since this project is using Angular V12 NgRx library and NgRx dev tools should be the same to avoid conflicts, example:

`npm i @ngrx/store@12`

`npm i @ngrx/store-devtools@12`

Generating in the same folder:

`ng g m todos/todo --flat`

the --flat parameter creates de module in the specified route with no sub-folder

When creating a project with firebase Authentication and Firebase DB first do the following:
1. Go to firebase console in your browser
2. Create a project
3. Go to Authentication and select your authentication methods in the sign-in method tab such as email, facebook, google...
4. Then click on Firebase database and create your DB
8. Add your Firebase SDK by clicking on the cog wheel next to Project overview and select project settings
9. Select prod mode
10. Go to rules and replace the match rules with the following code: (you will change it later)
  ```
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /{document=**} {
          //allow read, write: if false;
          allow read, write
        }
      }
    }
  ```
10. Scroll down and Click on </> 
11. register app by creating a name and click register app
12. Click continue to console
13. Go to your project console and type: `firebase login`
14. Then add angular fire to your project: `ng add @angular/fire`
15. Select `Authentication` and `Firestore` in the application list when prompted
16. Select your firebase account `****@email.com` when prompted
17. Make sure your app is OK by running `npm start` or `ng serve`