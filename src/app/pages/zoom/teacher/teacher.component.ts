import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ZoomService } from '../../../services/zoom/zoom.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MeetingCreating, MeetingView } from '../../../interfaces/Meeting';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {

  constructor(private router: Router,private service: ZoomService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }
  meetings?: MeetingView[]

  idMeeting?: number
  meeting = this.formBuilder.group({
    agenda: ['', [Validators.required]],
    duration: [0, [Validators.required]],
    password: ['', [Validators.required]],
    start_time: ['', [Validators.required]],
    timezone: ['', [Validators.required]],
    type: [0, [Validators.required]]
  });


  iniciarMeeting = this.formBuilder.group({
    meetingNumber: ['', [Validators.required]],
    password: ['', [Validators.required]],
    name: ['', [Validators.required]],
  });
  token?: string;
  ngOnInit(): void {
    this.tokenObtener();

  }
  navegarAZoom() {
    const { meetingNumber, password, name } = this.iniciarMeeting.value;
    this.router.navigate(['/zoomVista', meetingNumber, password, name]);
  }

  mandarInicio(id: number){
    this.idMeeting = id
  }

  meetingInicio(){
    this.service.obtenerMeeting(this.token as string, this.idMeeting as number).subscribe({
      next: (data) => {
        console.log(data)
        this.iniciarMeetingModal(this.idMeeting?.toString() as string, data, "Profesor")
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        console.log('complete')
      }
    })
  }

  iniciarMeetingModal(meetingNumber: string, password: string, name: string) {
    this.router.navigate(['/zoomVista', meetingNumber, password, name]);
  }

  obtenerMeetings() {
    console.info("entra")
    this.service.obtenerMeetings(this.token as string).subscribe({
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

  createMetting() {
    this.service.createMeeting(this.meeting.value as MeetingCreating, this.token as string).subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        console.log('complete')
      }
    })
    console.info(this.meeting.value as MeetingCreating)

  }

  tokenObtener() {

    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log('Token recibido:', this.token);
    });

    if (this.token == null) {
      this.service.tokenZoom();
    }else{
      if (this.token?.length > 100) {
      this.obtenerMeetings();
      console.info('Token existente:', this.token);
    }
    }
    

  }


  //Modal



  abrirModalAnyadir() {
    const modal = document.getElementById('exampleModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }


  cerrarModalAnyadir() {
    const modal = document.getElementById('exampleModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }
}
