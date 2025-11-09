import { Component, Input } from "@angular/core";

@Component({
    selector: "selectionBar",
    templateUrl: "./selectionBar.html",
    styleUrls: ["./selectionBar.scss", "../../app/app.scss"],
})
export class SelectionBarComponent<T> {
    @Input() items!: T[];
    @Input() selectedItem!: T;
    @Input() onSelectItem!: (item: T) => void;
    @Input() label: string = "";
 }