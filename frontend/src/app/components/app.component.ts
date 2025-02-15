import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { AngularMaterialModule } from '../modules/angular-material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import {LayoutModule} from '@angular/cdk/layout';
import { StoreService } from '../services/store.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslatorComponent } from './juris/shared/translator/translator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    RouterOutlet, 
    CommonModule, 
    AngularMaterialModule, 
    FlexLayoutModule, 
    RouterLink, 
    LayoutModule,
    TranslateModule,
    TranslatorComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  menu: any[] = [];
  
  topMenu: any[] = [];

  constructor(private readonly auth: AuthService,
              private readonly store: StoreService,
              private readonly translate: TranslateService) {
    this.translate.addLangs(['pt', 'en']);
    this.translate.setDefaultLang('pt');
    this.translate.use('pt');
  }

  ngOnInit(): void {
    this.createTopMenu();
    this.createMenu();  
  }

  private async createMenu() {
    this.menu = [];
    this.menu.push({ title: 'Home', url: '/home', icon: 'home' });
    this.menu.push({ title: 'Account', url: '/user', icon: 'account_circle' });

    const authenticated = this.store.isSet();
    if (authenticated) {
      this.menu.push({ title: 'Customers', url: '/customers', icon: 'people' });
      this.menu.push({ title: 'Lawyers', url: '/lawyers', icon: 'people' });
      this.menu.push({ title: 'Parties Involved', url: '/parties-involved', icon: 'people'});
      this.menu.push({ title: 'Processes', url: '/processes', icon: 'account_tree' });
      this.menu.push({ title: 'Progress',  url: '/progress', icon: 'rule_settings' });
      this.menu.push({ title: 'Customer Service', url: '/customer-service', icon: 'today'});
      this.menu.push({ title: 'Schedule', url: '/schedule', icon: 'calendar_month' });  
    }
  }

  private async createTopMenu() {
    this.topMenu = [];
    this.topMenu.push({ title: 'Home', url: '/home', icon: 'home' });
    this.topMenu.push({ title: 'Account', url: '/user', icon: 'account_circle' });
  }

}
