import { Component } from '@angular/core';
import { NavItem } from '../../core/model/nav-view.model';
import { Observable } from 'rxjs';
import { NavComposerService } from '../../core/composer/nav-composer.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.scss'
})
export class NavListComponent {
  readonly navItems$: Observable<NavItem[]>;

  constructor(private navComposer: NavComposerService) {
    this.navItems$ = this.navComposer.navViewModel$;
  }
}
