import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { isIOS } from "tns-core-modules/ui/page/page";
import { Taxonomy } from "~/core/models/taxonomy";
import { environment } from "~/environments/environment";

@Component({
  moduleId: module.id,
  selector: "categoryMenu, [categoryMenu]",
  templateUrl: "./category-menu.component.html",
  styleUrls: ["./category-menu.component.scss"]
})

export class CategoryMenuComponent implements OnInit {
  categories = environment.config.categories;

  @Input() taxonomies: Array<Taxonomy>;
  @Output() showCategory = new EventEmitter<number>();
  iOS = isIOS;

  constructor() {
    //
  }

  ngOnInit() {
    //
  }

  onSelectedCategory(categoryId: number) {
    // this.showCategory.emit(categoryId);
  }
}
