let public = ( document.querySelector("#public").getAttribute("checked") == "checked" );

const radioButtons = document.querySelectorAll('input[name="eventType"]');
for (const radioButton of radioButtons) {
    radioButton.addEventListener('click', radioBtnEvent);

    function radioBtnEvent(e) {
        

        if (e.target.value == 1) {
            

            public = true;
            
        } else {
            public = false;
            
        }
    }
}

// update Event
const updateEventHandler = async (event) => {
    try {

    event.preventDefault();
    const event_name = document.querySelector('#eventName').value;
    const location = document.querySelector('#location').value;
    const picture_path = document.querySelector('#formFile').value;
    const start_time = document.querySelector('#startTime').value;
    const end_time = document.querySelector('#endTime').value;
    // const items = document.querySelector('#backpackItems').value;

    const description = document.querySelector('#eventDescription').value;

    const eventId = document.querySelector('#updateEventSubmit').value;
    
    const response = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        body: JSON.stringify({
            event_name,
            location,
            // start_time,
            // end_time,
            // picture_path,
            description,
            public,
            // items: req.body.items,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    alert('the Event has been updated')
    document.location.replace('/profile');



    } catch (err) {
        alert('the event didnt updated')
        console.log(err)

    }
};
document.querySelector('#updateEventSubmit').addEventListener('click', updateEventHandler);


// delete Item
const deleteItems = document.querySelectorAll(".deleteItem");
for (const deleteItem of deleteItems) {
    
    deleteItem.addEventListener('click', deleteEvent);

    async function deleteEvent(e) {
        e.preventDefault();
        const response = await fetch(`/api/items/${e.target.getAttribute("value")}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            document.location.replace(`/profile/update/${e.target.getAttribute("name")}`);
        } else {
            alert('Failed to delete');
        }
    }
}

// Add new Item
const newItemHandler = async (event) => {
    try {

    event.preventDefault();
    const item_name = document.querySelector('#newItem').value.trim();
    if(item_name){
        const eventId = document.querySelector(".newItemBtn").getAttribute("name");
        const owner_id = document.querySelector(".newItemBtn").value
            const response = await fetch(`/api/items/${eventId}`, {
                method: 'POST',
                body: JSON.stringify({
                    item_name,
                    owner_id,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            document.location.replace(`/profile/update/${eventId}`);
        
    }else{
        alert("please enter Item name")
    }
    


    } catch (err) {
        alert('the event didnt updated')
        console.log(err)

    }
};
document.querySelector('.newItemBtn').addEventListener('click', newItemHandler);
