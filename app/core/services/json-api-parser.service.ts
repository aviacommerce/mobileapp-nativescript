import { Injectable } from "@angular/core";
import { CJsonApi } from "../models/jsonapi";

@Injectable({
  providedIn: "root"
})
export class JsonApiParserService {

  parseSingleObj(data): object {
    return Object.assign(new CJsonApi(), data).toModel();
  }

  parseArrayofObject(array): Array<object> {
    return array.map(
      (obj) => Object.assign(new CJsonApi(), obj).toModel()
    );
  }
}
