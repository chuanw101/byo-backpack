// user who clicked button is bringing this item
const brgBtns = document.querySelectorAll(".brgBtn")
for (const button of brgBtns) {
    button.addEventListener('click', e => {
        console.log("checkcheck")
        fetch(`/api/items/${e.target.value}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.ok) {
                location.reload()
            } else {
                alert("update failed, check if logged in")
            }
        })
    })
}

// user who click button is rsvp'ing for event
document.querySelector("#rsvpBtn").addEventListener("click", e => {
    const blogObj = {
        title: document.querySelector("#title").value,
        body: document.querySelector("#body").value,
    }
    fetch("/api/blogs", {
        method: "POST",
        body: JSON.stringify(blogObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.reload()
        } else {
            alert("post failed, check if logged in")
        }
    })
})