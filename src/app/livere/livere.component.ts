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
      window.LivereTower.set({ common: this.parse() });
      return window.LivereTower.load(['comment']);
    }

    const livereScript = this.document.createElement('script');
    livereScript.src = 'https://cdn-city.livere.com/js/embed.dist.js';
    livereScript.async = true;
    livereScript.type = 'text/javascript';
    this.document.getElementsByTagName('head')[0].appendChild(livereScript);
  }

  isObjectPropertiesNull(a) {
    for (const b in a) {
      if ('string' !== typeof b || (!a[b] && 0 !== a[b])) {
        return true;
      }
    }
    return false;
  }

  parse() {
    const a = this.document,
      b = a.querySelector('#lv-container'),
      c = window.livereOptions || {};
    if (b) {
      const d = a.querySelector('meta[property="og:image"]'),
        e = a.querySelector('meta[property="og:title"]'),
        f = a.querySelector('meta[property="og:url"]'),
        g = location.hash,
        h = g.match(/#highlight-comment=([0-9]{1,})/),
        i: any = {
          id: b.getAttribute('data-id'),
          refer: c.refer || window.refer || location.host + location.pathname,
        };
      if (!this.isObjectPropertiesNull(i)) {
        return (
          (i.uid = b.getAttribute('data-uid') || null),
          (i.site = c.site || (f ? f.getAttribute('content') : location.href)),
          (i.title =
            (e ? e.getAttribute('content') : document.title) ||
            'Welcome to the black parade'),
          (i.logo = d ? d.getAttribute('content') : null),
          (i.highlightSeq = h ? h[h.length - 1] : null),
          (i.redirectOrigin = c.redirectOrigin || null),
          (i.title = i.title.replace(/\"/g, '＂').replace(/\'/g, '＇')),
          c.facebookPageId &&
            c.facebookUploadUrl &&
            ((i.facebookPageId = c.facebookPageId),
            (i.facebookUploadUrl = c.facebookUploadUrl)),
          i
        );
      }
    }
  }

  ngOnDestroy() {
    (window as any).livereOptions = undefined;
  }
}

declare var window: any;
