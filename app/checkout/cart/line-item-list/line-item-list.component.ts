import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { LineItem } from '~/core/models/line_item';
import { Store } from '@ngrx/store';
import { State } from '~/reducers';
import { CheckoutActions } from '~/checkout/actions/checkout.actions';
import { getLineItems } from '~/checkout/reducers/selectors';

@Component({
	moduleId: module.id,
	selector: 'line-item-list',
	templateUrl: './line-item-list.component.html',
	styleUrls: ['./line-item-list.component.scss']
})

export class LineItemListComponent implements OnInit {
	@Input() itemTotal: number;
	lineItems$: Observable<LineItem[]>;
	constructor(private store: Store<State>, private actions: CheckoutActions) {
		debugger
		this.lineItems$ = this.store.select(getLineItems);
	}

	ngOnInit() { }
}
