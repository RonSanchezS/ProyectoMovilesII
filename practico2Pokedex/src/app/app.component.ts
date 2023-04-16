import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ModalsModule } from './components/modals/modals.module';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, ModalsModule],
  providers: [HttpClientModule],
})
export class AppComponent {
  constructor() {}
}
