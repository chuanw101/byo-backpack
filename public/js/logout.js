const logout = async () => {
  
  const response = await fetch('/logout', {
    
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {

  
    document.location.replace('/login');
  } else {
    alert('Failed to log out');
  }
};

// document.querySelector('#logout').addEventListener('click', logout);
