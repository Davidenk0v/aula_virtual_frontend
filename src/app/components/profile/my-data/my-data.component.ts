import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User, UserEdit } from '../../../interfaces/User';
import { ProfileService } from '../../../services/profile.service';
import { JwtService } from '../../../services/jwt/jwt.service';
@Component({
  selector: 'app-my-data',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './my-data.component.html',
  styleUrl: './my-data.component.css'
})
export class MyDataComponent {
  isEventListenerAdded: any;

  constructor(private formBuilder: FormBuilder, private userService: ProfileService, private jwtService: JwtService) { }

  @Input() teacherInfo?: User;
  email!: string;
  profile!: FormGroup;
  emailForm!: FormGroup;
  idUser!: string;
  imageUrl!: string;
  payload:any;
  uploadInput: any;
  filenameLabel: any;
  imagePreview: any;


  ngOnInit(): void {
    console.info(this.teacherInfo)
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.email = this.jwtService.getEmailFromToken()
    this.idUser = this.jwtService.getIdFromToken();
    this.downloadImage(this.idUser)
    this.profile = this.formBuilder.group({
      username: [this.teacherInfo?.username, [Validators.required]],
      lastName: [this.teacherInfo?.lastName, [Validators.required]],
      firstName: [this.teacherInfo?.firstName, [Validators.required]],
      urlImg: [this.imageUrl]
    });
    this.emailForm = this.formBuilder.group({
      email: [this.email, [Validators.required]]
    });

    this.uploadInput = document.getElementById('upload') as HTMLInputElement;
    this.filenameLabel = document.getElementById('filename') as HTMLLabelElement;
    this.imagePreview = document.getElementById('image-preview') as HTMLDivElement;

    if (!this.uploadInput || !this.filenameLabel || !this.imagePreview) {
      throw new Error('Some elements are missing from the DOM');
    }

    this.initializeEventListeners();

    console.info(this.profile.value)
  }

  update() {
    console.log(this.teacherInfo)
    console.info(this.profile.value)
    this.userService.updateProfile(this.email, this.profile.value as UserEdit).subscribe({
      next: (data) => {
        console.info(this.profile.value as User)
        console.info(data);
      }, error: (data) => {
        console.info(data, "Error")
      },
      complete: () => {
        console.info("Completo")
        sessionStorage.setItem('edit', 'Se ha editado el perfil correctamente')
      }
    });
  }

  // Controlador de enventos del modal imagenes

  initializeEventListeners(): void {
    this.uploadInput.addEventListener('change', (event: Event) => this.handleFileChange(event));
    this.uploadInput.addEventListener('click', (event: MouseEvent) => this.handleUploadClick(event));
  }

  handleFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      this.displayFileName(file.name);
      this.displayImagePreview(file);
    } else {
      this.clearPreview();
    }
  }

  handleUploadClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  displayFileName(name: string): void {
    this.filenameLabel.textContent = name;
    console.log("payload ", name);
  }

  displayImagePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.imagePreview.innerHTML = `<img src="${e.target?.result as string}" class="max-h-48 rounded-lg mx-auto" alt="Image preview" />`;
      this.imagePreview.classList.remove('border-dashed', 'border-2', 'border-gray-400');

      if (!this.isEventListenerAdded) {
        this.imagePreview.addEventListener('click', () => {
          this.uploadInput.click();
        });
        this.isEventListenerAdded = true;
      }
    };
    reader.readAsDataURL(file);
  }

  clearPreview(): void {
    this.filenameLabel.textContent = '';
    this.imagePreview.innerHTML = `<div class="bg-gray-200 h-48 rounded-lg flex items-center justify-center text-gray-500">No image preview</div>`;
    this.imagePreview.classList.add('border-dashed', 'border-2', 'border-gray-400');

    if (this.isEventListenerAdded) {
      this.imagePreview.removeEventListener('click', () => {
        this.uploadInput.click();
      });
      this.isEventListenerAdded = false;
    }
  }

  // Fin controlador de eventos de imagenes

  /**
     * Descarga el archivo desde la API.
     * @param user La id del usuario.
     */
  downloadImage(user: string) {
    console.log("Usuario ID", user);

    this.userService.getProfileImage(user).subscribe({
      next: (data: any) => {
        console.info("data URL", data);
        this.imageUrl = URL.createObjectURL(data);
      }, error: (data: any) => {
        console.info(data, "Error")
      },
      complete: () => {
        console.info("Completo")
      }
    });
  }
  
  /**
   * Selecciona el archivo y valida si es admitido.
   * @param event 
   */
  setFile(event: any) {
    let temp = <File>event.target.files[0];
    console.log("payload ", temp.name);
    console.log('size', temp.size);
    console.log('type', temp.type);
    switch (temp.type) {
      case "image/png":
        this.payload = <File>event.target.files[0];
        break;
      case "image/jpeg":
        this.payload = <File>event.target.files[0];
        break;
      case "image/jpg":
        this.payload = <File>event.target.files[0];
        break;
      default:
        console.log("Format error");
        //Aqui debe ir el modar de error de fomato
        this.abrirModalFormat();
        break;
    }
  }

  /**
   * Envia el archivo a la API.
   */
  uploadImage(): void {
    // TODO se mantiene esta id numerica por el momento, sustituir por la id de busqueda preferida
    this.userService.setProfileImage(this.idUser, this.payload).subscribe({
      next: (cita) => {
        console.info(cita)

      },
      error: (userData) => {
        console.log(userData)
      },
      complete: () => {
        console.info("Completo")
      }
    });
  }

  abrirModalFormat() {
    const modal = document.getElementById('formaterror');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  cerrarModalFormat() {
    const modal = document.getElementById('formaterror');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

  setDefaultImage() {
    this.userService.setDefaultProfileImage(this.idUser).subscribe({
      next: (cita: any) => {
        console.info(cita)
      },
      error: (error: any) => {
        console.log(error)
      },
      complete: () => {
        localStorage.removeItem("fileType");
      }
    });
  }

}
