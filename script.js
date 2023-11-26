// window.onload=function(){

// if the user tries to access the profile.html but user is not logged in
if(window.location.pathname=="/profile.html" && !localStorage.getItem("accessToken")){
    window.location.href="index.html";
}
// if user is trying to acces the signup page but the user is logged in
if(window.location.pathname=="/index.html" && localStorage.getItem("accessToken")){
    window.location.href="profile.html"
}

// If the user is not logged in and is trying to signup
if (window.location.pathname == "/index.html") {
  let form = document.getElementById("signupForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");

    console.log(
      username.value,
      email.value,
      password.value,
      confirmPassword.value
    );

    let array = new Uint8Array(16);
    console.log(array);
    // This line creates a new array of 16 random numbers,
    // Each number can be anything from 0 to 255
    window.crypto.getRandomValues(array);
    console.log(array);
    // This line user inbuilt system function to generate 16 random numbers
    // Making sure that they are really random
    // We then added the random numbers in the array
    // 0 to 255
    // Final Step
    let accessToken = Array.from(array, (b) =>
      b.toString(16).padStart(2, "0")
    ).join("");

    //b.toString(16)-> changes each number in the array into a string with base 16(a-f and 0-9);
    //.padStart(2, "0")-> adds a zero at the start of the number if it is a single digit
    //join("")-> Converts the array into a concatenated string
    console.log(accessToken);

    let user = {
      username: username.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      accessToken: accessToken,
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", JSON.stringify(accessToken));

    setTimeout(function () {
      window.location.href = "profile.html";
    }, 1000);
  });
} else if (window.location.pathname == "/profile.html") {
  let user = JSON.parse(localStorage.getItem("user"));
  let profiletext = `
        <p>Full Name: ${user.username}<p/>
        <p>Email: ${user.email}<p/>
        <p>Token: ${user.accessToken}<p/>
        <p>Password: ${user.password}<p/>
        `;
    document.getElementById("profile-info").innerHTML=profiletext;

    let logoutbtn=document.getElementById("logout-btn");
    logoutbtn.addEventListener('click',function(){
        localStorage.clear();
        document.getElementById('message').innerText="Logging Out";

        setTimeout(function(){
            window.location.href = "index.html";
        },2000)
    })
}

// }
