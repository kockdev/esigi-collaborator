import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollaboratorEducationProvider } from 'src/providers/collaborator-providers/collaborator-education.provider';
import { ConfigProvider } from 'src/providers/config-provider';

@Component({
  selector: 'collaborator-education-dialog',
  templateUrl: 'collaborator-education-dialog.html',
  styleUrls: ['./collaborator-education-tab.component.scss'],
})
export class CollaboratorEducationDialog {
  @Input('form') collaboratorForm!: FormGroup;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  educationForm!: FormGroup;
  method!: string;
  collaboratorId!: string | null;
  educationId!: string | null;
  schooling: any[] = [];
  situation: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CollaboratorEducationDialog>,
    private collaboratorEducationProvider: CollaboratorEducationProvider,
    private configProvider: ConfigProvider,

    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getKeysCollaborator();
    this.method = sessionStorage.getItem('method')!;
    this.collaboratorId = sessionStorage.getItem('collaborator_id')!;
    this.initForm();
  }

  initForm(): void {
    this.educationForm = this.fb.group({
      schooling: ["", Validators.required],
      situation: ["", Validators.required],
      course: [null, [Validators.required, Validators.maxLength(100)]],
      institution: [null, [Validators.required, Validators.maxLength(100)]],
      Collaborator: { id: this.collaboratorId },
    });
    if (this.data) {
      this.educationForm.patchValue(this.data);
    }
  }


  async getKeysCollaborator() {
    let data = {
      key: ["schooling", "status_instruction"]
    }
    const arrays = await this.configProvider.findKeys('collaborator', data)

    const keyList = arrays.reduce(function (array: any, register: any) {
      array[register.key] = array[register.key] || [];
      array[register.key].push({ id: register.id, value: register.value });
      return array;
    }, Object.create(null));
    this.schooling = keyList['schooling'];
    this.situation = keyList['status_instruction']
  }

  ngAfterViewInit(): void { }

  onNoClick(): void {
    this.dialogRef.close();
    sessionStorage.removeItem('education_id');
    sessionStorage.removeItem('method');
  }

  async save() {
    const data = this.educationForm.getRawValue();
    if (this.method === 'add') {
      try {
        const education = await this.collaboratorEducationProvider.store(data);
        sessionStorage.setItem('education_id', education.id);
      } catch (error: any) {
        console.log(error);
      }
    }
    if (this.method === 'edit') {
      try {
        this.educationId = sessionStorage.getItem('education_id');
        const updateEducation = await this.collaboratorEducationProvider.update(
          this.educationId,
          data
        );
      } catch (error: any) {
        console.log(error);
      }
    }
  }

  close() {
    this.dialogRef.close();
    sessionStorage.clear;
  }
}
