import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-title',
  template: `<h1>{{title}}</h1>`
})
export class TitleComponent implements OnInit {
  public title = '';
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      let currentRoute = this.route.root;

      do {
        const childrenRoutes = currentRoute.children;
        currentRoute = null;
        childrenRoutes.forEach(routes => {
          if (routes.outlet === 'primary') {
            this.title = routes.snapshot.data.title;
            currentRoute = routes;
          }
        });
      } while (currentRoute);
    });
  }

  ngOnInit() {
  }

}
