import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        label: 'Navigation',
        isTitle: true,
        role: '',
    },
    {
        label: 'Dashboard',
        icon: 'home',
        link: '/dashboard',
        role: '',
    },
    {
        label: 'Patient',
        icon: 'user',
        link: '/patient',
        role: 'admin',
    },
    {
        label: 'Doctor',
        icon: 'heart',
        link: '/doctor',
        role: 'admin',
    },
    {
        label: 'Appointment',
        icon: 'calendar',
        link: '/appointment',
        role: '',
    },
    {
        label: 'Department',
        icon: 'layers',
        link: '/department',
        role: 'admin',
    },
];
