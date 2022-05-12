
// search Location
const searchLocationHandler = async (event) => {
    try {

        event.preventDefault();
        const search_name = document.querySelector('#searchInput').value.split(',');
        const locationArr = search_name.map(name => name.trim());

        if (locationArr != "") {
            if (locationArr.length === 1) {

                document.location.replace(`/search/${locationArr[0]}`);
            }
            else {
                document.location.replace(`/search/${locationArr[0]}/${locationArr[1]}`);
            }

        } else {
            alert("please enter location!")
        }
    } catch (err) {
        alert('Search failed!')
        console.log(err)
    }
};
document.querySelector('#searchBtn').addEventListener('click', searchLocationHandler);