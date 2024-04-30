import { TestBed } from '@angular/core/testing';

import { RegisterService } from './register.service';
import { HttpClient } from '@angular/common/http';

describe('RegisterService', () => {
  let service: RegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      
      providers:[
        HttpClient
      ]
    });
    service = TestBed.inject(RegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
