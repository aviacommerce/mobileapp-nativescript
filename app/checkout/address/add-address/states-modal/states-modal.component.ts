import { Component, OnInit } from "@angular/core";
import { CState } from "~/core/models/state";
import { AddressService } from "~/core/services/address.service";
import { ModalDialogService, ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { topmost } from "ui/frame";

@Component({
  moduleId: module.id,
  selector: "states-modal",
  templateUrl: "./states-modal.component.html",
  styleUrls: ["./states-modal.component.css"]
})

export class StatesModalComponent implements OnInit {
  states: Array<CState> = [];

  constructor(
    private addrService: AddressService,
    private params: ModalDialogParams
  ) { //
  }

  ngOnInit() { //
    this.addrService.getAllStates().subscribe((states) => {
      this.states = states;
    });
  }

  selectedState(state: CState) {
    this.params.closeCallback(state);
  }
}
