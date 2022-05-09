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
const rsvpBtn = document.querySelector("#rsvpBtn")
if (rsvpBtn) {
    rsvpBtn.addEventListener("click", e => {
        fetch(`/api/attendees/${e.target.value}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.ok) {
                location.reload()
            } else {
                alert("rsvp failed, check if logged in")
            }
        })
    })
}

// user who click button is rsvp'ing for event
const leaveBtn = document.querySelector("#leaveBtn")
if (leaveBtn) {
    leaveBtn.addEventListener("click", e => {
        fetch(`/api/attendees/${e.target.value}`, {
            method: "DELETE",
        }).then(res => {
            if (res.ok) {
                location.reload()
            } else {
                alert("leave failed, check if logged in")
            }
        })
    })
}