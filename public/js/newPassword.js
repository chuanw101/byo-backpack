

const newPassword = async (event) => {
    try{
    event.preventDefault();
    const currentPass = document.querySelector('#currentPassword').value;
    const newPass = document.querySelector('#newPassword').value;
    const checkNewPass = document.querySelector('#checkNewPassword').value;
    const userId = document.querySelector('#newPassBtn').value;
    if (checkNewPass === newPass) {
        const response = await fetch(`/api/users/chnagePassword/${userId}`, {
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
        if (response.ok) {
            document.location.replace('/profile');

        } else {
            // response.
            alert('Failed to update');
        }
    }
    else{
        alert('Passwors are not match');
    }
}catch(err){
    alert('the new password is not valid')
    console.log(err)
    // alert(msg)
}
};
document.querySelector('#newPassBtn').addEventListener('click', newPassword);