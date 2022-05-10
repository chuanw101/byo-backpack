
const deleteBtns = document.querySelectorAll(".deleteBtn");

for (const deleteBtn of deleteBtns) {
    // console.log('hello');
    deleteBtn.addEventListener('click', deleteEvent);

    async function deleteEvent(e) {
        const response = await fetch(`/api/events/${e.target.value}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete');
        }
    }
}


const updateBtns = document.querySelectorAll(".updateBtn");

for (const updateBtn of updateBtns) {
    updateBtn.addEventListener('click', updateEvent);

     function updateEvent(e) {
       
            document.location.replace(`/profile/update/${e.target.value}`);
        
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
        console.log("click")
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

// const updateBtns = document.querySelectorAll(".updateBtn");

// for (const updateBtn of updateBtns) {
//     updateBtn.addEventListener('click', deleteEvent);

//     async function deleteEvent(e) {
//         const response = await fetch(`/api/events/${e.target.value}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         });
//         if (response.ok) {
//             document.location.replace('/profile');
//         } else {
//             alert('Failed to delete');
//         }
//     }
// }




// const changePassBtn = document.querySelector("#changePssword");

// changePassBtn.addEventListener('click', changePassword);

//      function changePassword() {
//             document.location.replace(`/profile/changepassword`);
        
//     }
