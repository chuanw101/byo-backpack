document.querySelector("#newEventSubmit").addEventListener("submit",e=>{
    e.preventDefault();
    const eventObj = {
        event_name:document.querySelector("#eventName").value,
        date:document.querySelector("#startDate").value,
        time:document.querySelector("startTime").value,
        location:document.querySelector("#location").value,
        description:document.querySelector("#description").value,
        picture_path:document.querySelector("#formFile").value,
        items:document.querySelector("#backpackItems").value.split(','),
    }
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