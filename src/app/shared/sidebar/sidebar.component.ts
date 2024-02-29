import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  _name:string= '';
  _rol:string ='';
  constructor() { }

  ngOnInit(): void {
    this._rol = localStorage.getItem('rol');
  }

}
