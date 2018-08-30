import { Component, OnInit } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Tutorial } from './../models/tutorial.model';
import { State } from '../../reducers/index';
@Component({
	selector: "app-read",
	moduleId: module.id,
	templateUrl: "./read.component.html"
})
export class ReadComponent implements OnInit {
	tutorials: Observable<Tutorial[]>;
	tut: Tutorial[]
	constructor(private store: Store<State>) {
		debugger
		this.tutorials = store.select('tutorial');
		this.tutorials.subscribe((result) => {
			this.tut = (result);
		});
	}
	ngOnInit() { }
}
