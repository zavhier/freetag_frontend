import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  _name:string= '';
  _rol:string ='';
  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
    this._rol = localStorage.getItem('rol');
  }
  toggleSubMenu(menuId: string): void {
    const menuElement = this.elRef.nativeElement.querySelector(`#${menuId}`);
    if (menuElement) {
      menuElement.classList.toggle('show');
    }
  }

  isSubMenuOpen(menuId: string): boolean {
    const menuElement = this.elRef.nativeElement.querySelector(`#${menuId}`);
    return menuElement ? menuElement.classList.contains('show') : false;
  }
}
