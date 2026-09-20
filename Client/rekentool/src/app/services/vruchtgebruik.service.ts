import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { VruchtgebruikRequest } from "../models/vruchtgebruik-request";
import { VruchtgebruikResponse } from "../models/vruchtgebruik-response";
import { Observable } from "rxjs";
import { environment } from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class VruchtgebruikService {

  private readonly apiUrl = `${environment.apiUrl}/Vruchtgebruik`;
  private readonly http = inject(HttpClient);

  constructor() {}

  calculate(request: VruchtgebruikRequest): Observable<VruchtgebruikResponse> {
    return this.http.post<VruchtgebruikResponse>(
      this.apiUrl,
      request
    );
  }
}
