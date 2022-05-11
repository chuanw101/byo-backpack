//Make private btns
const inviteBtns = document.querySelectorAll(".inviteBtn");
for (const button of inviteBtns) {
    button.addEventListener('click', e => {
        const obj = {
            user_id: e.target.value
        }
        fetch(`/api/attendees/invite/${e.target.getAttribute('eventId')}`, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.ok) {
                location.reload()
            } else {
                alert("you cannot invite for this event")
            }
        })
    });
}