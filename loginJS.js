const api_path = 'kana';
const baseUrl = 'https://vue3-course-api.hexschool.io';
const userName = document.querySelector('#username');
const password = document.querySelector('#password');
const loginBtn = document.querySelector('.btn-lg');

loginBtn.addEventListener('click',function(e){
  e.preventDefault();
login();
})


function login(){
 let url = `${baseUrl}/admin/signin`;
const user = {
  "username": userName.value,
  "password": password.value
};
axios.post(url, user)
  .then((res)=>{
  const token = res.data.token;
  const expired = res.data.expired;
  document.cookie = `logToken=${token}; expires=${new Date(expired)}; path=/`;
})
}


