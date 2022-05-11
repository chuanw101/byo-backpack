const formEl = document.querySelector('#newEventForm')
var photoArr = []

const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: 'da2jrzaai',
    uploadPreset: 'usrvqzja',
    maxImageFileSize: 2000000,  //restrict file size to less than 2MB
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

document.querySelector("#newEventSubmit").addEventListener("click", e => {
  e.preventDefault();

  // get items array
  const itemsTemp = document.querySelector("#backpackItems").value.split(',');
  const temp = itemsTemp.map(item => item.trim());
  const items = temp.filter(item => item);

  const eventObj = {
    event_name: document.querySelector("#eventName").value,
    start_time: document.querySelector("#startDate").value,
    end_time: document.querySelector("#endDate").value,
    location: document.querySelector("#location").value,
    description: document.querySelector("#eventDescription").value,
    items: items,
    public: (document.querySelector("#public").checked),
  }

  // add in photo url of last photo if photo uploaded
  if (photoArr.length) {
    eventObj.picture_path = photoArr[photoArr.length - 1].url.toString();
  }

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
})