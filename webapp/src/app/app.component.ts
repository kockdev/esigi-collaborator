import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'esigi-collaborator';
  activeMenu!: '';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  menuList = [
    // {
    //   name: 'sidenav.home',
    //   icon: 'home',
    //   selected: false,
    //   action:'http://localhost:3406',
    // },
    {
      name: 'sidenav.collaborator',
      icon: 'person',
      selected: false,
      action: 'colaborador/lista',
    },
    {
      name: 'sidenav.jobs',
      icon: 'work',
      selected: false,
      action: 'vaga/lista',
    },

    {
      name: 'sidenav.resume',
      icon: 'description',
      selected: false,
      action: 'curriculo/lista',
    },
  ];

  collaboratorId!: string | null;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private route: ActivatedRoute,
    public translateService: TranslateService,
    private userService: UserService
  ) {
    translateService.addLangs(['en-US', 'pt-BR']);
  }

  ngOnInit(): void {
    this.translateService.setDefaultLang('pt-BR');
    this.translateService.use('pt-BR');
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((res: any) => {
        this.activeMenu = res.url.split('/')[1];
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.observer.observe(['(max-width: 800px)']).subscribe((res: any) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    }, 50);
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  openApp(port: number): void {
    location.replace(`http://localhost:${port}`);
  }

  logout(): void {
    this.userService.logout();
  }

}
