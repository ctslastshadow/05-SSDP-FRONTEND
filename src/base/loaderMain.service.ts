import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({ providedIn: 'root' }) 
export class LoaderMainService {
    
public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

 display(value: boolean): void {
    this.status.next(value);
}
}