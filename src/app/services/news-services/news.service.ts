import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor( private http: HttpClient ) {
  }

  getNews(params: any): Observable<any> {
    const URL = 'https://newsapi.org/v2/top-headlines?country='+params.country+'&category='+params.cat+'&sortBy="popularity"&pageSize=8&apiKey=118112088a8e4a42b40a217205fb3e8a';

    return this.http.get(URL);
  }
}
