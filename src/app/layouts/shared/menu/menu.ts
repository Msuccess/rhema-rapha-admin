import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        label: 'Navigation',
        isTitle: true,
    },
    {
        label: 'Dashboard',
        icon: 'home',
        link: '/',
    },

    {
        label: 'Patient',
        icon: 'user',
        link: '/patient',
    },
    {
        label: 'Doctor',
        icon: 'heart',
        link: '/doctor',
    },
    {
        label: 'Appointment',
        icon: 'calendar',
        link: '/appointment',
    },
    {
        label: 'Department',
        icon: 'layers',
        link: '/department',
    },
];
