import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  get validName() { return this.registerForm.get('name')?.valid; }
  get validEmail() { return this.registerForm.get('email')?.valid; }
  get validPassword() { return this.registerForm.get('password')?.valid; }

  get touchedName() { return this.registerForm.get('name')?.touched || this.registerForm.get('name')?.dirty; }
  get touchedEmail() { return this.registerForm.get('email')?.touched || this.registerForm.get('email')?.dirty; }
  get touchedPassword() { return this.registerForm.get('password')?.touched || this.registerForm.get('password')?.dirty; }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [ '', Validators.required ],
      email: [ '',  [Validators.required, Validators.email] ],
      password: [ '', Validators.required ]
    });
  }

  createUser(): void {
    console.log(this.registerForm.valid);
    console.log(this.registerForm.value);
  }

}
