// check the private/private event type 
let public = (document.querySelector("#public").getAttribute("checked") == "checked");
var photoArr = []

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

const myWidget = cloudinary.createUploadWidget(
    {
        cloudName: 'da2jrzaai',
        uploadPreset: 'usrvqzja',
        maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        multiple: false,
        theme: "minimal",
        cropping: true,
        croppingAspectRatio: 1.389,
    },
    (error, result) => {
        if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            document
                .getElementById("uploadedimage")
                .setAttribute("src", `https://res.cloudinary.com/da2jrzaai/image/upload/c_crop,g_custom/` + result.info.path);
            photoArr.push(result.info)
        }
    }
);

document.getElementById("upload_widget").addEventListener(
    "click", e => {
        e.preventDefault()
        myWidget.open();
    },
    false
);

const startEl = document.querySelector('#startTime');
const endEl = document.querySelector('#endTime')
// get current time
let date = new Date();
// take off offset
temp = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
// get rid of time zone and seconds
const curTime = temp.substring(0, temp.length - 8);

// set mins
startEl.min = curTime;
endEl.min = curTime;

//make it so you can't have end date before start date
startEl.addEventListener("change", e => {
    if (endEl.value < e.target.value) {
        endEl.value = e.target.value;
    }
})
endEl.addEventListener("change", e => {
    if (startEl.value > e.target.value) {
        startEl.value = e.target.value;
    }
})

// update Event
const updateEventHandler = async (event) => {
    event.preventDefault();
    const eventObj = {
        event_name: document.querySelector("#eventName").value.trim(),
        start_time: startEl.value,
        end_time: endEl.value,
        location: document.querySelector("#location").value.trim(),
        city: document.querySelector("#city").value.trim(),
        state: document.querySelector("#state").value.trim(),
        description: document.querySelector("#eventDescription").value.trim(),
        public: (document.querySelector("#public").checked),
    }

    if (photoArr.length) {
        eventObj.picture_path = photoArr[photoArr.length - 1].url.toString();
    }
    // update the event changes
    const eventId = document.querySelector('#updateEventSubmit').value;
    try {
        if (!eventObj.event_name) {
            alert("Please fill the Event name!")
        } else if (!eventObj.location) {
            alert("Please fill the Address!")
        } else if (!eventObj.city) {
            alert("Please fill the City!")
        } else if (!eventObj.state) {
            alert("Please fill the State!")
        } else if (!eventObj.start_time) {
            alert("Please fill the Start time!")
        } else if (!eventObj.end_time) {
            alert("Please fill the End time!")
        } else {
            const res = await fetch(`/api/events/${eventId}`, {
                method: 'PUT',
                body: JSON.stringify(eventObj),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                alert('the Event has been updated')
                location.href = '/profile';
            } else {
                alert('update failed')
            }
        }

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
            document.location.reload(true);
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
        if (item_name) {
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
            document.location.reload(true);

        } else {
            alert("please enter Item name")
        }

    } catch (err) {
        alert('the event didnt updated')
        console.log(err)
    }
};
document.querySelector('.newItemBtn').addEventListener('click', newItemHandler);

//Autocomplete state 
var stateInputEl = $('#state');
var handleSateList = function (event) {
    event.preventDefault();

    var nameInput = stateInputEl.val();
};

// Autocomplete widget
$(function () {
    let stateNames = [
        'AL',
        'AK',
        'AZ',
        'AR',
        'CA',
        'CO',
        'CT',
        'DE',
        'FL',
        'GA',
        'HI',
        'ID',
        'IL',
        'IN',
        'IA',
        'KS',
        'KY',
        'LA',
        'ME',
        'MD',
        'MA',
        'MI',
        'MN',
        'MS',
        'MO',
        'MT',
        'NE',
        'NV',
        'NH',
        'NJ',
        'NM',
        'NY',
        'NC',
        'ND',
        'OH',
        'OK',
        'OR',
        'PA',
        'RI',
        'SC',
        'SD',
        'TN',
        'TX',
        'UT',
        'VT',
        'VA',
        'WA',
        'WV',
        'WI',
        'WY',
    ];
    $('#state').autocomplete({
        source: stateNames,
    });
});

stateInputEl.on('click', handleSateList)