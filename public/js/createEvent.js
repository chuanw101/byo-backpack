
const formEl = document.querySelector('#newEventForm')
var photoArr = []

const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: 'da2jrzaai',
    uploadPreset: 'usrvqzja',
    maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    multiple: false,
    theme: "minimal"
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      document
        .getElementById("uploadedimage")
        .setAttribute("src", result.info.secure_url);
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

// make it so you can't have end date before start date
const startEl = document.querySelector('#startDate');
const endEl = document.querySelector('#endDate')
startEl.addEventListener("change", e => {
  endEl.min = e.target.value;
})
endEl.addEventListener("change", e => {
  startEl.max = e.target.value;
})

document.querySelector("#newEventSubmit").addEventListener("click", e => {
  e.preventDefault();

  // get items array
  const itemsTemp = document.querySelector("#backpackItems").value.split(',');
  const temp = itemsTemp.map(item => item.trim());
  const items = temp.filter(item => item);

  const eventObj = {
    event_name: document.querySelector("#eventName").value.trim(),
    start_time: document.querySelector("#startDate").value,
    end_time: document.querySelector("#endDate").value,
    location: document.querySelector("#location").value.trim(),
    city: document.querySelector("#city").value.trim(),
    state: document.querySelector("#state").value.trim(),
    description: document.querySelector("#eventDescription").value.trim(),
    items: items,
    public: (document.querySelector("#public").checked),
  }
  if (photoArr.length) {
    eventObj.picture_path = photoArr[photoArr.length - 1].url.toString();
  }
  if (!eventObj.event_name) {
    alert("Please fill the Event name!")
  }else if(!eventObj.location){
    alert("Please fill the Address!")
  }else if(!eventObj.city){
    alert("Please fill the City!")
  }else if(!eventObj.state){
    alert("Please fill the State!")
  }else if(!eventObj.start_time){
    alert("Please fill the Start time!")
  }else if(!eventObj.end_time){
    alert("Please fill the End time!")
  } else {
    // add in photo url of last photo if photo uploaded


    fetch("/api/events/", {
      method: "POST",
      body: JSON.stringify(eventObj),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.ok) {
        location.href = "/profile"
      } else {
        alert("failed to upload event")
      }
    })
  }
})

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
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'ME',
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