import { Component } from '@angular/core';
import { User } from '../seguridad/user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';



@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  public isMenuCollapsed = true;
  isExpanded = false;
  collapsed = true;
  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
  }
    
}
// export class NgbdCollapseNavbar {
//   // Step 1:
//   // Create a property to track whether the menu is open.
//   // Start with the menu collapsed so that it does not
//   // appear initially when the page loads on a small screen!
//   public isMenuCollapsed = true;
// } 