import TYPES from './constant/types';
import {
  Container
} from 'inversify';
import {
  Server
} from './server';
import {
  Injectable
} from './util-lib/injectable';

export class ng2Api {
  constructor () {
    this.injectableContainer.bind<Injectable>(TYPES.Injectable).to(Injectable);
    this.injectable = this.injectableContainer.get<Injectable>(TYPES.Injectable);

    this.onInit();
  }

  private injectableContainer = new Container();
  private injectable: Injectable;

  private onInit(): void {
    this.injectable.server.start();
  }
}

new ng2Api();