import { BehaviorSubject } from 'rxjs';
import { LoaderService } from './loader.service';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, AfterViewInit {
    show = new BehaviorSubject<boolean>(false);
    constructor(private loaderService: LoaderService) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.render();
        }, 0);
    }

    render() {
        this.loaderService.loaderState.subscribe((res) => {
            this.show.next(res);
        });
    }
}
