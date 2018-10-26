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

  success: any;
  error: any;

  constructor(
    private http: HttpClient,
    private apiParser: JsonApiParserService) { }

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
        `api/v1/products?q[s]=updated_at+desc&page=${pageNumber}&per_page=40&data_set=small`
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

  getTaxonomies(): Observable<Array<Taxonomy>> {
    return this.http.get<Array<Taxonomy>>(`api/v1/taxonomies?set=nested`);
  }

  getProductsByTaxon(id: string): Observable<{ pagination: object, products: Array<Product> }> {
    return this.http
      .get<{ data: Array<CJsonApi>; pagination: object }>(
        `api/v1/taxons/products?id=${id}&per_page=20&data_set=small`
      )
      .pipe(
        map((resp) => {
          return {
            pagination: resp.pagination,
            products: this.apiParser.parseArrayofObject(resp.data) as Array<Product>
          };
        })
      );
  }
}
