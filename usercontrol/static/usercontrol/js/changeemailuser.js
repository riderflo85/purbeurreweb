function changeEmailUser() {

    // ************* see the secureajax.js file for more details ******************************
    var csrftoken = getCookie('csrftoken');

    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
    // ****************************************************************************************

    var btnChangeEmail = document.getElementById('btnChangeEmail');
    var btnSave = document.getElementById('btnBoxSaveEmail');
    var btnCancel = document.getElementById('btnCancelEmail');
    var status = document.getElementById('bodyBoxEmail');

    btnChangeEmail.addEventListener('click', function () {
        $('#modalEmailUser').modal();
    });

    btnSave.addEventListener('click', function () {
        var emailField = document.getElementById('oldEmail');
        var newEmailField = document.getElementById('newEmail');
        var confirmNewEmailField = document.getElementById('confirmNewEmail');

        if (newEmailField.value === confirmNewEmailField.value) {
            if (newEmailField.value.length >= 8) {
                $.ajax({
                    url: 'change_email',
                    type: 'POST',
                    dataType: 'json',
                    data: { 'old_email': emailField.value, 'new_email': newEmailField.value, 'confirm_email': confirmNewEmailField.value },
                    success: function (data) {

                        if (data === 'True') {
                            var allField = document.getElementsByClassName('complete');

                            for (let i = 0; i < allField.length; i++) {
                                allField[i].classList.add('d-none');
                            }
                            btnSave.classList.add('d-none');
                            btnCancel.innerHTML = 'Fermer';
                            status.innerHTML = 'Mot de passe changez avec succes';
                            status.classList.add('text-success');
                        } else {
                            status.innerHTML = "Veuillez indiquer votre mot de passe actuel.";
                            status.classList.add('text-danger');
                            emailField.classList.add('is-invalid');
                        }
                    },
                    error: function (error) {
                        console.log(error);
                    },
                });
            } else {
                status.innerHTML = "Votre nouveau mot de passe dois faire au moins 8 caractères. Veuillez corriger cela.";
                status.classList.add('text-danger');
                newEmailField.classList.add('is-invalid');
            }

        } else {
            status.innerHTML = "La confirmation de votre mot de passe est différente. Veuillez corriger cela.";
            status.classList.add('text-danger');
            confirmNewEmailField.classList.add('is-invalid');
        }
    });
}