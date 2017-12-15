import { ModuleWithProviders, NgModule } from '@angular/core';

import { LivereComponent } from './livere.component';
import { LIVERE_UID } from './livere.token';
import { LivereService } from './livere.service';

export function LivereFactory(livereUID: string) {
  return new LivereService(livereUID);
}

@NgModule({
  declarations: [LivereComponent],
  exports: [LivereComponent],
})
export class LivereModule {
  static forRoot(livereUID: string): ModuleWithProviders {
    return {
      ngModule: LivereModule,
      providers: [
        { provide: LIVERE_UID, useValue: livereUID },
        {
          provide: LivereService,
          useFactory: LivereFactory,
          deps: [LIVERE_UID],
        },
      ],
    };
  }
}
