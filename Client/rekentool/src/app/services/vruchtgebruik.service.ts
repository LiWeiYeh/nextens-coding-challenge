import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { VruchtgebruikRequest } from "../models/vruchtgebruik-request";
import { VruchtgebruikResponse } from "../models/vruchtgebruik-response";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VruchtgebruikService {

  private readonly apiUrl = 'https://localhost:7122/api/Vruchtgebruik';
  private readonly http = inject(HttpClient);

  constructor() {}

  calculate(request: VruchtgebruikRequest): Observable<VruchtgebruikResponse> {
    return this.http.post<VruchtgebruikResponse>(
      this.apiUrl,
      request
    );
  }
}
