import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BreakpointsService } from 'src/app/services/breakpoint.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  $bp!: Observable<string>;
  constructor(
    private breakpointService: BreakpointsService,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string
  ) {}

  ngOnInit(): void {
    this.$bp = this.breakpointService.breakpoint$;
  }

  onDeleteInvoice() {
    this.dialogRef.close(this.id);
  }

  onClose() {
    this.dialogRef.close();
  }
}

export function openConfirmDialog(dialog: MatDialog, id: string) {
  const config = new MatDialogConfig();

  config.panelClass = 'dialog-popup';
  config.backdropClass = 'dialog-popup-backdrop';
  config.data = id;

  const dialogRef = dialog.open(ConfirmDialogComponent, config);

  return dialogRef.afterClosed();
}
