async function editUser(modal, id) {
    let oneUser = await userFetch.findOneUser(id);
    let user = oneUser.json();

    modal.find('.modal-title').html('Edit user');

    let editButton = `<button  class="btn btn-info" id="editButton">Edit</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    modal.find('.modal-footer').append(editButton);
    modal.find('.modal-footer').append(closeButton);

    user.then(user => {
        let adminSelect = "";
        let userSelect = "";

        for (let i = 0; i < user.roles.length; i++) {
            if (user.roles[i].role === "ROLE_ADMIN") {
                adminSelect = "selected";
            }
            if (user.roles[i].role === "ROLE_USER") {
                userSelect = "selected";
            }
        }

        let bodyForm = `
            <form class="form-group text-center" id="editUser">
               <div class="form-group">
                    <label for="id" class="col-form-label">ID</label>
                    <input type="text" class="form-control id" id="id" value="${user.id}" readonly>
               </div>
                   
               <div class="form-group">
                    <label for="email" class="col-form-label">E-mail</label>
                    <input type="text" class="form-control email" id="email" value="${user.email}">
               </div>

                <div class="form-group">
                    <label for="password" class="com-form-label">Password</label>
                    <input type="password" class="form-control" id="password" value="${user.password}">
                </div>

                <div class="form-group">
                    <label for="firstname" class="com-form-label">Name</label>
                    <input type="text" class="form-control" id="firstname" value="${user.firstname}">
                </div>

                <div class="form-group">
                    <label for="lastname" class="com-form-label">Lastname</label>
                    <input type="text" class="form-control" id="lastname" value="${user.lastname}">
                </div>

                <div class="form-group">
                    <label for="age" class="com-form-label">Age</label>
                    <input type="number" class="form-control" id="age" value="${user.age}">
                </div>

                <div class="form-group">
                    <label for="roles" class="com-form-label">Role</label>
                    <select multiple id="roles" size="2" class="form-control" style="max-height: 100px">
                    <option value="ROLE_USER" ${userSelect}>USER</option>
                    <option value="ROLE_ADMIN" ${adminSelect}>ADMIN</option>
                    </select>
                </div>
            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#editButton").on('click', async () => {
        let checkedRoles = () => {
            let array = []
            let options = document.querySelector('#roles').options
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    array.push(roleList[i])
                }
            }
            return array;
        }
        let id = modal.find("#id").val().trim();
        let email = modal.find("#email").val().trim();
        let password = modal.find("#password").val().trim();
        let firstname = modal.find("#firstname").val().trim();
        let lastname = modal.find("#lastname").val().trim();
        let age = modal.find("#age").val().trim();
        let data = {
            id: id,
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
            age: age,
            roles: checkedRoles()

        }
        const response = await userFetch.updateUser(data, id);

        if (response.ok) {
            await getUsers();
            modal.modal('hide');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="messageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            modal.find('.modal-body').prepend(alert);
        }
    })
}