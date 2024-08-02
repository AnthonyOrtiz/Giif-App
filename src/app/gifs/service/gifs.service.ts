import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';


@Injectable({providedIn: 'root'})
export class GifsService {
  public gifsList:Gif[] = [];

  private _tagsHistory:string[] = []//localStorage.getItem('history');
  private apiKeyGiphy:string = '2Paa6ws3HNaDbbiv9K6PVuzQvvIe2c8y';
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs';

  constructor(private http:HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Services Ready');


  }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag:string):void{
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag != tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{
    if(!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length == 0) return;

    this.searchTag(this._tagsHistory[0]);
  }

  public searchTag(tag:string):void{

    if(tag.length == 0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKeyGiphy)
      .set('limit', 5)
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params:params})
      .subscribe((resp) => {
        this.gifsList = resp.data;
      });

  }


}
