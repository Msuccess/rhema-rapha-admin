import { TokenStorage } from './../../../auth/service/token-storage.service';
import { AuthService } from './../../../auth/service/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { SIDEBAR_WIDTH_CONDENSED } from '../../layout.model';

@Component({
    selector: 'app-leftsidebar',
    templateUrl: './leftsidebar.component.html',
    styleUrls: ['./leftsidebar.component.scss'],
})
export class LeftsidebarComponent implements OnInit {
    @Input() sidebarType: string;
    user: any;

    constructor(
        private router: Router,
        private authService: AuthService,
        private tokenStorage: TokenStorage
    ) {}

    ngOnInit() {
        this.getUserRole();
    }

    /**
     * Is sidebar condensed?
     */
    isSidebarCondensed() {
        return this.sidebarType === SIDEBAR_WIDTH_CONDENSED;
    }

    getUserRole() {
        this.tokenStorage.getUser().subscribe((res) => {
            console.log('Role', res);
            this.user = res;
        });
    }

    /**
     * Logout the user
     */
    logout() {
        this.authService.signOut();
        this.router.navigate(['/auth/login']);
    }
}
