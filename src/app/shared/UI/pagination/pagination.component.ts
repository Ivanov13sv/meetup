import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination.service';

export interface MyPagination {
    itemsCount: number;
    pageSize: number;
}
@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    providers: [PaginationService],
})
export class PaginationComponent implements OnInit {
    constructor(public paginationService: PaginationService) {}
    @Input() currentPage: number = 1;
    @Input() total: number | null = 3;
    @Input() limit: number = 20;
    @Output() changePage = new EventEmitter<number>();

    pages: number[] = [];

    ngOnInit(): void {
        console.log(this.paginationService.total$.getValue())
        if (this.total) {
            const pagesCount = Math.ceil(this.total / this.limit);
            this.pages = this.range(1, pagesCount);
        }
    }

    range(start: number, end: number): number[] {
        return [...Array(end).keys()].map(item => item + start);
    }
}
