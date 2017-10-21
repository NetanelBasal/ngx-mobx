[![Build Status](https://travis-ci.org/NetanelBasal/helpful-decorators.svg?branch=master)](https://travis-ci.org/NetanelBasal/ngx-mobx)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

# Mobx decorators for Angular Applications

## Installation
```js
npm install ngx-mobx
yarn add ngx-mobx
```

## Usage

```ts
import { Cleaner, autorun } from 'ngx-mobx';

@Cleaner
@Component({
  selector: 'todos',
  template: `...`
})
export class TodosPageComponent {

  @autorun
  ngOnInit() {
    this.todos = this.todosStore.todos;
  }

  ngOnDestroy() {}
}
```

### Roadmap

 - ~~Cleaner~~
 - ~~autorun~~
 - fromMobx (RxJS bridge)

 
License
----

MIT