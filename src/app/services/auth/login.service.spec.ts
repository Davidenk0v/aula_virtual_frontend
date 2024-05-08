import { TestBed } from '@angular/core/testing';

import { LoginService } from './auth.service';
import { HttpClient } from '@angular/common/http';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        HttpClient
      ]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
