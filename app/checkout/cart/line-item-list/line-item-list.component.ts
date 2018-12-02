import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { IappState } from "~/app.reducers";
import { getLineItems } from "~/checkout/reducers/selectors";
import { LineItem } from "~/core/models/line_item";

@Component({
  moduleId: module.id,
  selector: "line-item-list",
  templateUrl: "./line-item-list.component.html",
  styleUrls: ["./line-item-list.component.scss"]
})

export class LineItemListComponent implements OnInit {
  @Input() itemTotal: number;
  isProcessing: boolean;
  lineItems: Array<LineItem>;

  constructor(private store: Store<IappState>) { }

  ngOnInit() {
    this.isProcessing = true;
    this.store.select(getLineItems).subscribe((items) => {
      this.isProcessing = false;
      this.lineItems = items;
    });
  }
}
