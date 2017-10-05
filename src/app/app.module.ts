import {BrowserModule} from '@angular/platform-browser';
import {Component, NgModule, OnInit} from '@angular/core';

import {AppComponent} from './app.component';
import {ActivatedRoute, Resolve, Router, RouterModule} from '@angular/router';
import {of} from 'rxjs/observable/of';

@Component({
  template: `
    {{game.name}}
    <button (click)="action()">Action</button>
  `
})
export class GameEditComponent implements OnInit {
  game: any;

  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {
  }

  ngOnInit() {
    // this might work in your case, but overall accessing a snapshot in ngOnInit is a bad idea.
    // By default, the router will reuse a component when the params change. So you might have stale data.
    if (this.route.snapshot.data['game']) {
      this.game = this.route.snapshot.data['game'];
    }
  }

  action() {
    this.router.navigate(['game', this.game.name]);
  }
}

export class GameResolver {
  resolve(): any {
    return {name: 'REAL'};
  }
}

@NgModule({
  declarations: [
    GameEditComponent,
  ],
  exports: [
    GameEditComponent,
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      component: GameEditComponent,
      resolve: {
        game: GameResolver,
      }
    }]),
  ],
})
export class GameEditModule {
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
