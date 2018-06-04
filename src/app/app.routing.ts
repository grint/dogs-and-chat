import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { DogsComponent } from './components/dogs/dogs.component';
import { MessengerComponent } from './components/messenger/messenger.component';

export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot([
	{ path: '', redirectTo: '/dogs', pathMatch: 'full' },
	{ path: 'dogs', component: DogsComponent },
	{ path: 'dogs/:breed', component: DogsComponent },
	{ path: 'dogs/:breed/:subbreed', component: DogsComponent },
	{ path: 'messenger', component: MessengerComponent },
	{ path: 'messenger/user/:userId', component: MessengerComponent }
]);