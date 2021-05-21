

// const baseUrl = 'https://vue3-course-api.hexschool.io';
const userName = document.querySelector('#username');
const password = document.querySelector('#password');
const loginBtn = document.querySelector('.btn-lg');



const logInMethods = {
  data:{
    baseUrl: 'https://vue3-course-api.hexschool.io',
  },
  logInBtnEvent(){
    loginBtn.addEventListener('click',(e)=>{
      e.preventDefault();
      let user = {
        "username": `${userName.value}`,
        "password": `${password.value}`
        }
      this.login(user);
    })
  },
  login(user){
    axios.post(`${this.data.baseUrl}/admin/signin`, user)
    .then((res)=>{
      if(res.data.success==true){
        const token = res.data.token;
        const expired = res.data.expired;
        document.cookie = `logToken=${token}; expires=${new Date(expired)}; path=/`;
        window.location.href = "productList.html";
        return;
      }
      })
  },
  init(){
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)logToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"); 
    axios.defaults.headers.common['Authorization'] = token;
    
    axios.post(`${this.data.baseUrl}/api/user/check`)
    .then((res)=>{
      if(res.data.success == true){
        window.location.href = "productList.html";
        return;
      }
    })
    }
}

logInMethods.init();
logInMethods.logInBtnEvent();
// function login(){
//  let url = `${baseUrl}/admin/signin`;
// const user = {
//   "username": userName.value,
//   "password": password.value
// };
// axios.post(url, user)
//   .then((res)=>{
//     console.log(res.data);
//     if(res.data.success==true){
//       const token = res.data.token;
//       const expired = res.data.expired;
//       document.cookie = `logToken=${token}; expires=${new Date(expired)}; path=/`;
//       window.location.href = "productList.html";
//       return;
//     }
//     })
// }
// function isLogIn(){
// const token = document.cookie.replace(/(?:(?:^|.*;\s*)logToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"); 
// // console.log(token);
// axios.defaults.headers.common['Authorization'] = token;

// axios.post(`${baseUrl}/api/user/check`)
// .then((res)=>{
//   if(res.data.success == true){
//     window.location.href = "productList.html";
//     return;
//   }
// })
// }
 
// function getProductList(){
  
  // axios.get(`${baseUrl}/api/${api_path}/admin/products`)
  // .then((res)=>{
  //   console.log(res.data.products);
  // })
// }
