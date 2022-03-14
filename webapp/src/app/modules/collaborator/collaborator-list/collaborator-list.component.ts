import { coerceStringArray } from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
  EventEmitter,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  Subject,
} from 'rxjs';
import { CollaboratorProvider } from 'src/providers/collaborator.provider';
import { CollaboratorCreateComponent } from '../collaborator-create/collaborator-create.component';
import { CollaboratorRegisterTabComponent } from '../collaborator-create/collaborator-register-tab/collaborator-register-tab.component';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { SnackBarService } from 'src/services/snackbar.service';
import { ICollaborator } from 'src/app/interfaces/icollaborator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-collaborator-list',
  templateUrl: './collaborator-list.component.html',
  styleUrls: ['./collaborator-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  @ViewChild('filter', { static: true }) filter!: ElementRef;
  private _unsubscribeAll: Subject<any>;

  displayedCollaborator: string[] = [
    'collaborator',
    'admissionDate',
    'office',
    'currentClient',
    'status',
    'icon',
  ];

  collaborators!: ICollaborator[];
  filteredCollaboratorList = new MatTableDataSource();
  index: any = null;
  Collaborator: any;
  step: number = 1;
  form!: FormGroup;

  constructor(
    private liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private collaboratorProvider: CollaboratorProvider,
    private snackbarService: SnackBarService,
    private dialogService: ConfirmDialogService,
    private fb: FormBuilder
  ) {
    this._unsubscribeAll = new Subject();
  }

  async ngOnInit(): Promise<void> {
    await this.getCollaboratorList();
    this.initFilter();
  
  }

  announceSortChange(sortState: any) {
    console.log(sortState);
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  createCollaborator() {
    this.router.navigate(['colaborador/novo']);
  }

  async deleteCollaborator(collaboratorId: any) {
    const options = {
      data: {
        title: 'Anteção',
        subtitle: 'Você tem certeza que deseja excluir este colaborador?',
      },
      panelClass: 'confirm-modal',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(async confirmed => {
      if (confirmed) {
        try {
          const collaborators = await this.collaboratorProvider.destroy(
            collaboratorId
          );
          this.getCollaboratorList();

          this.snackbarService.successMessage(
            'Colaborador Excluido Com Sucesso'
          );
        } catch (error) {
          console.log('ERROR 132' + error);
          this.snackbarService.showError('Falha ao Excluir');
          this.getCollaboratorList();
        }
      }
    });
  }

  async selectList(ev: any) {
    if (ev.value == 1) {
      return (this.filteredCollaboratorList = this.collaborators =
        await this.collaboratorProvider.findAll());
    }
    if (ev.value == 2) {
      return (this.filteredCollaboratorList = this.collaborators =
        await this.collaboratorProvider.findActive());
    }
    if (ev.value == 3) {
      return (this.filteredCollaboratorList = this.collaborators =
        await this.collaboratorProvider.findInactive());
    }
  }

  async getCollaboratorList() {
    this.filteredCollaboratorList.data = this.collaborators =
   
      await this.collaboratorProvider.findAll();
    this.filteredCollaboratorList.sort = this.sort;
  }

  initFilter() {
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(debounceTime(200), distinctUntilChanged())

      .subscribe((res) => {
        this.filteredCollaboratorList.data = this.collaborators.filter(
          (collaborator) =>
            collaborator.firstNameCorporateName
              .toLocaleLowerCase()
              .includes(this.filter.nativeElement.value.toLocaleLowerCase())
        );
      });
  }

  editCollaborator(collaboratorId: any) {
    this.router.navigate([`colaborador/${collaboratorId}`]);
  }
}
