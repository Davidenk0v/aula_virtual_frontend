import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LessonPostService } from './lesson-post.service';
import { lessonPostI } from '../../modelos/class.inteface';
import { env_api } from '../../../environment/env_api';

describe('LessonPostService', () => {
  let service: LessonPostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LessonPostService]
    });

    service = TestBed.inject(LessonPostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verificar que no hay solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post lessons', () => {
    const lesson: lessonPostI = {
      name: 'Test',
      contenido: 'testeando',
      description: 'descripcion test'
    };

    service.postLessons(1, lesson).subscribe(post => {
      expect(post).toEqual(lesson);
    });

    const req = httpMock.expectOne(`${env_api.urlApi}lessons/1`);
    expect(req.request.method).toBe('POST');
    req.flush(lesson);
  });

  it('should put lessons', () => {
    const lesson: lessonPostI = {
      name: 'Test',
      contenido: 'testeando',
      description: 'descripcion test'
    };
  
    service.putLessons(1, lesson).subscribe(post => {
      expect(post).toEqual(lesson);
    });
  
    const req = httpMock.expectOne(`${env_api.urlApi}lessons/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(lesson);
  });
  
  it('should delete lessons', () => {
    const lesson: lessonPostI = {
      name: 'Test',
      contenido: 'testeando',
      description: 'descripcion test'
    };
  
    service.deleteLessons(1).subscribe(post => {
      expect(post).toEqual(lesson);
    });
  
    const req = httpMock.expectOne(`${env_api.urlApi}lessons/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(lesson);
  });
  
});
