import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitizenRepository } from 'src/domain/repositories/citizen.repository';
import { CitizenImplementationRepository } from './repositories/citizen-implementation.repository';
import { HttpClientModule } from '@angular/common/http';
import { CitizenUseCase } from 'src/domain/usecases/citizen.usecase';
import { SaveCitizenUseCase } from 'src/domain/usecases/saveCitizen.usecase';
import { UpdateCitizenUseCase } from 'src/domain/usecases/updateCitizen.usecase';
import { DeleteCitizenUseCase } from 'src/domain/usecases/deleteCitizen.usecase';

const CitizenCaseFactory = 
(citizenRepo: CitizenRepository) => new CitizenUseCase(citizenRepo);
export const citizenUseCaseProvider = {
    provide: CitizenUseCase,
    useFactory: CitizenCaseFactory,
    deps: [CitizenRepository],
};

const SaveCitizenCaseFactory = 
(saveCitizenRepo: CitizenRepository) => new SaveCitizenUseCase(saveCitizenRepo);
export const saveCitizenUseCaseProvider = {
    provide: SaveCitizenUseCase,
    useFactory: SaveCitizenCaseFactory,
    deps: [CitizenRepository],
};

const UpdateCitizenCaseFactory = 
(updateCitizenRepo: CitizenRepository) => new UpdateCitizenUseCase(updateCitizenRepo);
export const updateCitizenUseCaseProvider = {
    provide: UpdateCitizenUseCase,
    useFactory: UpdateCitizenCaseFactory,
    deps: [CitizenRepository],
};

const DeleteCitizenCaseFactory = 
(deleteCitizenRepo: CitizenRepository) => new DeleteCitizenUseCase(deleteCitizenRepo);
export const deleteCitizenUseCaseProvider = {
    provide: DeleteCitizenUseCase,
    useFactory: DeleteCitizenCaseFactory,
    deps: [CitizenRepository],
};
@NgModule({
  declarations: [],
  providers: [
    citizenUseCaseProvider,
    saveCitizenUseCaseProvider,
    updateCitizenUseCaseProvider,
    deleteCitizenUseCaseProvider,
    { provide: CitizenRepository, useClass: CitizenImplementationRepository }
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class DataModule { }
