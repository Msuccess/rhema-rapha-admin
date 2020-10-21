import { environment } from '../../../environments/environment';
export class AuthEndPoints {
    API_AUTH_BASE = environment.baseUrl + 'auth/';
    API_AUTH_REGISTER = this.API_AUTH_BASE + 'register/';
    API_AUTH_LOGIN = this.API_AUTH_BASE + 'login/';
    API_AUTH_USERS = this.API_AUTH_BASE + 'users/';
}

export class ApiEndPoints {
    API_BASE_URL = environment.baseUrl;
    API_DASHBOARD_ANALYTICS = this.API_BASE_URL + 'analytics/get_analytics/';
}
