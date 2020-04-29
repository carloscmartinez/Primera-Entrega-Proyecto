import { Component } from '@angular/core';



@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  public isMenuCollapsed = true;
  isExpanded = false;
  collapsed = true;
  
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  
}
// export class NgbdCollapseNavbar {
//   // Step 1:
//   // Create a property to track whether the menu is open.
//   // Start with the menu collapsed so that it does not
//   // appear initially when the page loads on a small screen!
//   public isMenuCollapsed = true;
// } 