import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather-services/weather.service';
import { GeolocationService } from 'src/app/services/geolocation-services/geolocation.service';


@Component({
  selector: 'app-widget-main',
  templateUrl: './widget-main.component.html',
  styleUrls: ['./widget-main.component.scss']
})
export class WidgetMainComponent implements OnInit {

  @Input() today: number = 0;
  weather: any;
  cityName = ['Alcalá de Henares'];
  timeline: any = [];
  weatherNow: any;
  currentTime = new Date();
  location: any;
  locCountry: any;


  constructor(
    private weatherService: WeatherService, 
    private geolocationService : GeolocationService) { }

  ngOnInit(): void {
    this.getGeolocation();
    this.getWeather();
  }

  getWeather() {
    for (let i of this.cityName) {
      this.weatherService.getWeather(i).subscribe(
        res => {
          this.weather = res;
          this.weather.main.temp = Math.round(this.weather.main.temp);
          this.weather.main.temp_max = Math.round(this.weather.main.temp_max);
          this.weather.main.temp_min = Math.round(this.weather.main.temp_min);
          console.log(res);
        },
        err => alert("Error")
      )
    }
  }

  getGeolocation() {
    this.geolocationService.getWeatherForecast().subscribe(data => {
      // console.log(data)
      
      this.getTodayForecast(data)
    })
  }

  dateRange() {
    const start = new Date();
    start.setHours(start.getHours() + (start.getTimezoneOffset() / 60));
    const to = new Date(start);
    to.setHours(to.getHours() + 2, to.getMinutes() + 59, to.getSeconds() + 59);

    return { start, to }
  }

  getTodayForecast(today: any) {
    // console.log(today)

    this.location = today.city.name;
    this.locCountry = today.city.country;

    for (const forecast of today.list.slice(0, 8)) {
      // console.log(forecast);
      this.timeline.push({
        time: forecast.dt_txt,
        temp: forecast.main.temp
      });

      const apiDate = new Date(forecast.dt_txt).getTime();
      
      if(this.dateRange().start.getTime() <= apiDate && this.dateRange().to.getTime() >= apiDate) {
        this.weather = forecast;
        console.log(this.weather)
      }

      this.weather.main.temp = Math.round(this.weather.main.temp);
      this.weather.main.temp = Math.round(this.weather.main.temp);
      this.weather.main.temp_max = Math.round(this.weather.main.temp_max);
      this.weather.main.temp_min = Math.round(this.weather.main.temp_min);
    }
  }
}
