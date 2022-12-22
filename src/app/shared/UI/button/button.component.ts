import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
    @Input() colorType: 'primary' | 'secondary' | 'accent' = 'primary';
    @Input() text: string = '';
    @Input() type: 'submit' | 'button' = 'button';
    @Output()
    public onClicked: EventEmitter<void> = new EventEmitter();
}
