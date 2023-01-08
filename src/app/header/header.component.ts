import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointsService } from '../services/breakpoint.service';
import { StyleManagerService } from '../services/style-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private styleManager: StyleManagerService,
    private breakpointService: BreakpointsService
  ) {}
  $bp!: Observable<string>;
  isDark$ = this.styleManager.isDark$;
  ngOnInit(): void {
    this.$bp = this.breakpointService.breakpoint$;
  }

  toggleTheme() {
    this.styleManager.toggleTheme();
  }
}
