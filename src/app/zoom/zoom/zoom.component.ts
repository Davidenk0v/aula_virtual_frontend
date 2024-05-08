import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, NgZone } from '@angular/core';
import { ZoomMtg } from '@zoomus/websdk';

@Component({
  selector: 'app-zoom',
  standalone: true,
  imports: [],
  templateUrl: './zoom.component.html',
  styleUrl: './zoom.component.css'
})
export class ZoomComponent {
  authEndpoint = 'v4YP-ImYQ2W_sJlHYyZ4jg'
  sdkKey = 'FVOEXlkbSgGMUTLHcokuQ'
  meetingNumber = '123456789'
  passWord = ''
  role = 0
  userName = 'Angular'
  userEmail = ''
  registrantToken = ''
  zakToken = ''
  leaveUrl = 'http://localhost:4200'

  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) private document:Document, private ngZone: NgZone) {

  }

  ngOnInit() {

  }

  getSignature() {
    this.httpClient.post(this.authEndpoint, {
	    meetingNumber: this.meetingNumber,
	    role: this.role
    }).toPromise().then((data: any) => {
      if(data.signature) {
        console.log(data.signature)
        this.startMeeting(data.signature)
      } else {
        console.log(data)
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  startMeeting(signature: any) {

    
    if (document) {
      let element = document.getElementById('zmmtg-root');
      if (element) {
        element.style.display = 'block';
      }
    }

    this.ngZone.runOutsideAngular(() => {
      ZoomMtg.init({
        leaveUrl: this.leaveUrl,
        patchJsMedia: true,
        success: (success: string) => {
          console.log(success)
          ZoomMtg.join({
            signature: signature,
            sdkKey: this.sdkKey,
            meetingNumber: this.meetingNumber,
            passWord: this.passWord,
            userName: this.userName,
            userEmail: this.userEmail,
            tk: this.registrantToken,
            zak: this.zakToken,
            success: (success : string) => {
              console.log(success)
            },
            error: (error: any) => {
              console.log(error)
            }
          })
        },
        error: (error: any) => {
          console.log(error)
        }
      })
    })
  }
}
