
//img Chnage 
let signupImg = document.getElementById('signup-img');
let originalImg = '../assets/images/other/mainbg1.a54313bf.png';
let newImg = '../assets/images/other/mainbg2.70dbb460.png';
let isOriginal = true;
function changeImg() {
  setTimeout(() => {
    // Change the image source
    signupImg.src = isOriginal ? newImg : originalImg;
    isOriginal = !isOriginal;
  }, 1000); 
}
setInterval(changeImg, 10000);

const notyf = new Notyf();
const form = document.getElementById('loginform')
form.addEventListener('submit',async (event)=>{
  event.preventDefault();

  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const emailvalue = email.value 
  const passwordvalue = password.value

  if(emailvalue.length == 0 || passwordvalue.length == 0){
    notyf.error('email or password is empty')
    email.style.border = '2px solid red'
    password.style.border = '2px solid red'
    setTimeout(() => {
      email.style.border = ''
      password.style.border = ''
    }, 2300);
  }
  else{
    try{
      const response = await fetch('http://localhost:3000/users');
      const users = await response.json();
      const emailExists = users.some(users => users.email === emailvalue);
      const user = users.find(user => user.email === emailvalue)
      if(emailExists){
        //if email exist
        // console.log(user.pass,passwordvalue)
        if(user.pass === passwordvalue){
          notyf.success(`welcom bc.game's hero..`)
        } 
        else{
          notyf.error('password or email was wrong!')
        }
      }
      else{
        notyf.error('please create first account')
      } 
    }
    catch{

    }
  }
})