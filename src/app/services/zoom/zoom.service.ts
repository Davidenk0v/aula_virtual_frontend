import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserProfile } from '../../interfaces/Profile';
import { UserEdit } from '../../interfaces/User';
import { MeetingAlumn, MeetingCreating, MeetingView } from '../../interfaces/Meeting';
import { Router } from '@angular/router';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class ZoomService {
  currentUserLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserLogin = new BehaviorSubject<boolean>(sessionStorage.getItem("tokenZoom") != null);
    this.currentUserData = new BehaviorSubject<string>(sessionStorage.getItem("tokenZoom") || "");
  }
  errorMessage?: string;

  signatureGet(meeting: string, role: number): Observable<any> {
    return this.http.post<any>(`${environment.zoom.urlServerAuth}`, {
	    meetingNumber: meeting,
	    role: role
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${error.error.message}`;
        } else {
          this.errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }

        return throwError(() => this.errorMessage);
      })
    );
  }
  updateProfile(id: number, profile: UserEdit): Observable<UserProfile> {
    return this.http.put<Record<string, UserProfile>>(`${environment.api.urlApi}/users/${id}`, profile).pipe(
      map(response => response['Guardado']),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${error.error.message}`;
        } else {
          this.errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }

        return throwError(() => this.errorMessage);
      })
    )
  }

  tokenZoom() {
    const clientId = environment.zoom.ZOOM_API_KEY;
    const redirect_uri = encodeURIComponent(environment.zoom.REDIRECT_URI);
    const responseType = 'code';
    const authorizationUrl = `https://zoom.us/oauth/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirect_uri}`;
    window.location.href = environment.zoom.urlServerToken
  }


  obtenerMeetings(token: string):Observable<MeetingView[]> {
    
    return this.http.get<MeetingView[]>(`${environment.zoom.urlServer}obtenerMeetings/${token}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${error.error.message}`;
        } else {
          this.errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }

        return throwError(() => this.errorMessage);
      })
    );
     
  }

  obtenerMeetingsBd():Observable<MeetingAlumn[]> {
    
    return this.http.get<MeetingAlumn[]>(`${environment.api.urlApi}/meetings/`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${error.error.message}`;
        } else {
          this.errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }

        return throwError(() => this.errorMessage);
      })
    );
     
  }

  obtenerMeeting(token: string,id: number):Observable<string> {
    
    return this.http.get<string>(`${environment.zoom.urlServer}obtenerMeeting/${token}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${error.error.message}`;
        } else {
          this.errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }

        return throwError(() => this.errorMessage);
      })
    );
     
  }

  createMeetingBd(iniciar: boolean,nameTeacher: string,numberMeeting: number,password: string):Observable<any>{
    const meeting = {
      process: iniciar,
      nameTeacher:nameTeacher,
      numberMeeting:numberMeeting,
      password: password
    }
    console.info(meeting)
    return this.http.post<any>(`${environment.api.urlApi}/meetings/`, meeting).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${error.error.message}`;
        } else {
          this.errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }

        return throwError(() => this.errorMessage);
      })
    );;
  }
  createMeeting(data: MeetingCreating, token: string): Observable<any> {
    const dato = {
      cuerpo: {
        agenda: data.agenda,
        duration: data.duration,
        password: data.password,
        start_time: data.start_time,
        timezone: data.timezone,
        settings: {
          auto_recording: "cloud",
          host_video: true,
          continuous_meeting_chat: {
            enable: true,
            auto_add_invited_external_users: true
          }
        },
        type: 2
      },
      token: token

    }
    console.info(dato)
    
    const response = this.http.post<any>(`${environment.zoom.urlServer}creatingMeting`, dato);
    return response.pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${error.error.message}`;
        } else {
          this.errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }

        return throwError(() => this.errorMessage);
      })
    );
  }
}
