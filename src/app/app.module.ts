import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreComponent } from './store/store.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreAvatarStatsComponent } from './store-avatar-stats/store-avatar-stats.component';
import { MyCollectionComponent } from './my-collection/my-collection.component';
import { NewDeckComponent } from './new-deck/new-deck.component';
import { AdminComponent } from './admin/admin.component';
import { AddAvatarComponent } from './add-avatar/add-avatar.component';
import { AddCardComponent } from './add-card/add-card.component';
import { EditAvatarComponent } from './edit-avatar/edit-avatar.component';
import { EditCardComponent } from './edit-card/edit-card.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    StoreAvatarStatsComponent,
    MyCollectionComponent,
    NewDeckComponent,
    AdminComponent,
    AddAvatarComponent,
    AddCardComponent,
    EditAvatarComponent,
    EditCardComponent,
    RegisterComponent,
    MenuComponent,
    DashboardComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    { provide: 'ApiRoot', useValue: 'http://localhost:57097'},
    AuthService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
