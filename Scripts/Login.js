function Validate() {
    var regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    var isValid = regex.test(document.getElementById("Email").value);
    if (!isValid) {
        //location.reload();
        alert("Enter a valid email address.");
    } else {
        window.open("../assignment-tracker/Home.html"/*, "_self"*/);
    }
    return isValid;
}