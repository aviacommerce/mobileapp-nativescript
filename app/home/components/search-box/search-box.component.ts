import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { RouterExtensions } from "nativescript-angular/router";
import { isIOS } from "tns-core-modules/ui/page/page";
import { IappState } from "~/app.reducers";
import { environment } from "~/environments/environment";
import { SearchActions } from "~/search/action/search.actions";

@Component({
  moduleId: module.id,
  selector: "searchBox, [searchBox]",
  templateUrl: "./search-box.component.html",
  styleUrls: ["./search-box.component.scss"]
})

export class SearchBoxComponent implements OnInit {

  searchBoxplaceHolder = environment.config.searchBoxPlaceholder;
  isIos = isIOS;

  constructor(
    private store: Store<IappState>,
    private searchActions: SearchActions,
    private router: RouterExtensions) { }

  ngOnInit() {
    //
  }

  onSearchTapped() {
    this.store.dispatch(this.searchActions.clearSearchedProducts(false));
    this.router.navigate(["/search"], { queryParams: { clearFocus: false } });
  }
}
