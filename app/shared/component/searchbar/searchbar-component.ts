import { HttpParams } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { isAndroid, isIOS } from "platform";
import { SearchBar } from "ui/search-bar";
import { IappState } from "~/app.reducers";
import { environment } from "~/environments/environment";
import { SearchActions } from "~/search/action/search.actions";

@Component({
  selector: "sb-component, [searchBar]",
  moduleId: module.id,
  templateUrl: "./searchbar-component.html",
  styleUrls: ["./searchbar-component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchBarComponent {

  @Input() clearFocus1: boolean;
  searchBar: any;

  searchBoxPlaceholder = environment.config.searchBoxPlaceholder;

  constructor(
    private router: Router, private store: Store<IappState>,
    private searchActions: SearchActions) { }

  searchBarLoaded(args) {
    this.searchBar = <SearchBar>args.object;
    this.searchBar._dialogClosed();
    if (!this.clearFocus1) {
      if (isAndroid) {
        this.searchBar.android.clearFocus();
      }
    }
  }

  onSubmit(args) {
    this.searchBar = <SearchBar>args.object;
    let searchParams = new HttpParams();
    searchParams = searchParams.set("q[name_cont_any]", this.searchBar.text);
    this.store.dispatch(this.searchActions.clearSearchedProducts(true));
    this.store.dispatch(this.searchActions.getProductsByKeyword(searchParams));
    if (isAndroid) {
      this.searchBar.android.clearFocus();
    }
    this.router.navigate(["/search"], { queryParams: { keywordSearchParams: searchParams.toString() } });
  }

  onClear() {
    this.store.dispatch(this.searchActions.clearSearchedProducts(false));
  }
}
