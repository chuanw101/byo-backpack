// delete event
const deleteBtns = document.querySelectorAll(".deleteBtn");

for (const deleteBtn of deleteBtns) {
    deleteBtn.addEventListener('click', deleteEvent);
    async function deleteEvent(e) {
        if (confirm("ARE YOU SURE YOU WANT TO PERMANENTLY DELETE EVENT?")) {
            const response = await fetch(`/api/events/${e.target.value}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                location.reload();
            } else {
                alert('Failed to delete');
            }
        }
    }
}
// direct the update event page
const updateBtns = document.querySelectorAll(".updateBtn");
for (const updateBtn of updateBtns) {
    updateBtn.addEventListener('click', updateEvent);

    function updateEvent(e) {
        document.location.href = `/profile/update/${e.target.value}`;
    }
}

//Make private btns
const privBtns = document.querySelectorAll(".privBtn");
for (const button of privBtns) {
    button.addEventListener('click', e => {
        const obj = {
            public: false
        }
        fetch(`/api/events/${e.target.value}`, {
            method: "PUT",
            body: JSON.stringify(obj),
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
    });
}

//Make private btns
const pubBtns = document.querySelectorAll(".pubBtn");
for (const button of pubBtns) {
    button.addEventListener('click', e => {
        const obj = {
            public: true
        }
        fetch(`/api/events/${e.target.value}`, {
            method: "PUT",
            body: JSON.stringify(obj),
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
    });
}
