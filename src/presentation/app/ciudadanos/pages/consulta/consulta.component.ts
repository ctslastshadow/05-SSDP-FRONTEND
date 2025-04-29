import { Component } from '@angular/core';
import { AlertsService } from 'src/base/alerts.service';
import { LoaderService } from 'src/base/loader.service';
import { IGetSentenciasRegistroViewModel } from 'src/domain/consJudicatura/viewModels/i-sentencias.viewModel';
import { GetCJudicaturaUseCase } from 'src/domain/consJudicatura/useCases/get-consJudicatura.useCase';
@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent {
  cedula: string = '';
  resultado: any = null;
  displayedColumns: string[] = ['campo1', 'campo2']; 

  public dataJudicatura: any[] = [];

  constructor(
    private alerts: AlertsService,
    public loader: LoaderService,
    private _getCJudicaturaUseCase: GetCJudicaturaUseCase
  ) {}



}