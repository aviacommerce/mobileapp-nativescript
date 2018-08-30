import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs";

@Injectable()
export class TaxonomyService {
	private serverUrl = "https://httpbin.org/get";

	constructor(private http: HttpClient) { }

	getTaxonomies(): any {
		return this.http.get<Array<any>>(`https://app.ofypets.com/api/v1/taxonomies?set=nested`);
	}

	getProducts(pageNumber: 1) {
		return this.http.get(`https://app.ofypets.com/api/v1/products?page=${pageNumber}&per_page=20`);
	}
	getProductDetail(id: string) {
		return this.http.get(`https://app.ofypets.com/api/v1/products/${id}?data_set=large`);
	}
}
