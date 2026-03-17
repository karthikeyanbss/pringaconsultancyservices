import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { CloudBadgeComponent } from './components/cloud-badge/cloud-badge.component';

@NgModule({
  declarations: [HeroComponent, ServiceCardComponent, CloudBadgeComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HeroComponent, ServiceCardComponent, CloudBadgeComponent]
})
export class SharedModule {}
