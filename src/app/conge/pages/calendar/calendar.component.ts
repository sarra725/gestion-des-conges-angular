import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CalendarOptions, EventApi, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { LeaveService } from '../../services/leave.service';
import { LocalService } from '../../services/local.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
  calendarVisible = true;
  DATA_EVENTS: EventInput[] = []
  calendarOptions: CalendarOptions = {}
  currentEvents: EventApi[] = [];

  constructor(private changeDetector: ChangeDetectorRef, private listLeaveService: LeaveService, private localStorage: LocalService, private datepipe: DatePipe) {
  }
  ngOnInit(): void {
    if (this.localStorage.getData("role") == "USER") {
      this.listLeaveById();
    } else {
      this.listAllLeave();
    }
   
    this.calendarOptions = {
      plugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
      ],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialView: 'dayGridMonth',
      events:this.DATA_EVENTS,
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
    };
  }

  public listLeaveById() {
    this.listLeaveService.getAllCongeByIdUser(this.localStorage.getData("id")).subscribe(
      (data: any) => {
        console.log("data ",data);
        if (data) {
          for (let item of data) {
            let str_date = this.datepipe.transform(this.convertToDate(item.date_debut), 'yyyy-MM-dd');
            let end_date = this.datepipe.transform(this.convertToDate(item.date_fin), 'yyyy-MM-dd');
            let eventGuid = 0;
            
            if (item.response == "accepted") {
              this.DATA_EVENTS.push({
                id: String(eventGuid ++),
                title: 'Congé de ' + item.employee.employeename,
                start: str_date + 'T12:00:00',
                end: end_date + 'T15:00:00',
                className:"bg-success text-center"
              }
              )
            }
           
          }
        }
      }
    )
  }
  public listAllLeave() {
    this.listLeaveService.getAllConge().subscribe(
      (data: any) => {
        if (data) {
          for (let item of data) {
            let str_date = this.datepipe.transform(this.convertToDate(item.date_debut), 'yyyy-MM-dd');
            let end_date = this.datepipe.transform(this.convertToDate(item.date_fin), 'yyyy-MM-dd');
            let eventGuid = 0;
            if (item.response == "accepted") {
              this.DATA_EVENTS.push({
                id: String(eventGuid ++),
                title: 'Congé de ' + item.employee.employeename,
                start: str_date + 'T12:00:00',
                end: end_date + 'T15:00:00',
                className:"bg-success text-center"
              }
              )
            }
          }
        }
  
      })

  }
  convertToDate(dateString: any) {
    //  Convert a "dd/MM/yyyy" string into a Date object
    let d = dateString.split("/");
    let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
    return dat;
  }
}
