import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { Subscription } from "rxjs";
import { Page } from "tns-core-modules/ui/page/page";
import { IappState } from "~/app.reducers";
import { getStatesList } from "~/checkout/reducers/selectors";
import { CState } from "~/core/models/state";

@Component({
  moduleId: module.id,
  selector: "states-modal",
  templateUrl: "./states-modal.component.html",
  styleUrls: ["./states-modal.component.css"]
})

export class StatesModalComponent implements OnInit, OnDestroy {

  states: Array<CState> = [];
  subscriptionList$: Array<Subscription> = [];

  constructor(
    private params: ModalDialogParams,
    private store: Store<IappState>,
    private page: Page
  ) { }

  ngOnInit() {

    this.page.on("navigatingFrom", (data) => {
      this.ngOnDestroy();
    });

    this.subscriptionList$.push(
      this.store.select(getStatesList).subscribe((states) => this.states = states)
    );
  }

  selectedState(state: CState) {
    this.params.closeCallback(state);
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
