import { Component } from '@angular/core';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent {
  services = [
    { id: 'web', title: 'Website Design & Development', summary: 'Modern responsive websites.' },
    { id: 'mobile', title: 'Mobile App Design & Development', summary: 'iOS & Android native/hybrid.' },
    { id: 'saas', title: 'SaaS Platform Design & Architecture', summary: 'Scalable SaaS platforms.' },
    { id: 'azure', title: 'Azure', summary: 'Enterprise Azure solutions.' },
    { id: 'aws', title: 'AWS', summary: 'AWS cloud engineering.' },
    { id: 'gcp', title: 'GCP', summary: 'Google Cloud Platform solutions.' },
    { id: 'genai', title: 'Generative AI Solutions', summary: 'Enterprise LLM integrations.' }
  ];
}
