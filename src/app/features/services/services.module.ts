import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ServicesListComponent } from './services-list/services-list.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';

@NgModule({
  declarations: [ServicesListComponent, ServiceDetailComponent],
  imports: [SharedModule, RouterModule.forChild([
    { path: '', component: ServicesListComponent },
    { path: ':id', component: ServiceDetailComponent }
  ])]
})
export class ServicesModule {}
