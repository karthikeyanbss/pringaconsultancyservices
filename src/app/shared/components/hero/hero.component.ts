import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  @Input() title = 'Pringa Consultancy Services';
  @Input() subtitle = 'Enterprise IT Consultation & Cloud Solutions';
}
