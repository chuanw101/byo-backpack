
// search Location
const searchLocationHandler = async (event) => {
    try {

        event.preventDefault();
        const search_name = document.querySelector('#searchInput').value.trim();
        if (search_name) {
            console.log("search")
            document.location.replace(`/search/${search_name}`);

        } else {
            alert("please enter location!")
        }
    } catch (err) {
        alert('the event didnt updated')
        console.log(err)
    }
};
document.querySelector('#searchBtn').addEventListener('click', searchLocationHandler);