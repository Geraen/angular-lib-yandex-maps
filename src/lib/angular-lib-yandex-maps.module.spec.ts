import { AngularLibYandexMapsModule } from './angular-lib-yandex-maps.module';

describe('AngularLibYandexMapsModule', () => {
  let angularLibYandexMapsModule: AngularLibYandexMapsModule;

  beforeEach(() => {
    angularLibYandexMapsModule = new AngularLibYandexMapsModule();
  });

  it('should create an instance', () => {
    expect(angularLibYandexMapsModule).toBeTruthy();
  });
});
