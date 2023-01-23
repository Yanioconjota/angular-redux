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
5. Add your Firebase SDK by clicking on the cog wheel next to Project overview and select project settings
6. Select prod mode
7. Go to rules and replace the match rules with the following code: (you will change it later)
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
8. Scroll down and Click on </> 
9. register app by creating a name and click register app
10. Click continue to console
11. Go to your project console and type: `firebase login`
12. Then add angular fire to your project: by `npm i firebase@9.9.1` and `ng add @angular/fire` 
13. Select `Authentication` and `Firestore` in the application list when prompted
14. Select your firebase account `****@email.com` when prompted
15. Go to your app module and find this blocks:
  ```
    import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
    import { provideAuth,getAuth } from '@angular/fire/auth';
    import { provideFirestore,getFirestore } from '@angular/fire/firestore';
  ```
  and:
  ```
    imports: [
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore())
    ],
  ```
16. Replace it for:
  ```
    import { AngularFireModule } from '@angular/fire/compat';
  ```
  ```
    imports: [
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAnalyticsModule,
      AngularFirestoreModule,
      AngularFireAuthModule,
    ],
  ```
17. Make sure your app is OK by running `npm start` or `ng serve`

----

**Note:**
If you're having some compiling errors in your app.module.ts, don't forget to check you **tsconfig.json**

More info at this [article](https://stackoverflow.com/questions/60239941/appears-in-the-ngmodule-imports-of-appmodule-but-could-not-be-resolved-to-an-ng)

---

## Redux 101

1. Create actions
2. Define actions behaviour and properties
3. Create a reducer to handle those actions
4. Define state handling with received props
5. Add your reducer to the store which means add the state to the AppState interface and your reducer to the appReducer

## NgRx Effects

![NgRx Effects](/info/08-effects.png)
![NgRx Effects](/info/09-effectsExpanded.png)
