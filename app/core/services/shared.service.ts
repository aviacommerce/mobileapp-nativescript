import { Injectable } from "@angular/core";

@Injectable()
export class SharedService {

  constructor() {
    //
  }
  alert(msg: string) {
    return alert({
      okButtonText: "OK",
      message: msg
    });
  }
}
