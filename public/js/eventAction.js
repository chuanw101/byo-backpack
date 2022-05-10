
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
        console.log(`/update/${e.target.value}`)
            document.location.replace(`/profile/update/${e.target.value}`);
        
    }
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

const changePassBtn = document.querySelector("#changePssword");

changePassBtn.addEventListener('click', changePassword);

     function changePassword(e) {
            document.location.replace(`/profile/changepassword`);
        
    }
