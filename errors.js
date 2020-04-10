const DEFAULT_MESSAGES = {
    LENGTH_100: 'El valor no puede ser más de 100 los símbolos'
};

const ERRORS = {
    'error.required': 'Campo obligatorio',
    'error.invalid_length': 'Valor incorreto',
    'error.invalid': 'Valor inválido',
    'error.incorrect': 'Valor incorreto',
    'error.invalid_symbols': 'Este campo solo puede contener letras del alfabeto latino en mayúsculas y minúsculas',
    'userAccount.secondLastName': {
        'error.invalid_length': DEFAULT_MESSAGES.LENGTH_100
    },
    'userAccount.firstName': {
        'error.invalid_length': DEFAULT_MESSAGES.LENGTH_100
    },
    'userAccount.firstLastName': {
        'error.invalid_length': DEFAULT_MESSAGES.LENGTH_100
    },
    'userAccount.phone': {
        'error.invalid': 'Introduce un número de teléfono móvil',
        'error.exists': 'Ya existe un usuario con este número de teléfono en el sistema'
    },
    'personalData.birthday': {
        'error.invalid': 'La edad no puede ser menos de 18'
    },
    'personalData.idNumber': {
        'error.exists': 'Número inválido',
        'error.invalid': 'Número inválido'
    },

    'userAccount.email': {
        'error.invalid': 'Email incorrecto',
        'error.exists': 'Ya existe un usuario con este email',
        'error.invalid_symbols': 'Debes introducir una dirección de correo electrónico válida',
        'error.not_accepted': 'Email incorrecto'
    },
    'confirmUser.code': {
        'error.invalid': 'Código de confirmación inválido',
        'error.invalid_symbols': 'Campo debe contener sólo números'
    },
    'address.homePhone': {
        'error.invalid': 'Campo debe contener sólo números',
        'error.incorrect': 'Número de teléfono incorrecto',
        'error.invalid_length': 'Por favor, no escribas menos de 9 caracteres.'
    },
    'employment.nextIncomeDate': {
        'error.invalid': 'La fecha no puede ser anterior de la fecha actual',
        'error.invalid_future': 'El periodo es demasiado largo hasta el próximo salario'
    },
    'employment.employer': {
        'error.invalid_length': 'Este campo solo puede contener letras del alfabeto latino en mayúsculas y minúsculas'
    },
    'bankAccount.iban': {
        'error.invalid_symbols': 'Número de cuenta no válido',
        'error.invalid': 'Número de cuenta no válido'
    },
    'offerConfirmation.agree': {
        'error.required': 'Debes comprender y aceptar los términos y condiciones de tu préstamo para poder tramitarlo'
    },
    'confirmPolicy.confirmPolicy': {
        'error.required': 'Debes comprender y aceptar los términos'
    },
    'conditions.agreeTermsAndConditions': {
        'error.required': 'Debes comprender y aceptar los términos'
    },
    'employment.workNumber': {
        'error.in_use': 'El número digitado ya está indicado en el formulario, introduce por favor otro número de teléfono',
        'error.invalid': 'Número de teléfono incorrecto',
        'error.invalid_length': 'Por favor, no escribas menos de 9 caracteres'
    },
    'employment.income': {
        'error.invalid_too_low': 'Por favor, escribe un valor mayor o igual a 10'
    },
    'employment.paymentsOnLoans': {
        'error.invalid': 'Introduce el valor correcto'
    },
    'rejectedLead.dataAgreement': {
        'error.required': 'Debes marcar la casilla para continuar'
    }
};

export default ERRORS;
