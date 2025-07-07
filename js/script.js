var users = [{ email: 'admin@example.com', password: '123456' }];

var formularioLogin = document.getElementById('loginForm');
var formularioRegistro = document.getElementById('registerForm');
var mensajeError = document.getElementById('errorMessage');
var alertaError = document.getElementById('errorAlert');
var mensajeErrorRegistro = document.getElementById('registerErrorMessage');
var alertaErrorRegistro = document.getElementById('registerErrorAlert');
var vistaLogin = document.getElementById('loginView');
var vistaRegistro = document.getElementById('registerView');
var vistaDashboard = document.getElementById('dashboardView');
var correoUsuario = document.getElementById('displayEmail');
var horaLogin = document.getElementById('loginTime');

function mostrarError(mensaje, esRegistro = false) {
    if (esRegistro) {
        mensajeErrorRegistro.textContent = mensaje;
        alertaErrorRegistro.classList.remove('hidden');
        setTimeout(() => alertaErrorRegistro.classList.add('hidden'), 5000);
    } else {
        mensajeError.textContent = mensaje;
        alertaError.classList.remove('hidden');
        setTimeout(() => alertaError.classList.add('hidden'), 5000);
    }
}

function ocultarError(esRegistro = false) {
    if (esRegistro) {
        alertaErrorRegistro.classList.add('hidden');
    } else {
        alertaError.classList.add('hidden');
    }
}

function hacerLogin(correo, contraseña) {
    let userFound = users.find(user => user.email === correo && user.password === contraseña);
    if (userFound) {
        ocultarError();
        correoUsuario.textContent = correo;
        var fechaActual = new Date();
        horaLogin.textContent = fechaActual.toLocaleString('es-ES');
        vistaLogin.classList.add('hidden');
        vistaDashboard.classList.remove('hidden');
        return true;
    } else {
        mostrarError('Correo o contraseña incorrectos');
        return false;
    }
}

function registrarUsuario(correo, contraseña) {
    if (users.find(user => user.email === correo)) {
        mostrarError('El correo ya está registrado', true);
        return false;
    }
    users.push({ email: correo, password: contraseña });
    ocultarError(true);
    vistaRegistro.classList.add('hidden');
    vistaLogin.classList.remove('hidden');
    return true;
}

function cerrarSesion() {
    var confirmacion = confirm('¿Estás seguro de que quieres cerrar sesión?');
    if (confirmacion) {
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        ocultarError();
        vistaDashboard.classList.add('hidden');
        vistaLogin.classList.remove('hidden');
    }
}

function alEnviarFormularioLogin(evento) {
    evento.preventDefault();
    var correoEscrito = document.getElementById('email').value.trim();
    var contraseñaEscrita = document.getElementById('password').value.trim();
    if (correoEscrito === '' || contraseñaEscrita === '') {
        mostrarError('Por favor, completa todos los campos');
        return;
    }
    hacerLogin(correoEscrito, contraseñaEscrita);
}

function alEnviarFormularioRegistro(evento) {
    evento.preventDefault();
    var correoEscrito = document.getElementById('newEmail').value.trim();
    var contraseñaEscrita = document.getElementById('newPassword').value.trim();
    var confirmarContraseña = document.getElementById('confirmPassword').value.trim();
    if (correoEscrito === '' || contraseñaEscrita === '' || confirmarContraseña === '') {
        mostrarError('Por favor, completa todos los campos', true);
        return;
    }
    if (contraseñaEscrita !== confirmarContraseña) {
        mostrarError('Las contraseñas no coinciden', true);
        return;
    }
    registrarUsuario(correoEscrito, contraseñaEscrita);
}

function alHacerClick(evento) {
    if (evento.target.classList.contains('btn-close')) {
        ocultarError(evento.target.closest('.alert').id === 'registerErrorAlert');
    }
}

function alPresionarTecla(evento) {
    if (evento.key === 'Enter') {
        if (!vistaLogin.classList.contains('hidden')) {
            alEnviarFormularioLogin(evento);
        } else if (!vistaRegistro.classList.contains('hidden')) {
            alEnviarFormularioRegistro(evento);
        }
    }
}

function showLoginView() {
    vistaRegistro.classList.add('hidden');
    vistaLogin.classList.remove('hidden');
    ocultarError(true);
    document.getElementById('newEmail').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}

function showRegisterView() {
    vistaLogin.classList.add('hidden');
    vistaRegistro.classList.remove('hidden');
    ocultarError();
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}

function configurarTodo() {
    formularioLogin.addEventListener('submit', alEnviarFormularioLogin);
    formularioRegistro.addEventListener('submit', alEnviarFormularioRegistro);
    document.addEventListener('click', alHacerClick);
    document.addEventListener('keypress', alPresionarTecla);
}

document.addEventListener('DOMContentLoaded', configurarTodo);

function logout() {
    cerrarSesion();
}