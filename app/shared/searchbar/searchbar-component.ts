import { HttpParams } from "@angular/common/http";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { isAndroid } from "platform";
import { SearchBar } from "ui/search-bar";
import { IappState } from "~/app.reducers";
import { environment } from "~/environments/environment";
import { SearchActions } from "../../search/action/search.actions";
@Component({
  selector: "sb-component",
  moduleId: module.id,
  templateUrl: "./searchbar-component.html",
  styleUrls: ["./searchbar-component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchBarComponent {

  searchBoxPlaceholder = environment.config.searchBoxPlaceholder;

  constructor(
    private router: Router, private store: Store<IappState>,
    private searchActions: SearchActions) {
  }

  searchBarLoaded(args) {
    const searchbar: SearchBar = <SearchBar>args.object;
    if (isAndroid) {
      searchbar.android.clearFocus();
    }
  }

  onSubmit(args) {
    const searchBar = <SearchBar>args.object;
    let searchParams = new HttpParams();
    searchParams = searchParams.set("q[name_cont_any]", searchBar.text);
    this.store.dispatch(this.searchActions.clearProducts());
    this.store.dispatch(this.searchActions.getProductsByKeyword(searchParams));
    this.router.navigate(["/search"], { queryParams: { keywordSearchParams: searchParams.toString() } });
    searchBar.dismissSoftInput();
  }
}
