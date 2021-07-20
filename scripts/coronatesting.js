// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBXiaG9IB9Q8KhJChEQd8PAaKZ-dUFE0lI",
  authDomain: "covidtesting-18293.firebaseapp.com",
  databaseURL: "https://covidtesting-18293-default-rtdb.firebaseio.com",
  projectId: "covidtesting-18293",
  storageBucket: "covidtesting-18293.appspot.com",
  messagingSenderId: "986378588118",
  appId: "1:986378588118:web:d20ffa765056fc66bfde77"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
//   var userInputRef=firebase.database().ref("UserInput");
//   document.getElementById("testform").addEventListener("submit", submitform);
// function submitform(e)
// {
//   e.preventDefault();
//   var fName=getValue("firstname");
//   var lName=getValue("lastname");
//   var prof=getValue("profession");
//   var email=getValue("email");
//   var emailStatus=checkEmail();
//   var dob=getValue("dateofbirth");
//   var phone=getValue("phone");
//   var state=getValue("state");
//   state=state.toLowerCase();
//   readState(state);
//   var symptoms=getSelectedCheckbox("symptoms");
//   var selectedOption=document.querySelectorAll("input[name=option]:checked").value;
//   if(emailStatus)
//   {
//     saveMessages(lName + " "+fName,phone,email,prof,dob,state,symptoms,selectedOption);
//   }

// }
// function getValue(id)
// {
//   return document.getElementById(id).value;
// }
// function getSelectedCheckbox(name)
// {
//   const checkboxes=document.querySelectorAll(`input[name="${name}"]:checked`);
//   let values=[];
//   checkboxes.forEach((checkbox) => {
//     values.push(checkbox.value);
//   });
//   return values;
// }
// function checkEmail()
// {
//   if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(testform.email.value))
//   {
//     return (true)
//   }
//     alert("You have entered an invalid email address!")
//     return (false)
// }
// function saveMessages(name,phone,email,prof,dob,state,symptoms,selectedOption)
// {
//   var newUserInput=userInputRef.push();
//   newUserInput.set({
//     name:name,
//     phone:phone,
//     email:email,
//     profession:prof,
//     dateofbirth:dob,
//     selectedOption:selectedOption,
//     state:state, 
//     symptomsList:symptoms
//   })
//   alert("Thank you, find the list of centers nearby!");
// }
// function readState(state)
// {
//   var centers;
//   var ref=firebase.database().ref("state");
//   ref.on("value", (data)=>{
//     centers=data.val();
//     document.getElementById("result").innerHTML="<br>"+centers.toUpperCase();
//   })
// }

/* Validation of data collected through form,
  on click event of Submit button, submitForm function is called */
  var UserInputsRef=firebase.database().ref('UserInputs');
  document.getElementById('testForm').addEventListener('submit',submitForm);
  
  /* function store input values in variables */
  function submitForm(e){
    e.preventDefault();
    var fname =getInputVal('firstname');
    var lname =getInputVal('lastname');
    var mobile =getInputVal('phone');
    var state =getInputVal('state');
    state=state.toLowerCase();
    readState(state);
    var email =getInputVal('email');
    var emailstatus=validateEmail();
    var profession =getInputVal('profession');
    var dateofbirth =getInputVal('dateofbirth');
    var symptomsList =getSelectedCheckboxValues('symptoms');
    var selectedOption = document.querySelector('input[name = option]:checked').value;
    /* function call to store data values in firebase
    after email id validation  */
    if(emailstatus)
    saveMessages(lname+ " " +fname,mobile,email,profession,dateofbirth,state,selectedOption,symptomsList);
}

/* function to accept state value as parameter, read database
 to return and display center details on web page */
function readState(state){
    var centers;
    var ref = firebase.database().ref(state);
    ref.on('value', (data) => {
     centers = data.val();
     document.getElementById("result").innerHTML ="<br>"+centers.toUpperCase();
    })
}
/* function to return input values as per the id passed as parameter */
function getInputVal(id){
    return document.getElementById(id).value;
}
/* function to write collected details in firebase,
create new record and add values in respective fields */
function saveMessages(name,mobile,email,profession,dateofbirth,state,selectedOption,symptomsList){
  var newuserInputsRef = UserInputsRef.push();
  newuserInputsRef.set({
      name:name,
      mobile:mobile,
      email:email,
      profession:profession,
      dateofbirth:dateofbirth,
      selectedOption:selectedOption,
      state:state, 
      symptomsList:symptomsList
  })
  alert("Thank you, find the list of centers nearby!  ");
}
  /* function to return value(s) of selcted checkboxes */
function getSelectedCheckboxValues(name) {
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  let values = [];
  checkboxes.forEach((checkbox) => {
      values.push(checkbox.value);
  });
  return values;
}

/* function to check if email id entered by user is valid */
function validateEmail() 
{
if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(testForm.email.value))
{
  return (true)
}
  alert("You have entered an invalid email address!")
  return (false)
}