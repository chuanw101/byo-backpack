
// change password
const newPassword = async (event) => {
    try {
        event.preventDefault();
        const currentPass = document.querySelector('#currentPassword').value.trim();
        const newPass = document.querySelector('#newPassword').value.trim();
        const checkNewPass = document.querySelector('#checkNewPassword').value.trim();
        const userId = document.querySelector('#newPassBtn').value;


        if (!currentPass || !newPass ) {
            alert("Please enter password information")
        } else {
console.log("in here")
            if (checkNewPass === newPass) {
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
                console.log(response)
                // if (response.ok) {
                    document.location.replace('/profile');

                // } else {
                //     // response.
                //     alert('Failed to update');
                // }
            }
            else {
                alert('New Passwors are not match');
            }
        }
    } catch (err) {
        alert('the new password is not valid')
        console.log(err)
        // alert(msg)
    }
};
document.querySelector('#newPassBtn').addEventListener('click', newPassword);


// cancel bottun 
const cancelEvent = async (event) => {
    event.preventDefault();
    try {
        document.location.replace('/profile');
    } catch (err) {

        console.log(err)
        // alert(msg)
    }
};
document.querySelector('#cancelpass').addEventListener('click', cancelEvent);