//Navigation
const openbtn = document.getElementById('open-menu');
const menu = document.getElementById('overlay');

openbtn.onclick =  function functionName() {
  openbtn.classList.toggle('active')
  menu.classList.toggle('active')
}

document.onclick = function(clickEvent){
  if (clickEvent.target.id !== 'open-menu' && clickEvent.target.id !== 'overlay') {
    openbtn.classList.remove('active')
    menu.classList.remove('active')
  }
}



//Client side Form validation
function validate(){
  var name = document.getElementById("name");
  var email = document.getElementById("email");
  var subject = document.getElementById('subject');
  var message = document.getElementsByName('message');

  if(name.value.trim() == "" || email.value.trim() == "" || subject.value.trim() == "" || message.value.trim() == "")
  {
    alert("No blank fields allowed");
    return false;
  }
  else
  {
    true;
  }
}



function submitToAPI(e) {
   e.preventDefault();
//       var URL = "API Gateway";

   var name = document.getElementById("name").value;
   var email = document.getElementById("email").value;
   var subject = document.getElementById("subject").value;
   var message = document.getElementById("message").value;
      if (name=="" || email=="" || subject=="" || message==""){
               document.getElementById('alert-danger').innerHTML="Please Ensure All Fields Are Filled";
               document.getElementById('alert-success').innerHTML="";
               return false;
             }
             emailregex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
             		if(!emailregex.test(email)) {
                  document.getElementById('alert-danger').innerHTML="Please Enter a Valid Email Address";
                  document.getElementById('alert-success').innerHTML="";
                  return false;
             		}

   var data = {
      name : name,
      email : email,
      subject : subject,
      message : message
    };

var xmlhttp = new XMLHttpRequest();
xmlhttp.open("POST", "https://hecj3xtxmc.execute-api.us-east-1.amazonaws.com/production/mail");
xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.send(JSON.stringify(data));
xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState === 4) {
  var response = JSON.parse(xmlhttp.responseText);
  if (xmlhttp.status === 200 ) {
    console.log('successful');

    document.getElementById('alert-success').innerHTML="Thank you for the email! We'll get back to you as soon as possible!";
    document.getElementById('alert-danger').innerHTML="";

    } else {
      console.log('failed');
  }
}
}

document.getElementById('contact-form').reset();
}
