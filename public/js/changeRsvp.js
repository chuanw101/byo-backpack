//get eventid
const curEventId = document.querySelector("#noRes").getAttribute("value");
//get rsvp status
const curRsvp = document.querySelector("#rsvp-choice").getAttribute("status");

//no response
document.querySelector("#noRes").addEventListener("click", e=> {
    if (curRsvp == 0) {
        return;
    }
    const obj = {
        rsvp_status: 0
    }
    fetch(`/api/attendees/${curEventId}`, {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.reload()
        } else {
            alert("rsvp failed, check if logged in/invited")
        }
    })
})

//attend
document.querySelector("#attend").addEventListener("click", e=> {
    if (curRsvp == 1) {
        return;
    }
    const obj = {
        rsvp_status: 1
    }
    fetch(`/api/attendees/${curEventId}`, {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.reload()
        } else {
            alert("rsvp failed, check if logged in/invited")
        }
    })
})

//maybe
document.querySelector("#maybe").addEventListener("click", e=> {
    if (curRsvp == 3) {
        return;
    }
    const obj = {
        rsvp_status: 3
    }
    fetch(`/api/attendees/${curEventId}`, {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.reload()
        } else {
            alert("rsvp failed, check if logged in/invited")
        }
    })
})

//decline
document.querySelector("#decline").addEventListener("click", e=> {
    if (curRsvp == 2) {
        return;
    }
    const obj = {
        rsvp_status: 2
    }
    fetch(`/api/attendees/${curEventId}`, {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.reload()
        } else {
            alert("rsvp failed, check if logged in/invited")
        }
    })
})