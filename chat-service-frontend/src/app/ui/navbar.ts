/**
 * Project Phase I: Mini Chat Service
 * Created by Marc Magdi on Friday 5/05/2017.
 */
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ROUTES } from './sidebar-routes.config';
import { MenuType } from './sidebar.metadata';

@Component({
  moduleId: module.id,
  selector: 'navbar-cmp',
  templateUrl: './partials/navbar.html'
})

export class NavbarComponent implements OnInit{
  private listTitles: any[];

  constructor(private route: Router) { }

  ngOnInit(){
    this.listTitles = ROUTES.filter(listTitle => listTitle.menuType !== MenuType.BRAND);
  }

  getTitle(){
    var titlee = this.route.url;
    titlee = titlee.substring(1);
    for(var item = 0; item < this.listTitles.length; item++){
      if(this.listTitles[item].path === titlee){
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
}
