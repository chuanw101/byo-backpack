// const update = document.querySelectorAll(".newEventSubmit");

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

let public = ( document.querySelector("#public").getAttribute("checked") == "checked" );

const radioButtons = document.querySelectorAll('input[name="eventType"]');
for (const radioButton of radioButtons) {
    radioButton.addEventListener('click', radioBtnEvent);

    function radioBtnEvent(e) {
        console.log(`${e.target.value}`)

        if (e.target.value == 1) {
            console.log("naaaaaaaaaaaaa")

            public = true;
            console.log(public)
        } else {
            public = false;
            console.log(public)
        }
    }
}


const updateEventHandler = async (event) => {
    // try {

    event.preventDefault();
    const event_name = document.querySelector('#eventName').value;
    const location = document.querySelector('#location').value;
    const picture_path = document.querySelector('#formFile').value;
    const start_time = document.querySelector('#startTime').value;
    const end_time = document.querySelector('#endTime').value;
    const items = document.querySelector('#backpackItems').value;

    // get the radio button value

    const description = document.querySelector('#eventDescription').value;

    console.log(description)
    const eventId = document.querySelector('#updateEventSubmit').value;
    console.log(`/api/events/update/${eventId}`)
    console.log(event_name + " " + location + " " + picture_path + " " + start_time + " " + end_time + " " + public + " " + description + " " + eventId)
    const response = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        body: JSON.stringify({
            event_name,
            location,
            // start_time,
            // end_time,
            picture_path,
            description,
            public,
            // items: req.body.items,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log(response)
    alert('the Event has been updated')
    document.location.replace('/profile');



    // } catch (err) {
    //     alert('the event didnt updated')
    //     console.log(err)

    // }
};
document.querySelector('#updateEventSubmit').addEventListener('click', updateEventHandler);