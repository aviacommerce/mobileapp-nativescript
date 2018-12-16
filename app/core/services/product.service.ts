import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Product } from "../models/product";
import { CJsonApi } from "./../models/jsonapi";
import { Taxonomy } from "./../models/taxonomy";
import { JsonApiParserService } from "./json-api-parser.service";

@Injectable()
export class ProductService {

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

  getProductsByKeyword(keywords: any): Observable<{ pagination: object, products: Array<Product> }> {
    return this.http
      .get<{ data: Array<CJsonApi>; pagination: object }>(`api/v1/products?per_page=20&data_set=small`,
        { params: keywords })
      .pipe(
        map((resp) => {

          return {
            pagination: resp.pagination,
            products: this.apiParser.parseArrayofObject(resp.data) as Array<Product>
          };
        })
      );
  }

  getTaxonomies(): Observable<Array<Taxonomy>> {
    return this.http.get<Array<Taxonomy>>(`api/v1/taxonomies?set=nested`);
  }

  getProductsByTaxon(searchParams: HttpParams): Observable<{ pagination: object, products: Array<Product> }> {
    return this.http
      .get<{ data: Array<CJsonApi>; pagination: object }>(
        `api/v1/taxons/products?per_page=20&data_set=small`, { params: searchParams }
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

  getProductsByTaxonNP(id: string): Observable<Array<Product>> {
    return this.http
      .get<{ data: Array<CJsonApi> }>(
        `api/v1/taxons/products?id=${id}&per_page=20&data_set=small`
      )
      .pipe(
        map((resp) => this.apiParser.parseArrayofObject(resp.data) as Array<Product>)
      );
  }

  getTaxonByName(name: string): Observable<Array<Taxonomy>> {
    return this.http.get<Array<Taxonomy>>(
      `api/v1/taxonomies?q[name_cont]=${name}&set=nested&per_page=2`
    );
  }
}
