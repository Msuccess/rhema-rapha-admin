import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
    @Input() email: string;
    @Input() phone: string;
    @Input() name: string;
    @Input() id: string;

    constructor(private router: Router) {}

    viewDoctor(id: string) {
        this.router.navigate(['/doctor', id]);
    }

    ngOnInit() {}
}
