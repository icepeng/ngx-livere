# NgxLivere

Add LiveRe to your app instantly!

## Installation

Install it with npm or yarn

`$ npm install --save ngx-livere`

## Usage

Import `LivereModule` in the root module

```
import { LivereModule } from "ngx-livere";
@NgModule({
  imports: [
    // ...
    LivereModule.forRoot('livere_uid')
  ]
})
```
`livere_uid` is registered uid on your LiveRe account.

Then you can use component

```
@Component({
  selector: 'app-yoshi',
  template: `<livere [refer]="url"></livere>`
})
export class YoshiComponent {
  pageId = '/yoshi';
}
```

Livere component requires the `refer` input to work properly.