import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  refer = 'test1';

  toggle() {
    this.refer = this.refer === 'test1' ? 'test2' : 'test1';
  }
}
