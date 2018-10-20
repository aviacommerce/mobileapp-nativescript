import { Injectable } from "@angular/core";
import { CJsonApi } from "../models/jsonapi";

@Injectable({
  providedIn: "root"
})
export class JsonApiParserService {

  constructor() { }

  parseSingleObj(data): Object {
    return Object.assign(new CJsonApi(), data).toModel();
  }

  parseArrayofObject(array): Array<Object> {
    return array.map(
      (obj) => Object.assign(new CJsonApi(), obj).toModel()
    );
  }
}
