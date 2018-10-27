import { HttpParams } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { isAndroid } from "platform";
import { SearchBar } from "ui/search-bar";
import { IappState } from "~/reducers";
import { SearchActions } from "../../search/action/search.actions";
@Component({
  selector: "sb-component",
  moduleId: module.id,
  templateUrl: "./searchbar-component.html",
  styleUrls: ["./searchbar-component.scss"]

})

export class SearchBarComponent {
  searchPhrase: string;
  searchBar: any;

  constructor(
    private router: Router, private store: Store<IappState>,
    private searchActions: SearchActions) {

  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

  onTextChanged(args) {
    this.searchBar = <SearchBar>args.object;

  }

  sBLoaded(args) {
    const searchbar: SearchBar = <SearchBar>args.object;
    if (isAndroid) {
      searchbar.android.clearFocus();
    }
  }

  onSubmit(args) {
    this.searchBar = <SearchBar>args.object;
    let searchParams = new HttpParams();
    searchParams = searchParams.set("q[name_cont_any]", this.searchBar.text);
    this.store.dispatch(this.searchActions.getProductsByKeyword(searchParams));

    this.router.navigate(["/search"], {
      queryParams: {
        "q[name_cont_any]": searchParams.toString()
      }
    });
    this.searchBar.dismissSoftInput();
  }
}
