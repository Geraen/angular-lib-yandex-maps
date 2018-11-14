import { TestBed, inject } from '@angular/core/testing';

import { YaMapWrapper } from './ya-map.wrapper';

describe('YaMapWrapper', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YaMapWrapper]
    });
  });

  it('should be created', inject([YaMapWrapper], (service: YaMapWrapper) => {
    expect(service).toBeTruthy();
  }));
});
