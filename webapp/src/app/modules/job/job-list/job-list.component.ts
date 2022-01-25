import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  fromEvent,
  takeUntil,
  debounceTime,
  distinctUntilChanged,
  Subject,
} from 'rxjs';
import { JobProvider } from 'src/providers/job.provider';

export interface Job {
  jobName: string;
  client: string;
  requester: string;
}

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobListComponent implements OnInit {
  // @ViewChild('filter', { static: true }) filter!: ElementRef;
  // private _unsubscribeAll: Subject<any>;
  displayedJob: string[] = ['jobName', 'client', 'requester'];
  jobs!: Job[];
  // filteredJobList!: Job[];

  constructor(private router: Router, private jobProvider: JobProvider) {
    // this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.getJobList();
    // this.initFilter();
    // this.filteredJobList = this.jobs;
  }

  createJob() {
    this.router.navigate(['vaga/novo']);
  }

  async getJobList() {
    try {
      this.jobs = await this.jobProvider.findAll();
    } catch (error) {
      console.error(error);
    }
  }

  // initFilter() {
  //   fromEvent(this.filter.nativeElement, 'keyup')
  //     .pipe(
  //       takeUntil(this._unsubscribeAll),

  //       debounceTime(200),

  //       distinctUntilChanged()
  //     )

  //     .subscribe((res) => {
  //       this.filteredJobList = this.jobs.filter(
  //         (job) =>
  //           job.jobName

  //             .toLowerCase()

  //             .startsWith(this.filter.nativeElement.value) ||
  //           job.jobName

  //             .toUpperCase()

  //             .startsWith(this.filter.nativeElement.value) ||
  //           job.jobName.endsWith(this.filter.nativeElement.value) ||
  //           job.jobName.toUpperCase().endsWith(this.filter.nativeElement.value)
  //       );
  //     });
  // }
}
