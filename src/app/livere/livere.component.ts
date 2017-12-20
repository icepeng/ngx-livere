import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
} from '@angular/core';

import { LivereService } from './livere.service';

@Component({
  selector: 'livere',
  templateUrl: './livere.component.html',
})
export class LivereComponent implements OnChanges, OnDestroy {
  @Input() refer: string;
  livereUID: string;

  constructor(
    private el: ElementRef,
    private livereService: LivereService,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnChanges() {
    this.reloadComment();
  }

  reloadComment() {
    this.el.nativeElement.innerHTML = `<div id="lv-container" data-id="city" data-uid="${
      this.livereService.livereUID
    }"></div>`;
    (window as any).livereOptions = {
      refer: this.refer,
    };

    if (typeof window.LivereTower !== 'undefined') {
      return window.LivereTower.load(['comment']);
    }

    const livereScript = this.document.createElement('script');
    livereScript.src = 'https://cdn-city.livere.com/js/embed.dist.js';
    livereScript.async = true;
    livereScript.type = 'text/javascript';
    this.document.getElementsByTagName('head')[0].appendChild(livereScript);
  }

  ngOnDestroy() {
    (window as any).livereOptions = undefined;
  }
}

declare var window: any;
