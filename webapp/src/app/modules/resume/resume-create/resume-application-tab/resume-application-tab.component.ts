import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent, Subject } from 'rxjs';
import { JobProvider } from 'src/providers/job.provider';

export interface Application {
  jobName: string;
  client: string;
  applicationDate: string;
  returnDate: string;
  status: string;
  responsible: string;
}

@Component({
  selector: 'app-resume-application-tab',
  templateUrl: './resume-application-tab.component.html',
  styleUrls: ['./resume-application-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResumeApplicationTabComponent implements OnInit {
  @Input('form') resumeForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  private _unsubscribeAll: Subject<any>;

  // dataSource: Application[] = [
  //   {
  //     jobName: 'C#',
  //     client: 'Ambev',
  //     applicationDate: '03/01/2020',
  //     returnDate: '22/02/2020',
  //     status: 'Reprovado',
  //     responsible: 'Wellington Almeida',
  //   },
  // ];

  displayedApplication: string[] = [
    'jobName',
    'client',
    'applicationDate',
    'returnDate',
    'status',
    'responsible',
  ];

  applications!: Application[];

  filteredApplicationList!: any[];

  applicationForm!: FormGroup;

  constructor(private jobProvider: JobProvider) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.getApplications();
  }

  async getApplications() {
    try {
      this.filteredApplicationList = this.applications =
        await this.jobProvider.findAll();
    } catch (error) {
      console.error(error);
    }
  }

  initFilter() {
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(debounceTime(200), distinctUntilChanged())

      .subscribe((res) => {
        this.filteredApplicationList = this.applications.filter(
          (collaborator) =>
            collaborator.jobName
              .toLocaleLowerCase()
              .includes(this.filter.nativeElement.value.toLocaleLowerCase())
        );
      });
  }
}