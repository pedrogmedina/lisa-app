import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { pipe } from 'rxjs';
import { WeatherService } from './services/weather-services/weather.service';
import { PopModalComponent } from './shareds/pop-modal/pop-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clima-widget';
  weather: any;
  forecast: any;
  presentSearchBar: boolean = false;

  firstName: string = '';
  data: any;

  today: number = Date.now();

  errorSearch: boolean = false;

  constructor(
    private weatherService: WeatherService,
    public modalController: ModalController
  ) { }

  ngOnInit(): void {
  }

  async presentModal() {
    this.firstName = this.weather.name;
    const modal = await this.modalController.create({
      component: PopModalComponent,
      componentProps: {
        'firstName': this.firstName,
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    return await modal.present();
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

  getForecast(cityName: string) {
    this.weatherService.getForecast(cityName).subscribe(
      res => {
        this.forecast = res;
        this.data = Object.values(this.forecast.list);
        this.forecast.list[12].main.temp = Math.round(this.forecast.list[12].main.temp);
        this.forecast.list[20].main.temp = Math.round(this.forecast.list[20].main.temp);
        console.log(res);
      },
      err => {
        this.errorSearch = !this.errorSearch;
      }
    )
  }

  submitLocation(cityName: any) {
    this.getWeather(cityName.value);
    this.getForecast(cityName.value);
    cityName.value = '';
    cityName.focus;
    return false;
  }

  hideCityPanel() {
    this.weather = false;
  }
}
