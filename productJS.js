const api_path = 'kana';
const baseUrl = 'https://vue3-course-api.hexschool.io/'
axios.get(`${baseUrl}api/${api_path}/products`)
.then((res)=>{
    console.log(res);
})