import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { SearchBar } from "ui/search-bar";
import { TextField } from "ui/text-field";
import { Observable } from "rxjs";
import { State } from "../../reducers/index";
import { Store } from "@ngrx/store";
import { getTotalCartItems } from './../../checkout/reducers/selectors';
@Component({
  selector: "ab-component",
  moduleId: module.id,
  templateUrl: "./actionbar-component.html",
  styleUrls: ["./actionbar-component.scss"]
})
export class ActionBarComponent implements OnInit {
  searchPhrase: string;
  searchBar;
  totalCartItems: Observable<number>;
  constructor(private store: Store<State>, private router: Router,){}
  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
   
  }

  ngOnInit() {
    this.totalCartItems = this.store.select(getTotalCartItems);
  }

  onSubmit(args) {
    this.searchBar = <SearchBar>args.object;
    alert("You are searching for " + this.searchBar.text);
  }
  abc()
  {
    
    this.router.navigate(['/checkout/cart']);
  }
}
