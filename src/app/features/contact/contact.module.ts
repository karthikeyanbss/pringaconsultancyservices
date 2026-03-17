import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './contact.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

@NgModule({
  declarations: [ContactComponent, ContactFormComponent],
  imports: [SharedModule, RouterModule.forChild([{ path: '', component: ContactComponent }])]
})
export class ContactModule {}
