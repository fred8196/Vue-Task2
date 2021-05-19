const url = 'https://vue3-course-api.hexschool.io/';
const path = 'fred8196';

const app = {
    data: {
        productData: []
    },
    init() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${url}api/user/check`)
            .then(res => {
                this.getProductData();
            })
    },
    getProductData() {
        axios.get(`${url}api/${path}/admin/products`)
            .then(res => {
                this.productData = res.data.products;
                console.log(this.productData);
                this.renderProductList();
            })
    },
    renderProductList() {
        const productList = document.querySelector('#productList');
        const productCount = document.querySelector('#productCount');
        let str = '';
        this.productData.forEach(item => {
            str += `<tr>
            <td>${item.title}</td>
            <td width="120">
                ${item.origin_price}
            </td>
            <td width="120">
                ${item.price}
            </td>
            <td width="100">
                <span class="">${item.is_enabled ? '啟用' : '未啟用'}</span>
            </td>
            <td width="120">
                <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn"
                    data-action="remove" data-id=${item.id}> 刪除 </button>
            </td>
        </tr>`
        })
        productList.innerHTML = str;
        productCount.textContent = this.productData.length;
        productList.addEventListener('click', this.deleteItem)
    },
    deleteItem(e) {
        if (e.target.dataset.action === 'remove') {
            axios.delete(`${url}api/${path}/admin/product/${e.target.dataset.id}`)
                .then(res => {
                    console.log(res);
                    alert('刪除成功')
                    app.getProductData();
                })
        }
    }
}
app.init();