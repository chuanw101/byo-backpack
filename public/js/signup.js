
// direct to sign up
document.querySelector("#signup").addEventListener("submit", e => {
    e.preventDefault();
    const userObj = {
        user_name: document.querySelector("#signupUsername").value,
        password: document.querySelector("#signupPassword").value,
    }
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
})