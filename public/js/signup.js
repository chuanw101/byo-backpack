const loginFormHandler = async (event) => {
  event.preventDefault();


  // const user_name = document.querySelector('#email-signup').value.trim();
  // const password = document.querySelector('#password-signup').value.trim();
  const user_name = "saghar2";
  const password = "12345678";
  if (user_name && password) {
    
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ user_name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to Sign Up');
    }
  }
};

document
  .querySelector('.signup')
  .addEventListener('click', loginFormHandler);
