
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve data from session storage
    const userDataString = sessionStorage.getItem('UserCredential');
    console.log(userDataString);
    if (userDataString) {
        // Parse the JSON string to get the JavaScript object
        const userData = JSON.parse(userDataString);
        
        // Display the user data on the page
        // console.log(userData);
        const userDataContainer1 = document.getElementsByClassName('Username');
        for (let i = 0; i < userDataContainer1.length; i++)
        {
            userDataContainer1[i].innerHTML = `${userData.username}`;
        }
        
        const userDataContainer2 = document.getElementsByClassName('Email');
        for (let i = 0; i < userDataContainer2.length; i++)
        {
            userDataContainer2[i].innerHTML = `${userData.email}`;
        }

    } else {
        window.location.replace("pages-login.html");
    }
});