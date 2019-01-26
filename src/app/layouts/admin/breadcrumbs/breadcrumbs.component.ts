import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({selector: 'app-breadcrumbs', templateUrl: './breadcrumbs.component.html', styleUrls: ['./breadcrumbs.component.css']})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: Array < Object >;
  constructor(private router: Router, private route: ActivatedRoute) {
    this
      .router
      .events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.breadcrumbs = [];
        let currentRoute = this.route.root;
        let url = '';

        do {
          const childrenRoutes = currentRoute.children;
          currentRoute = null;
          childrenRoutes.forEach(routes => {
            if (routes.outlet === 'primary') {
              const routeSnapshot = routes.snapshot;
              url += '/' + routeSnapshot
                .url
                .map(segment => segment.path)
                .join('/');
              if (routes.snapshot.data.breadcrumb !== undefined) {
                this
                  .breadcrumbs
                  .push({label: routes.snapshot.data.breadcrumb});
              }
              currentRoute = routes;
            }
          });
        } while (currentRoute);
      });
  }

  ngOnInit() {}
}
