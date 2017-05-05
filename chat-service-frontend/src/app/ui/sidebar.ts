/**
 * Project Phase I: Mini Chat Service
 * Created by Marc Magdi on Friday 5/05/2017.
 */
import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'sidebar-cmp',
  templateUrl: './partials/sidebar.html',
})

export class SidebarComponent implements OnInit {
  ngOnInit() {
    $.getScript('../../assets/js/material-dashboard-angular.js');
  }
}
