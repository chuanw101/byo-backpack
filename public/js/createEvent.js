const formEl = document.querySelector('#newEventForm')


console.log(formEl)
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
    "click", e=>{
     e.preventDefault()
      myWidget.open();
    },
    false
  );

document.querySelector("#newEventSubmit").addEventListener("click",e=>{
    e.preventDefault();

    console.log('click')
    console.log(document.querySelector("#startDate").value)
    const itemsTemp = document.querySelector("#backpackItems").value.split(',')
    const items = itemsTemp.map(item => item.trim())
    console.log(items)
    let photoURL = photoArr[0].url

    const eventObj = {
        event_name:document.querySelector("#eventName").value,
        start_time:document.querySelector("#startDate").value,
        end_time:document.querySelector("#endDate").value,
        location:document.querySelector("#location").value,
        description:document.querySelector("#eventDescription").value,
        picture_path:photoURL.toString(),
        items:items
    }

    console.log(eventObj.items)
    fetch("/api/events/",{
        method:"POST",
        body:JSON.stringify(eventObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            location.href="/profile"
        } else {
            alert("failed to upload event")
        }
    })
})