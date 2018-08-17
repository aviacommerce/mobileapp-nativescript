import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs";

@Injectable()
export class TaxonomyService {
  private serverUrl = "https://httpbin.org/get";

  constructor(private http: HttpClient) { }

  getData() {
    const headers = this.createRequestHeader();

    return this.http.get(this.serverUrl, { headers });
  }

  getResponseInfo() {
    const headers = this.createRequestHeader();

    return this.http.get(this.serverUrl, { headers });
  }
  getTaxonomies(): any {
    return this.http.get<Array<any>>(`https://ofypets.indiepet.co.in/api/v1/taxonomies?set=nested`);
  }

  getProducts(pageNumber: 1) {
    return this.http.get(`https://ofypets.indiepet.co.in/api/v1/products?page=${pageNumber}&per_page=5`);
  }
  getProductDetail(id: string) {
    return this.http.get(`https://ofypets.indiepet.co.in/api/v1/products/${id}?data_set=large`);
  }

  private createRequestHeader() {
    // set headers here e.g.
    const headers = new HttpHeaders({
      AuthKey: "my-key",
      AuthToken: "my-token",
      "Content-Type": "application/json"
    });

    return headers;
  }
}
