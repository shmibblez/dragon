import { CommonModule } from "@angular/common";
import { Component, HostListener, Input } from "@angular/core";

@Component({
    selector: "dropdown",
    templateUrl: "./dropdown.html",
    styleUrls: ["../../app/app.scss", "./dropdown.scss"],
    imports: [CommonModule],
})
export class DropdownComponent {
    @Input() label!: string;
    @Input() selected: boolean = false;
    @Input() onSelect!: () => void;
    // todo: type for popup content
    @Input() popupContentHTML!: string;
}