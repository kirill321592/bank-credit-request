const dictionary = {
    SEX: {
        MAN: 'Hombre',
        WOMAN: 'Mujer',
    },
    BANK_API: {
        INSTANTOR: 'Si',
        NONE: 'No'
    },
    HABITATION: {
        RENT: 'Alquiler',
        SHARED_APARTMENT: 'Piso compartido',
        PARTNER_APARTMENT: 'En el piso de mi pareja',
        OWNER_WITH_MORTGAGE: 'Propietario con hipoteca',
        OWNER_WITHOUT_MORTGAGE: 'Propietario sin hipoteca',
        WITH_PARENTS: 'Vivo con mis padres',
        OTHER: 'Otros'
    },
    MARITAL_STATUS: {
        UNMARRIED: 'Soltero',
        MARRIED: 'Casado',
        WIDOWED: 'Viudo',
        CIVIL_MARRIAGE: 'Separado',
        DIVORCED: 'Divorciado',
        OTHER: 'Otro'
    },
    DEPENDANTS: {
        NONE: '0',
        ONE: '1',
        TWO: '2',
        THREE: '3',
        MORE: '3+'
    },
    EDUCATION: {
        BASIC_EDUCATION: 'Educación primaria',
        SECONDARY: 'Educación secundaria',
        BACCALAUREATE: 'Bachillerato',
        VOCATIONAL_AVERAGE_DEGREE: 'Formación profesional grado medio',
        VOCATIONAL_DEGREE: 'Formación profesional grado superior',
        CERTIFIED: 'Diplomado',
        GRADUATE: 'Licenciado',
        OTHER: 'Otros'
    },
    EMPLOYMENT: {
        FULL_TIME: 'Empleado/a a tiempo completo',
        PART_TIME: 'Empleado/a a tiempo parcial',
        TEMPORAL: 'Empleado/a temporal',
        MILITARY: 'Militar',
        AUTONOMIC: 'Autonómo/a',
        STUDENT: 'Estudiante',
        UNEMPLOYED: 'Desempleado sin prestación',
        UNEMPLOYMENT: 'Desempleado con prestación',
        RETIRED: 'Jubilado',
        PENSIONER: 'Pensionista',
        EMPLOYEE: 'Funcionario/a',
        EMPLOYEE_MAIN: 'Empleado/a del hogar'
    },
    INDUSTRY: {
        GOV_SERVICE: 'Administración Pública',
        AGRICULTURE: 'Agricultura/Ganadería',
        FINANCE: 'Banca/Seguros',
        EDUCATION: 'Educación',
        SALES: 'Comercios',
        BUILDING: 'Construcción',
        PRODUCTION: 'Industria',
        HOSPITALITY: 'Hostelería',
        ARMY: 'Militar',
        RAW_MATERIALS_MINING: 'Minería',
        MEDECINE: 'Sanidad',
        TOURISM: 'Turismo',
        LEISURE: 'Ocio',
        OTHER: 'Otros sectores'
    },
    CREDIT_PURPOSE: {
        HELPFRIEND: 'Ayuda a un familiar o amigo',
        CELEBRATIONS: 'Celebraciones',
        CAR: 'Coche',
        SHOPPING: 'Compra semanal',
        LIABILITIES: 'Deudas',
        HOUSEHOLDEQUIPMENT: 'Equipamiento del hogar',
        PERSONALEQUIPMENT: 'Equipamiento personal',
        PAYINVOICES: 'Gastos corrientes y facturas',
        UNEXPECTED_EXPENSES: 'Gastos inesperados',
        MEDICINE: 'Gastos Médicos',
        MOTORBIKE: 'Moto',
        REPAIR: 'Reformas hogar',
        TRAVEL: 'Viajes y ocio',
        EDUCATION: 'Estudios o formación',
        OTHER: 'Otro'
    }
};

export default key => dictionary[key];
