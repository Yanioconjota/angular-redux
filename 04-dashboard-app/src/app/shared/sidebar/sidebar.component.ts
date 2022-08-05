import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UiErrorMessagesService } from 'src/app/services/ui-error-messages.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(private authservice: AuthService,
              private router: Router,
              private customValidator: UiErrorMessagesService) { }

  ngOnInit(): void {
  }

  logout() {
    this.customValidator.loadingModal();
    this.authservice.logout().then(() => {
      this.router.navigate(['/login']);
      this.customValidator.closeModal();
    });
  }

}
