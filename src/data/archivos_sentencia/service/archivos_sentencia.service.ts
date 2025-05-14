import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from "src/environments/environment.development";
import { ARepositoryService } from 'src/domain/archivos_sentencia/services/a-archivos_sentencia-service';

@Injectable({ providedIn: 'root' })
export class RepositoryService extends ARepositoryService {
  private baseUrl: string = environment.apiFileServer;

  constructor(private http: HttpClient) {
    super();
  }

  public uploadFile(file: File, path: string): Observable<string> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('path', path);

    return this.http.post<{ uri: string }>(`${this.baseUrl}/Save`, formData).pipe(
      map(response => response.uri)
    );
  }

  public getFile(filePath: string): Observable<Blob> {
    const params = new HttpParams().set('file', filePath);
    return this.http.get(`${this.baseUrl}/Get`, { params, responseType: 'blob' });
  }
}