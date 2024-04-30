export interface courseI {
 
    className: string,
    description: string,
 
}

export interface course {
    idCourse: number
    name: string
    description: string
    startDate: string
    finishDate: string
    pago: number
  }

  
  export interface lessonPostI {
    name: string
    contenido: string
    description: string
  }