import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TuiDialogService } from '@taiga-ui/core';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaveListComponent implements OnChanges {
  @Input() ID!: string;
  @Input() type!: any;
  @Input() leaves!:any;
  @Output() update = new EventEmitter();
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns!: string[];

  constructor(
    private db: FirebaseService,
    private readonly dialogs: TuiDialogService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {    
    if (this.type == 'pending') {
      this.displayedColumns = ['type', 'reason', 'from', 'to', 'action'];
      this.loadLeaves(this.type);
    } else {
      this.displayedColumns = ['type', 'reason', 'from', 'to', 'status'];
      this.loadLeaves('');
    }
  }

  /**
   * Function to load leaves
   * @param type
   */
  loadLeaves(type: string) {

        if(type == 'pending'){
          this.leaves = this.leaves.filter((obj:any)=>obj.status == 'pending')    
          this.dataSource = new MatTableDataSource(this.leaves);
          this.dataSource.sort = this.sort;
        }
        else {
          this.leaves = this.leaves.filter((obj:any)=>obj.status != 'pending')         
          this.dataSource = new MatTableDataSource(this.leaves);
          this.dataSource.sort = this.sort;
        }


  }

  /**
   * Tui dialog component
   */
  showDialog(content: any): void {
    this.dialogs.open(content).subscribe();
  }

  /**
   * Function to delete particular leave
   * @param key
   */
  onDelete(key: any) {
    this.db.deleteLeave(this.ID, key).subscribe((res) => {
      this.loadLeaves(this.type);
      this.update.emit()
    });
  }
}
