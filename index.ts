import TYPES from './constant/types';
import { Server } from './server';
import { container } from './util-lib/injectable';

export class ng2Api {
  constructor() {
    this.onInit();
  }

  private server: Server = container.get<Server>(TYPES.Server);

  private onInit(): void {
    this.server.start();
  }
}

new ng2Api();
