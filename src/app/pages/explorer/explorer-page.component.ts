import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather-services/weather.service';

@Component({
  selector: 'app-explorer-page',
  templateUrl: './explorer-page.component.html',
  styleUrls: ['./explorer-page.component.scss']
})
export class ExplorerPageComponent implements OnInit {
  public weather: any;
  public errorSearch: boolean = false;

  constructor(
    private weatherService: WeatherService,
  ) { }

  ngOnInit(): void {
  }

  public submitLocation(cityName: any) {
    this.getWeather(cityName.value);
    // this.getForecast(cityName.value);
    cityName.value = '';
    cityName.focus;
    return false;
  }

  
  public hideCityPanel() {
    this.weather = false;
  }
  
  getWeather(cityName: string) {
    this.weatherService.getWeather(cityName).subscribe(
      res => {
        this.weather = res;
        this.weather.main.temp = Math.round(this.weather.main.temp);
        this.weather.main.temp_max = Math.round(this.weather.main.temp_max);
        this.weather.main.temp_min = Math.round(this.weather.main.temp_min);
        console.log(res);
      },
      err => {
        this.errorSearch = !this.errorSearch;
      }
    )
  }
}
