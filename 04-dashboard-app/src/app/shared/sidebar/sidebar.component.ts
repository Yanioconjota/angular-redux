import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UiMessagesService } from 'src/app/services/ui-messages.service';
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
              private customMessage: UiMessagesService) { }

  ngOnInit(): void {
  }

  logout() {
    this.customMessage.loadingModal();
    this.authservice.logout().then(() => {
      this.customMessage.closeModal();
      this.router.navigate(['/login']);
    });
  }

}
