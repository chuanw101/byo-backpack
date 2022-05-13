
// direct to sign up
document.querySelector("#signup").addEventListener("submit", e => {
    e.preventDefault();
    const userObj = {
        user_name: document.querySelector("#signupUsername").value,
        password: document.querySelector("#signupPassword").value,
    }
    console.log (/^[A-Za-z0-9]*$/.test(userObj.user_name))
    if (!userObj.user_name) {
        alert("Please enter a username")
    } else if (!userObj.password) {
        alert("Please enter a password")
    } else if (userObj.user_name.length > 15) {
        alert("User name too long (15 char limit)")
    } else if (/^[A-Za-z0-9]*$/.test(userObj.user_name) == false) {
        alert("Username can use alphabets and numbers only")
    } else if (userObj.password.length < 8) {
        alert("Password must be at least 8 characters")
    } else {
        fetch("/api/users/signup", {
            method: "POST",
            body: JSON.stringify(userObj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.ok) {
                location.href = "/profile"
            } else {
                alert("sign up failed")
            }
        })
    }
})