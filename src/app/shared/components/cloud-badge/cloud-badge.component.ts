import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cloud-badge',
  templateUrl: './cloud-badge.component.html',
  styleUrls: ['./cloud-badge.component.css']
})
export class CloudBadgeComponent {
  @Input() provider: 'azure' | 'aws' | 'gcp' | string = '';
  get src() {
    return `/assets/icons/${this.provider}.svg`;
  }
}
