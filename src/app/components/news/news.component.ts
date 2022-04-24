import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news-services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  articles: any[] = [];
  categoryDef = 'general';
  country = 'us';
  paramsForPrint: any;

  categories: any[] = [
    {value: 'general', nombre: 'Todas'},
    {value: 'business', nombre: 'Negocios'},
    {value: 'entertaiment', nombre: 'Entretenimiento'},
  ];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadNews();
  }

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  filterCat(cat: any) {
    this.categoryDef = cat.value;
    this.loadNews();
  }

  loadNews() {
    const PARAMS = {
      cat: this.categoryDef,
      country: this.country,
    }

    this.newsService.getNews(PARAMS).subscribe(data => {
      console.log(data);
      this.articles = data.articles;
    }, error => {
      alert("Error Noticias");
    });

    console.log(PARAMS);
  }
}
