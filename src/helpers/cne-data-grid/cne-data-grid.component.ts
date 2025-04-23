import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Caption {
  field: string;
  name: string;
  isEditing: boolean;
  isVisible: boolean;
}

@Component({
  selector: 'cne-data-grid',
  templateUrl: './cne-data-grid.component.html',
  styleUrls: ['./cne-data-grid.component.scss']
})
export class CneDataGridComponent {

  loadPanelPosition = { of: '#gridContainer' };

  @Input()
  dataSource: any[] = [];

  @Input()
  keyExpr: string = '';

  @Input()
  enabled: boolean = true;

  @Input()
  columns: Caption [] = [];

  @Input()
  mode:string = "single";

  @Input()
  pageSize: number= 5

  @Input()
  editMode: string= 'popup';

  @Input()
  allowUpdating: boolean = true;

  @Input()
  allowAdding: boolean = true;

  @Input()
  allowDeleting: boolean = true;

  @Input()
  useIcons: boolean = true;

  @Input()
  titleEditPopUp: string= 'Editing fields'

  @Input()
  isLoading: boolean = false;

  @Output()
  onSelectionChanged = new EventEmitter<any>();

  public onSelectionChangedLibrary(valor: any[]) {
    this.onSelectionChanged.emit(valor);
  }

  @Output()
  onSaving= new EventEmitter<any>();
  public onSavingLibrary(valor: any) {
    this.onSaving.emit(valor);
  }

}
