import {TestBed, async, TestModuleMetadata, tick, fakeAsync} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {Component, Type} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {GameEditComponent, GameEditModule, GameResolver} from './app.module';
import {Router} from '@angular/router';

describe('GameEdit', () => {
  it('should work', fakeAsync(() => {
    const c = bootstrap(GameEditComponent, '', {
      imports: [
        GameEditModule
      ],
      providers: [
        { provide: GameResolver, useValue: () => ({name: 'fake'})}
      ]
    });

    expect(c.nativeElement.innerHTML).toContain('fake');
    const r = TestBed.get(Router);
    spyOn(r, 'navigate');

    const b = c.nativeElement.querySelector('button');
    b.click();

    expect(r.navigate).toHaveBeenCalledWith(['game', 'fake']);
  }));
});


function bootstrap(component: Type<any>, url: string, overrides: TestModuleMetadata) {
  @Component({
    selector: 'container',
    template: `<router-outlet></router-outlet>`
  })
  class Container {}

  const imports = overrides.imports ? overrides.imports : [];
  const providers = overrides.providers ? overrides.providers : [];
  const declarations = overrides.declarations ? overrides.declarations : [];

  TestBed.configureTestingModule({
    declarations: [...declarations, Container],
    imports: [
      RouterTestingModule,
      ...overrides.imports
    ],
    providers: overrides.providers
  }).compileComponents();


  const c = TestBed.createComponent(Container);
  tick();
  c.detectChanges();

  TestBed.get(Router).navigateByUrl(url);
  tick();
  c.detectChanges();

  return c;
}
