window.onload = function () {
    changeInfosUser()
};

function changeInfosUser() {

    // ************* see the secureajax.js file for more details ******************************
    var csrftoken = getCookie('csrftoken');

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
    // ****************************************************************************************

    var btnChangePwd = document.getElementById('btnChangePwd');
    var btnSave = document.getElementById('btnBoxSave');
    var btnCancel = document.getElementById('btnCancel');
    var status = document.getElementById('bodyBox');

    btnChangePwd.addEventListener('click', function () {
        $('#modalBoxAccount').modal();
    });

    btnSave.addEventListener('click', function () {
        var pwdField = document.getElementById('oldPwd');
        var newPwdField = document.getElementById('newPwd');
        var confirmNewPwdField = document.getElementById('confirmNewPwd');

        if (newPwdField.value === confirmNewPwdField.value) {
            $.ajax({
                url: 'change_pwd',
                type: 'POST',
                dataType: 'json',
                data: {'old_pwd': pwdField.value, 'new_pwd': newPwdField.value, 'confirm_pwd': confirmNewPwdField.value},
                success: function (data) {

                    if (data) {
                        var allField = document.getElementsByClassName('complete');
    
                        for (let i = 0; i < allField.length; i++) {
                            allField[i].classList.add('d-none');
                        }
                        btnSave.classList.add('d-none');
                        btnCancel.innerHTML = 'Fermer';
                        status.innerHTML = 'Mot de passe changez avec succes';
                        status.classList.add('text-success');
                    }
                },
                error: function (error) {
                    console.log(error);
                },
            });
        }
    });
}