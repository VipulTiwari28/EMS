import { Component, Inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TuiAlertService, TuiDialogService } from '@taiga-ui/core';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss'],
})
export class ListEmployeesComponent {
  users: any;
  dataSource!: MatTableDataSource<any>;
  load = false;
  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    private fb: FirebaseService,
    private alerts: TuiAlertService
  ) {
    this.loadUsers();
  }

  displayedColumns: string[] = ['id', 'name', 'email', 'position', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  /**
   * Function to apply filter in material table
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 /**
  * Function to load users
  */
  loadUsers() {
    this.load = true;
    this.fb.getUsers().subscribe((users: any) => {
      let employees = Object.values(users).filter(
        (user: any) => user.role != 'admin' && user.deleted != true
      );
      this.dataSource = new MatTableDataSource(employees);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.load = false;
    });
  }
  /**
   * Function to delete a user
   * @param id 
   */
  deleteUser(id: string) {
    this.fb.deleteUserById(id).subscribe((data: any) => {
      this.deleteAlert(id);
    });
  }
  /**
   * Tui dialog component function
   * @param content 
   */
  showDialog(content: any): void {
    this.dialogs.open(content).subscribe();
  }
  /**
   * Tui alert component for deleting user
   */
  deleteAlert(id: string): void {
    this.alerts
      .open(`Deleted user with id ${id}`, { label: 'Success' })
      .subscribe();
    this.loadUsers();
  }
  /**
   * Tui alert component for adding user
   */
  addAlert(type:string) {
    if (type == 'add'){
      this.alerts.open(`Added new user`, { label: 'Success' }).subscribe();
    }else {
      this.alerts.open(`Updated user`, { label: 'Success' }).subscribe();
    }
    this.loadUsers();
  }
}
