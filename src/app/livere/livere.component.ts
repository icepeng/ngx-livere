import {
  Component,
  ElementRef,
  OnDestroy,
  OnChanges,
  Renderer2,
  Input,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LivereService } from './livere.service';

@Component({
  selector: 'livere',
  templateUrl: './livere.component.html',
})
export class LivereComponent implements OnChanges, OnDestroy {
  @Input() refer: string;
  livereUID: string;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private livereService: LivereService,
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
    const livereScript = this.renderer.createElement('script');
    livereScript.src = 'https://cdn-city.livere.com/js/embed.dist.js';
    livereScript.async = true;
    livereScript.type = 'text/javascript';
    this.renderer.appendChild(this.el.nativeElement, livereScript);
  }

  ngOnDestroy() {
    (window as any).livereOptions = undefined;
  }
}
