

import { Component, OnInit } from '@angular/core';
import { ZoomService } from '../../../services/zoom/zoom.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-teacher-zoom',
  standalone: true,
  imports: [],
  templateUrl: './teacher-zoom.component.html',
  styleUrl: './teacher-zoom.component.css'
})
export class TeacherZoomComponent implements OnInit {

  constructor(private service: ZoomService, private route: ActivatedRoute,private formBuilder: FormBuilder) { }

  newCourseForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    startDate: [new Date(), [Validators.required]],
    finishDate: [new Date(), [Validators.required]],
    pago: [0, [Validators.required]],
    idTeacher: [1, [Validators.required]]
  });

  token?: string;
  ngOnInit(): void {

    this.tokenObtener();
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



  abrirModalAñadir() {
    const modal = document.getElementById('exampleModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }


  cerrarModalAñadir() {
    const modal = document.getElementById('exampleModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

}
