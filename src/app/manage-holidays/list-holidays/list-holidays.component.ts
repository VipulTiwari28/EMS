import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject } from '@angular/core';
import { TuiAlertService, TuiDialogService } from '@taiga-ui/core';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';

@Component({
  selector: 'app-list-holidays',
  templateUrl: './list-holidays.component.html',
  styleUrls: ['./list-holidays.component.scss'],
})
export class ListHolidaysComponent {
  loader = false;
  holidays: any;
  cache: any;
  today = Date.now();
  filterText: any;
  asc = false;
  constructor(
    private fb: FirebaseService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService
  ) {
    this.loadHolidays();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.holidays, event.previousIndex, event.currentIndex);
  }

  upcomingDate(dateString: string) {
    const currentYear = new Date().getFullYear();
    const [year, month, day] = dateString.split('-');
    const formattedDate = new Date(
      currentYear,
      parseInt(month) - 1,
      parseInt(day)
    );
    return formattedDate > new Date();
  }

  showDialog(content: any): void {
    this.dialogs.open(content).subscribe();
  }

  addAlert() {
    this.alerts.open(`Updated Holiday`, { label: 'Success' }).subscribe();
    this.loadHolidays();
  }

  filterHolidays(filtertext: string) {
    this.loader = true;
    let value = filtertext;
    if (value != '') {
      this.holidays = this.holidays.filter((obj: any) =>
        obj.name.toLowerCase().includes(value.toLowerCase())
      );
      this.loader = false;
    } else {
      this.holidays = this.cache;
      this.loader = false;
    }
  }

  sortHolidays() {
    if (this.asc) {
      this.asc = false;
      this.holidays = this.holidays.sort((a: any, b: any) => {
        if (b.name < a.name) return -1;
        if (b.name > a.name) return 1;

        return 0;
      });
    } else {
      this.asc = true;
      this.holidays = this.holidays.sort((a: any, b: any) => {
        if (a.name < b.name) return -1;
        if (b.name > a.name) return 1;

        return 0;
      });
    }
  }

  loadHolidays() {
    let arr: any[] = [];
    this.loader = true;
    this.fb.getHolidays().subscribe((holidays: any) => {
      Object.keys(holidays).forEach((key: any) => {
        arr.push({ ...holidays[key], key });
      });
      this.holidays = arr;
      this.cache = arr;
      this.asc = false;
      this.sortHolidays();
      this.loader = false;
    });
  }
}
