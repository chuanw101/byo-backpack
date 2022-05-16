// direct the Home page by clicking on the byob logo
const byobLogo = document.querySelector("#byob-logo");

byobLogo.addEventListener('click', byboLogoEvent);

function byboLogoEvent(e) {
    document.location.href = `/`;
}