
// change password
const newPassword = async (event) => {
    try {
        event.preventDefault();
        const currentPass = document.querySelector('#currentPassword').value.trim();
        const newPass = document.querySelector('#newPassword').value.trim();
        const checkNewPass = document.querySelector('#checkNewPassword').value.trim();
        const userId = document.querySelector('#newPassBtn').value;


        if (!currentPass || !newPass) {
            alert("Please enter password information")
        } else if (checkNewPass != newPass) {
            alert("New password dont match")
        } else if (newPass.length < 8) {
            alert("New password should be at least 8 character")
        }
        else {

            const response = await fetch(`/api/users/changePassword/${userId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    currentPass,
                    newPass,
                    userId,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                document.location.href = '/profile';
            }
            else if (response.status === 401) {
                alert("The current password does not match")
            } else {
                alert("password change failed!")
            }
        }
    } catch (err) {
        alert('the new password is not valid')
        console.log(err)

    }
};
document.querySelector('#newPassBtn').addEventListener('click', newPassword);

// cancel changing password bottun 
const cancelEvent = async (event) => {
    event.preventDefault();
    try {
        document.location.href = '/profile';
    } catch (err) {

        console.log(err)
    }
};
document.querySelector('#cancelpass').addEventListener('click', cancelEvent);