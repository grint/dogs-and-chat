import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { APP_ROUTING } from './app.routing';

import {SelectModule} from 'ng2-select';
import { Title } from '@angular/platform-browser';

import { NavbarComponent } from './common/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DogsComponent } from './components/dogs/dogs.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';

import { DogsService} from './components/dogs/dogs.service';
import { MessengerService} from './components/messenger/messenger.service';
import { UsersService} from './components/users/users.service';
import { UserService} from './components/user/user.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        SelectModule,
        APP_ROUTING
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        DogsComponent,
        MessengerComponent,
        UsersComponent,
        UserComponent
    ],
    providers: [
        Title,
        DogsService,
        MessengerService,
        UsersService,
        UserService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}