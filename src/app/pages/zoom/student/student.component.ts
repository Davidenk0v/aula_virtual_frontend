import { Component, OnInit } from '@angular/core';
import { ZoomService } from '../../../services/zoom/zoom.service';
import { MeetingAlumn } from '../../../interfaces/Meeting';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit{
  meetings?: MeetingAlumn[]
  idMeeting?: number
  password?:string
  constructor(private service: ZoomService,private router: Router){}
  ngOnInit(): void {
    this.verMeetings()
  }

  mandarInicio(id: number,password: string){
    this.idMeeting = id
    this.password = password
  }


  iniciarMeetingModal() {
    
    this.router.navigate(['/zoomVista', this.idMeeting, this.password, "Alumno",0]);
  }


  verMeetings(){
    this.service.obtenerMeetingsBd().subscribe({
      next: (data) => {
        console.log(data)
        this.meetings = data
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        console.log('complete')
      }
    })
  }
}
