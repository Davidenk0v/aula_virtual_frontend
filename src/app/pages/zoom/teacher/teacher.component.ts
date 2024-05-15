import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private service: ZoomService, private route: ActivatedRoute,private formBuilder: FormBuilder) { }
  meetings? : MeetingView

  meeting = this.formBuilder.group({
    agenda: ['', [Validators.required]],
    duration: [0, [Validators.required]],
    password: ['', [Validators.required]],
    start_time: ['', [Validators.required]],
    timezone: ['', [Validators.required]],
    type: [0, [Validators.required]]
  });
  token?: string;
  ngOnInit(): void {
    this.tokenObtener();
  }


  obtenerMeetings() {
    
  }

  createMetting(){
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
        // Aquí puedes almacenar el token en localStorage o sessionStorage para su uso posterior
        // localStorage.setItem('token', this.token);
      });
    if (this.token == null) {
        this.service.tokenZoom();
    }
  }


  

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
