import { PERSONAL_SETTINGS, EMPLOYMENT_SETTINGS, PASSWORD_SETTINGS } from 'PrivateArea/config';

export const PORTABILITY_CONFIG = {
    id: 'portability',
    name: 'Portabilidad',
};

export default [
    {
        id: 'personal',
        name: 'Información de contacto',
        url: PERSONAL_SETTINGS.url,
    },
    {
        id: 'employment',
        name: 'Dirección y empleo',
        url: EMPLOYMENT_SETTINGS.url,
    },
    {
        id: 'mobile-phone',
        name: 'Cambiar teléfono móvil',
    },
    {
        id: 'password',
        name: 'Cambiar contraseña',
        url: PASSWORD_SETTINGS.url,
    },
    {
        id: 'terms',
        name: 'Condiciones de aceptación',
    },
];
