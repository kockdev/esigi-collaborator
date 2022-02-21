import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-resume-skills-tab',
  templateUrl: './resume-skills-tab.component.html',
  styleUrls: ['./resume-skills-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResumeSkillsTabComponent implements OnInit {
  @Input('form') resumeForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('skillTable') skillTable!: MatTable<any>;

  displayedColumns: string[] = ['name', 'time', 'level', 'icon'];

  data: [] = [];

  selectedIndex: number = 0;
  skillForm!: FormGroup;
  index: any = null;
  Skill: any;
  checked = false;

  get skillArray() {
    return this.resumeForm.controls['Skills'] as FormArray;
  }

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.skillArray.value && this.skillArray.value.findIndex((skill: any) => skill == null) === -1) {
      this.data = this.skillArray.value;
    }

    this.initObservables();
  }

  initObservables() {
    this.skillArray.valueChanges.subscribe((res) => {
      const isNullIndex = this.skillArray.value.findIndex(
        (skill: any) => skill == null
      );
      if (isNullIndex !== -1) {
        this.skillArray.removeAt(isNullIndex);
      }
      if (res) {
        this.data = this.skillArray.value;
      }
    });
  }


  openDialog() {
    const dialogRef = this.dialog.open(ResumeSkillDialog, {
      width: '500px',
      height: '470px',
    });

    dialogRef.afterClosed().subscribe((skill) => {
      if (skill) {
        this.skillArray.insert(0, this.fb.group(skill));
        this.skillTable.renderRows();
      }
    });
  }

  next() {
    this.onChange.next(true);
  }

  getSkill(skillSelected: any, index: number) {
    const dialogRef = this.dialog.open(ResumeSkillDialog, {
      width: '500px',
      height: '620px',
      data: { skillSelected },
    });

    this.index = index;
    dialogRef.afterClosed().subscribe((skill) => {
      this.skillArray.controls[this.index].setValue(skill);
    });
  }

  deleteSkill(index: number) {
    this.skillArray.removeAt(index);
  }
}

@Component({
  selector: 'resume-skill-dialog',
  templateUrl: 'resume-skill-dialog.html',
  styleUrls: ['./resume-skills-tab.component.scss'],
})
export class ResumeSkillDialog {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  skillForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ResumeSkillDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { skillSelected: any }
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.skillForm = this.fb.group({
      technology: ['Angular', [Validators.required, Validators.maxLength(50)]],
      seniority: [1, Validators.required],
      yearsExperience: ['2', [Validators.required, Validators.maxLength(2)]],
      currentPosition: [true, Validators.required],
    });
    if (this.data && this.data.skillSelected) {
      this.skillForm.patchValue(this.data.skillSelected);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.skillForm.getRawValue());
  }
}
