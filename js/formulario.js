const form = document.querySelector("form");

form.addEventListener('submit', (event) => {
    if (!validateForm()) {
        event.preventDefault(); 
    } 
});

const validateForm = () => {
    let isValid = true;

    isValid = validateField('nombreapellido', 'El nombre es obligatorio') && isValid;

    isValid = validateEmailField('correoelectronico', 'El correo electrónico no es válido') && isValid;

    isValid = validateField('telefono', 'El teléfono es obligatorio') && isValid;

    isValid = validateField('destinoSelect', 'El destino es obligatorio') && isValid;

    return isValid;
};

const validateField = (fieldId, errorMessage) => {
    const field = document.getElementById(fieldId);// levanta el elemento por su id
    const value = field.value.trim(); // al value se le quitan los espacios en blanco al principio y al final
    //valida si el campo está vacío
    if (value === '') {
        setErrorFor(field, errorMessage);
        return false;
    }

    // Validar campo de teléfono
    if (fieldId === 'telefono') {
        const telefonoRegex = /^[0-9]{10,14}$/;
        if (!telefonoRegex.test(value)) {
            setErrorFor(field, 'El teléfono debe contener solo números y tener entre 10 y 14 dígitos');
            return false;
        }
    }

    setSuccessFor(field);
    return true;
};

const validateEmailField = (fieldId, errorMessage) => {
    const field = document.getElementById(fieldId);
    const email = field.value.trim();
    if (email === '') {
        setErrorFor(field, 'El correo electrónico es obligatorio');
        return false;
    } else if (!isEmail(email)) {
        setErrorFor(field, errorMessage);
        return false;
    } else {
        setSuccessFor(field);
        return true;
    }
};

const isEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const setErrorFor = (input, message) => {
    // Obtiene el div padre del campo
    const formControl = input.closest('div');
    //levanta por su clase el elemento que contiene el mensaje de error
    const errorText = formControl.querySelector('.textoError');
    //agrega la clase error al div padre del campo
    formControl.classList.add('error');
    //muestra el mensaje de error
    errorText.innerText = message;
    //pone el foco en el campo
    input.focus();
};

// recibe el campo y elimina la clase error del div padre del campo y el mensaje de error
const setSuccessFor = (input) => {
    // Obtiene el div padre del campo
    const formControl = input.closest('div');
    //quita la clase error al div padre del campo
    formControl.classList.remove('error');
    //levanta por su clase el elemento que contiene el mensaje de error
    const errorText = formControl.querySelector('.textoError');
    //elimina el mensaje de error
    errorText.innerText = '';
};

form.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        // Obtiene el valor del campo y elimina los espacios en blanco al principio y al final
        const value = input.value.trim();
        // Si el campo no está vacío, elimina cualquier mensaje de error
        if (value !== '') {
            setSuccessFor(input);
        }
    });
});
 // Agrega eventos para borrar las clases de error cuando se selecciona una opción del select
form.querySelectorAll('select').forEach(select => {
    select.addEventListener('change', () => {
        // Obtiene el valor seleccionado del campo de selección
        const value = select.value;
        // Si se selecciona una opción, elimina cualquier mensaje de error
        if (value !== '') {
            setSuccessFor(select);
        }
    });
});