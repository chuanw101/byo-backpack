
// log in 
document.querySelector("#login").addEventListener("submit",e=>{
  e.preventDefault();
  const timeZoneOffset = new Date().getTimezoneOffset();
  const userObj = {
      user_name:document.querySelector("#loginUsername").value,
      password:document.querySelector("#loginPassword").value,
      timeZoneOffset
  }
  fetch("/api/users/login",{
      method:"POST",
      body:JSON.stringify(userObj),
      headers:{
          "Content-Type":"application/json"
      }
  }).then(res=>{
      if(res.ok){
        // reload last page
        window.location=document.referrer;
      } else {
          alert("login failed")
      }
  })
})