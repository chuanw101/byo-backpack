document.querySelector("#login").addEventListener("submit",e=>{
  e.preventDefault();
  const userObj = {
      user_name:document.querySelector("#loginUsername").value,
      password:document.querySelector("#loginPassword").value,
  }
  fetch("/api/users/login",{
      method:"POST",
      body:JSON.stringify(userObj),
      headers:{
          "Content-Type":"application/json"
      }
  }).then(res=>{
      if(res.ok){
        document.location.href = '/profile';
      } else {
          alert("login failed")
      }
  })
})