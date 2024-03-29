import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { JobProvider } from 'src/providers/job.provider';

export interface Knowledge {
  name: string;
  yearsExperience: number;
  typeOfPeriod: number;
}

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobCreateComponent implements OnInit {
  @ViewChild('knowledgeTable') knowledgeTable!: MatTable<any>;

  displayedColumns: string[] = [
    'name',
    'yearsExperience',
    'typeOfPeriod',
    'icon',
  ];

  get knowledgeArray() {
    return this.jobForm.controls['Knowledges'] as FormArray;
  }

  jobForm!: FormGroup;
  step: number = 1;
  selectedIndex: number = 0;
  disable = false;
  checked = false;

  index: any = null;
  Knowledge: any;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private jobProvider: JobProvider,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.jobForm = this.fb.group({
      requester: [
        'Wellington',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100),
        ],
      ],
      status: [1, Validators.required],
      publish: [false],
      client: [
        'Ambev',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      typeOfJob: [1, Validators.required],
      temporary: [false],
      monthTime: ['', Validators.required],
      jobName: [
        'Programador React',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
        ],
      ],
      startForecast: [new Date(), Validators.required],
      jobNumber: [
        1,
        [Validators.required, Validators.max(10), Validators.min(1)],
      ],
      typeOfContract: [1, Validators.required],
      workplace: [1, Validators.required],
      workingDay: ['2 horas', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      minimumValue: [1, Validators.required],
      maximumValue: [1, Validators.required],
      openingDate: [new Date(), Validators.required],
      schooling: [1, Validators.required],
      collaboratorActivities: ['a', Validators.required],
      skills: ['a', Validators.required],
      attitudes: ['a', Validators.required],
      Languages: this.fb.group({
        languageName: ['Russo',[Validators.required, Validators.maxLength(20)]],
        degreeOfInfluence: [1, Validators.required],
      }),
      Seniorities: this.fb.group({
        intern: [false],
        junior: [false],
        pleno: [false],
        senior: [false],
      }),
      Knowledges: this.fb.array([]),
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(JobDialogSkill, {
      width: '450px',
      height: '200px',
    });

    dialogRef.afterClosed().subscribe((knowledge) => {
      this.knowledgeArray.insert(0, this.fb.group(knowledge)),
        this.knowledgeTable.renderRows();
    });
  }

  nextStep() {
    if (this.selectedIndex != 1) {
      this.selectedIndex = this.selectedIndex + 1;
    }
  }

  previousStep() {
    if (this.selectedIndex != 0) {
      this.selectedIndex = this.selectedIndex - 1;
    }
  }

  async saveJob() {
    let data = this.jobForm.getRawValue();
    console.log(
      '🚀 ~ file: job-create.component.ts ~ line 84 ~ JobCreateComponent ~ saveCustomer ~ data',
      data
    );

    try {
      const jobs = await this.jobProvider.store(data);
    } catch (error) {
      console.log('ERROR 132' + error);
    }
  }

  deleteKnowledge(index: number) {
    this.knowledgeArray.removeAt(index);
  }

  listJob(){
    this.router.navigate(['vaga/lista'])
  }
}

@Component({
  selector: 'job-dialog-skill',
  templateUrl: 'job-dialog-skill.html',
})
export class JobDialogSkill implements OnInit {
  @Input('form') jobForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  knowledgeForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<JobDialogSkill>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  initForm(): void {
    this.knowledgeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      yearsExperience: [1, Validators.required],
      typeOfPeriod: [1, Validators.required],
    });
  }

 async saveKnowledge() {
    this.dialogRef.close(this.knowledgeForm.getRawValue());
  }
}
