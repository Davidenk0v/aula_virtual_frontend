import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded';

@Component({
  selector: 'app-zoom',
  standalone: true,
  imports: [],
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})
export class ZoomComponent implements OnInit {
  
  authEndpoint = 'http://localhost:4000'
  sdkKey = '6p_ZQkgXQ_K8gJe7bxq8Tg'
  meetingNumber = '83888129757'
  passWord = 'd7HiN4'
  role = 1
  userName = 'Angular'
  userEmail = ''
  registrantToken = ''
  zakToken = ''

  client = ZoomMtgEmbedded.createClient();

  constructor(
    private httpClient: HttpClient, 
    @Inject(DOCUMENT) private document: Document, 
    private ngZone: NgZone) {

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

  startMeeting(signature : string) {

    let meetingSDKElement = this.document.getElementById('meetingSDKElement');

    this.ngZone.runOutsideAngular(() => {
      if (meetingSDKElement) {
         this.client.init({zoomAppRoot: meetingSDKElement, language: 'en-US', patchJsMedia: true}).then(() => {
        this.client.join({
          signature: signature,
          sdkKey: this.sdkKey,
          meetingNumber: this.meetingNumber,
          password: this.passWord,
          userName: this.userName,
          userEmail: this.userEmail,
          tk: this.registrantToken,
          zak: this.zakToken
        }).then(() => {
          console.log('joined successfully')
        }).catch((error) => {
          console.log(error)
        })
      }).catch((error) => {
        console.log(error)
      })
      }
     
    })
  }
}
