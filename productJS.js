const api_path = 'kana';
const baseUrl = 'https://vue3-course-api.hexschool.io'
const productList = document.querySelector('#productList');
const productCount = document.querySelector('#productCount');
const token = document.cookie.replace(/(?:(?:^|.*;\s*)logToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"); 

if(token == ''){
    window.location.href = "login.html";
}else{
    axios.defaults.headers.common['Authorization'] = token;
}

getProductList();
productList.addEventListener('click',(e)=>{
    if(e.target.dataset.action=='remove'){
        deleteItem(e.target.dataset.id);
    }
})

function getProductList(){
    axios.get(`${baseUrl}/api/${api_path}/products`)
    .then((res)=>{
        renderProductList(res.data.products);
        // console.log(res.data.products);
    })
}

function renderProductList(data){
    let str = '';
    let isOpen = '';
    data.forEach((item) => {
        if(item.is_enabled){
            isOpen = '已啟用';
        }else{
            isOpen = '未啟用';
        }
        str+=` <tr>
        <td>${item.title}</td>
        <td width="120">
          ${item.origin_price}
        </td>
        <td width="120">
          ${item.price}
        </td>
        <td width="100">
          <span class="">${isOpen}</span>
        </td>
        <td width="120">
          <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-id="${item.id}"> 刪除 </button>
        </td>
      </tr>`
    });
    productList.innerHTML = str;
    productCount.textContent = `${data.length}`;
}

function deleteItem(id){
// console.log(id);
axios.delete(`${baseUrl}/api/${api_path}/admin/product/${id}`)
.then((res)=>{
    getProductList();
    alert(res.data.message);
})
}