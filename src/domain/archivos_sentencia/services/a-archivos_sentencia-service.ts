/** Clase absatracta que viene hacer los casos de uso y que varias apis puedan utilizar los casoos de usos */

import { Observable } from "rxjs";

export abstract class ARepositoryService {
  public abstract uploadFile(file: File, path: string): Observable<string>;
  public abstract getFile(filePath: string): Observable<Blob>;
}