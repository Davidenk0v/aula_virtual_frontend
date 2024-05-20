import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ZoomMtgEmbedded, { ExecutedResult } from '@zoom/meetingsdk/embedded';
import { ZoomService } from '../../services/zoom/zoom.service';

@Component({
  selector: 'app-zoom',
  standalone: true,
  imports: [],
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})
export class ZoomComponentVista implements OnInit {
  
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
    private router: Router,
    private service: ZoomService, 
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document, 
    private ngZone: NgZone) {

  }

  ngOnInit() {
    this.meetingNumber = String(this.route.snapshot.paramMap.get('meetingNumber'));
    this.passWord = String(this.route.snapshot.paramMap.get('password'));
    this.userName = String(this.route.snapshot.paramMap.get('name'));
    this.role = Number(this.route.snapshot.paramMap.get('role'));

    console.info(this.meetingNumber, this.passWord, this.userName)

    this.getSignature()
  }

  getSignature() {
    this.service.signatureGet(this.meetingNumber,this.role).subscribe({
      next: (data) => {
        console.log(data)
        this.startMeeting(data.signature)
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        console.log('complete')
      }
    })
  }

  startMeeting(signature : string) {

    try {
      
    
    let meetingSDKElement = this.document.getElementById('meetingSDKElement');

    console.info(this.passWord)
    this.ngZone.runOutsideAngular(() => {
      if (meetingSDKElement) {
         this.client.init({
          zoomAppRoot: meetingSDKElement, 
          language: 'en-US', 
          customize:{
            video:{
              isResizable: true,
              viewSizes:{
                default:{
                  width: 1200,
                  height: 400
                } 
              }
            }
          },
          patchJsMedia: true}).then(() => {
            this.client.on('connection-change', (payload) => {
              if (payload.state === 'Closed') {
                
                this.router.navigate(['/home']);
               
              }
            });
            
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
  } catch (error) {
      console.log(error)
    }
  }


}
