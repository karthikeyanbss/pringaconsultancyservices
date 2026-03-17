import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  services = [
    { id: 'web', title: 'Website Design & Development', summary: 'Modern responsive websites.' },
    { id: 'mobile', title: 'Mobile App Design & Development', summary: 'iOS & Android native/hybrid.' },
    { id: 'saas', title: 'SaaS Platform Design', summary: 'Scalable SaaS architecture.' },
    { id: 'cloud', title: 'Cloud Solutions', summary: 'Azure, AWS, GCP enterprise solutions.' }
  ];
}
