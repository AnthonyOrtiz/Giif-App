import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/service/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  //private gifsService
  constructor(private gifsService:GifsService){}

  get tagHistory():string[]{
    return this.gifsService.tagsHistory;
  }

  public reloadSearchSideBar(tag:string):void{
    this.gifsService.searchTag(tag);
  }
}
