import { Injectable, Inject } from '@angular/core';
import { LIVERE_UID } from './livere.token';

declare const global: any;

@Injectable()
export class LivereService {
  constructor(@Inject(LIVERE_UID) public livereUID: string) {}

  get window() {
    return _window();
  }
}

function _window() {
  return typeof window !== 'undefined' ? window : global;
}
