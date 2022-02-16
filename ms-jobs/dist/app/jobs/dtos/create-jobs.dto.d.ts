import { BehaviroalInterviewsEntity } from 'src/app/behavioral-interviews/behavioral-interviews.entity';
import { ClientInterviewsEntity } from 'src/app/client-interviews/client-interviews.entity';
import { KnowledgesEntity } from 'src/app/knowledges/knowledges.entity';
import { LanguagesEntity } from 'src/app/languages/languages.entity';
import { SenioritiesEntity } from 'src/app/seniorities/seniorities.entity';
import { TechnicalInterviewsEntity } from 'src/app/technical-interviews/technical-interviews.entity';
import { Schooling } from './schooling.enum';
import { Status } from './status.enum';
import { Type } from './type.enum';
import { TypeOfContract } from './typeOfContract.enum';
import { Workplace } from './workplace.enum';
export declare class CreateJobsDto {
    requester: string;
    status: Status;
    publish: boolean;
    client: string;
    typeOfJob: Type;
    temporary: boolean;
    monthTime: string;
    jobName: string;
    startForecast: Date;
    jobNumber: number;
    typeOfContract: TypeOfContract;
    workplace: Workplace;
    workingDay: string;
    minimumValue: number;
    maximumValue: number;
    schooling: Schooling;
    collaboratorActivities: string;
    Knowledges: KnowledgesEntity[];
    skills: string;
    attitudes: string;
    openingDate: Date;
    Seniorities: SenioritiesEntity;
    Languages: LanguagesEntity[];
    behaviorInterviews: BehaviroalInterviewsEntity[];
    clientInterviews: ClientInterviewsEntity[];
    technicalInterviews: TechnicalInterviewsEntity[];
}
