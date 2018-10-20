import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Product } from "../models/product";
import { CJsonApi } from "./../models/jsonapi";
import { Taxonomy } from "./../models/taxonomy";
import { JsonApiParserService } from "./json-api-parser.service";

@Injectable()
export class ProductService {
	/**
	 * Creates an instance of ProductService.
	 * @param {HttpService} http
	 *
	 * @memberof ProductService
	 */
  constructor(
    private http: HttpClient,
    private apiParser: JsonApiParserService

  ) { }
  // tslint:disable-next-line:member-ordering
  success: any;
  // tslint:disable-next-line:member-ordering
  error: any;
	/**
	 *
	 *
	 * @param {string} id
	 * @returns {Observable<Product>}
	 *
	 * @memberof ProductService
	 */

  getProduct(id: string): Observable<Product> {
    return this.http
      .get<{ data: CJsonApi }>(
        `api/v1/products/${id}?data_set=large`
      )
      .pipe(
        map((resp) => {
          const product = this.apiParser.parseSingleObj(resp.data) as Product;

          return product;
        })
      );
  }

  getProducts(pageNumber: number): Observable<Array<Product>> {
    return this.http
      .get<{ data: Array<CJsonApi> }>(
        `api/v1/products?q[s]=avg_rating+desc&page=${pageNumber}&per_page=20&data_set=small`
      )
      .pipe(
        map(
          (resp) => this.apiParser.parseArrayofObject(resp.data) as Array<Product>
        )
      );
  }

  getproductsByKeyword(keyword: string): Observable<any> {
    return this.http
      .get(
        `api/v1/products?${keyword}&per_page=20&data_set=small`
      );
  }

  getProductDetail(id: string): Observable<Product> {
    return this.http.get<Product>(`api/v1/products/${id}?data_set=large`);
  }

  getRelatedProducts(productId: number): Observable<Array<Product>> {
    return this.http
      .get<Array<Product>>(`api/products/${productId}/relations`);
  }

  getProductReviews(products): Observable<any> {
    return this.http.get(`products/${products}/reviews`);
  }

  submitReview(productId: any, params: any) {
    return this.http.post(`products/${productId}/reviews`, params).pipe(
      map(
        (success) => {
          this.success = success;
          if (this.success.type === "info") {
            return this.success.type;
          } else {
            return this.success.type;
          }
        },
        (error) => {
          this.error = error;

          return this.error.type;
        }
      )
    );
  }

  getTaxonomies(): Observable<Array<Taxonomy>> {
    return this.http.get<Array<Taxonomy>>(`api/v1/taxonomies?set=nested`);
  }
}
