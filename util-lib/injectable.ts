import TYPES from '../constant/types';
import {
  Container,
  injectable
} from 'inversify';
import {
  Server
} from '../server';

@injectable()
export class Injectable {
  constructor() {
    this.onInit();
  }

  private serverContainer = new Container();
  public server: Server;

  private onInit(): void {
    this.serverContainer.bind<Server>(TYPES.Server).to(Server);
    this.server = this.serverContainer.get<Server>(TYPES.Server);
  }
}