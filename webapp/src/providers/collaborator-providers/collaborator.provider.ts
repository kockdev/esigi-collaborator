import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiGateway } from 'src/api-gateway';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CollaboratorProvider {
  constructor(private apiGateway: ApiGateway) { }

  ngOnInit(): void { }

  findAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.COLLABORATOR_MS + 'collaborators')
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  findInactive(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.COLLABORATOR_MS + 'collaborators/list/inactive')
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }
  findGerente(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.COLLABORATOR_MS + 'collaborators/list/gerente')
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  findEvaluator(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.COLLABORATOR_MS + 'collaborators/list/evaluator')
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  findTechRecruter(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.COLLABORATOR_MS + 'collaborators/list/tech-recruter')
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  findActive(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.COLLABORATOR_MS + 'collaborators/list/active')
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  findByName(firstNameCorporateName?: string, inactive?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway.get(environment.COLLABORATOR_MS + `collaborators/find/name?` + firstNameCorporateName + '&' + inactive)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  findByNameGerente(query: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway.get(environment.COLLABORATOR_MS + `collaborators/find/name/gerente?${query}`)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  findByTechRecruter(query: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway.get(environment.COLLABORATOR_MS + `collaborators/find/name/tech-recruter?${query}`)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  findByNameEvaluator(query: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway.get(environment.COLLABORATOR_MS + `collaborators/find/name/gerente/desenvolvedor?${query}`)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  findOne(id: string | null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.COLLABORATOR_MS + 'collaborators/:id', { id: id })
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  shortListCollaborators(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.COLLABORATOR_MS + 'collaborators/short/list/collaborators')
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  update(id: string | null, collaborator: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .put(
          environment.COLLABORATOR_MS + 'collaborators/:id',
          { id: id },
          collaborator
        )
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  store(collaborator: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .post(environment.COLLABORATOR_MS + 'collaborators', collaborator)

        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  destroy(collaboratorId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .delete(environment.COLLABORATOR_MS + 'collaborators/' + collaboratorId)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }
}
