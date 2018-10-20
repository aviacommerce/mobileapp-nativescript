
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "Address",
  moduleId: module.id,
  templateUrl: "./order-respone.component.html",
  styleUrls: ["./order-respone.component.scss"]
})
export class OrderResponeComponent implements OnInit {

  subscriptionList$: Array<Subscription> = [];
  constructor(
    private router: Router) {

  }

  ngOnInit() {//
  }

  backToHome() {
    this.router.navigate(["/"]);
  }
}
