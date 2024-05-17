export interface MeetingView {
    agenda: string
    created_at: string
    duration: number
    host_id: string
    id: number
    join_url: string
    pmi: string
    start_time: string
    timezone: string
    topic: string
    type: number
    uuid: string
  }


  export interface MeetingCreating {
        agenda: string
        duration: number
        password: string
        start_time: string
        timezone: string
        type: number
  }

  export interface MeetingAlumn {
      idMeeting: number
      process: boolean
      nameTeacher: string
      numberMeeting: number
      password: string
    }
    
  