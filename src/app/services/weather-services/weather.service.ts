import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = 'b996a6d16888bd453558c42fda526e44';
  URI : string = '';
  URI_forecast: string = '';

  constructor(private httpClient : HttpClient) {
    this.URI = `https://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&lang=es&units=metric&q=`;
    this.URI_forecast = `https://api.openweathermap.org/data/2.5/forecast?&appid=${this.apiKey}&lang=es&units=metric&q=`;
  }
  
  getWeather(cityName: string) {
    return this.httpClient.get(`${this.URI}${cityName}`);
  }
  
  getForecast(cityName: string) {
    return this.httpClient.get(`${this.URI_forecast}${cityName}`);
  }
}
