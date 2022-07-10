import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import {loadRemoteModule} from '@angular-architects/module-federation';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(
    [
      {
        path: '',
        loadChildren: () =>
          loadRemoteModule({
            type: 'manifest',
            remoteName: 'ng-app',
            exposedModule: './Module'
        })
        .then(m => m.RemoteEntryModule)
      },
      {
        path: '',
        loadChildren: () =>
          loadRemoteModule({
            type: 'manifest',
            remoteName: 'enterprise-remote-app1',
            exposedModule: './Module'
        })
        .then(m => m.RemoteEntryModule)
      }
    ],
    { initialNavigation: 'enabledBlocking' }
  )],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
