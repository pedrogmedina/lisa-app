import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather-services/weather.service';


@Component({
  selector: 'app-widget-main',
  templateUrl: './widget-main.component.html',
  styleUrls: ['./widget-main.component.scss']
})
export class WidgetMainComponent implements OnInit {

  @Input() today: number = 0;
  weather: any;
  cityName = ['Madrid'];

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
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
}
