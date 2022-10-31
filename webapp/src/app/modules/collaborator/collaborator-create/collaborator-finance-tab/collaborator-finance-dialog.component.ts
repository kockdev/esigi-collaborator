import { formatDate } from '@angular/common';
import {
  Injectable,
  Component,
  Input,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import {
  NativeDateAdapter,
  DateAdapter,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateValidator } from 'src/app/validators/date.validator';
import { DocumentValidator } from 'src/app/validators/document.validator';
import { CollaboratorFinanceProvider } from 'src/providers/collaborator-providers/collaborator-finance.provider';
import { CollaboratorProvider } from 'src/providers/collaborator-providers/collaborator.provider';

export const PICK_FORMATS = {
  parse: { dateInput: { month: 'numeric', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'numeric', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'numeric' },
  },
};

@Injectable()
export class PickDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'dd-MM-yyyy', this.locale);
    } else {
      return date.toDateString();
    }
  }
}
@Component({
  selector: 'collaborator-finance-dialog',
  templateUrl: 'collaborator-finance-dialog.html',
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
  ],
})
export class CollaboratorFinanceDialog {
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  financeForm!: FormGroup;
  collaboratorId!: string | null;
  Date: any;
  method!: string | null;
  financeId!: string | null;
  typeOfContract!: any;
  type!: any;

  constructor(
    public dialogRef: MatDialogRef<CollaboratorFinanceDialog>,
    private fb: FormBuilder,
    private collaboratorFinanceProvider: CollaboratorFinanceProvider,
    private collaboratorProvider: CollaboratorProvider,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  async ngOnInit() {
    this.method = sessionStorage.getItem('method')!;
    this.type = Number(sessionStorage.getItem('type'));
    this.collaboratorId = sessionStorage.getItem('collaborator_id')!;
    console.log('teste ' + this.type)
    this.initForm();
  }

  initForm(): void {
    this.financeForm = this.fb.group({
      dateInclusion: this.fb.control({ value: new Date().toLocaleDateString(), disabled: true }, [DateValidator.isValidData(), Validators.required]),
      contractType: [{value: this.type, disabled: true}],
      reason: [null, Validators.required],
      value: ['', Validators.required],
      payday: this.fb.control({ value: ' ', disabled: false }, [DateValidator.isValidData(), DateValidator.isDateGreaterThanToday(), Validators.required]),
      Collaborator: { id: this.collaboratorId },
    });
    if (this.data) {
      this.financeForm.patchValue(this.data);
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
    sessionStorage.removeItem('finance_id');
    sessionStorage.removeItem('method');
  }


  async save() {
    const data = this.financeForm.getRawValue();
    if (this.method === 'add') {
      try {
        const finance = await this.collaboratorFinanceProvider.store(data);
        sessionStorage.setItem('fnance_id', finance.id);
      } catch (error: any) {
        console.log('ERROR 132' + error);
      }
    }
    if (this.method === 'edit') {
      try {
        this.financeId = sessionStorage.getItem('fnance_id');
        const updateFinance = await this.collaboratorFinanceProvider.update(
          this.financeId,
          data
        );
      } catch (error: any) {
        console.log('ERROR 132' + error);
      }
    }
  }

  close() {
    this.dialogRef.close();
    sessionStorage.clear;
  }
}
