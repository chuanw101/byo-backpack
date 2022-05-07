const loginFormHandler = async (event) => {
  event.preventDefault();

  // const user_name = document.querySelector('#email-login').value.trim();
  // const password = document.querySelector('#password-login').value.trim();
  const user_name = "saghar";
  const password = "123";
  if (user_name && password) {

    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ user_name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {

      document.location.replace('/profile');

    } else {


      alert('Failed to log in');
    }
  }
};

document
  .querySelector('.login')
  .addEventListener('click', loginFormHandler);