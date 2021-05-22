const url = 'https://vue3-course-api.hexschool.io/';
const path = 'fred8196';
const addTestItem = document.querySelector('.addTestItem');

// 便於新增此頁面測試產品
addTestItem.addEventListener('click', e => {
    if (e.target.getAttribute('class').match('addTestItem')) {
        const product = {
            data: {
                title: 'Fred test',
                category: '衣服1',
                origin_price: 900,
                price: 600,
                unit: '個',
                description: 'Sit down please 名設計師設計',
                content: '這是內容',
                is_enabled: 1,
                imageUrl: 'https://images.unsplash.com/photo-1593642702909-dec73df255d7?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
        }
        axios.post(`${url}api/${path}/admin/product`, product)
            .then(res => {
                console.log(res);
                app.getProductData();
            })
            .catch(err => {
                console.log(err);
            })
    }
})

const app = {
    data: {
        productData: []
    },
    init() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${url}api/user/check`)
            .then(res => {
                if (res.data.success) {
                    this.getProductData();
                } else {
                    alert('請重新登入');
                    window.location = 'index.html';
                }
            })
            .catch(err => {
                console.log(err);
            })
    },
    getProductData() {
        axios.get(`${url}api/${path}/admin/products`)
            .then(res => {
                if (res.data.success) {
                    this.productData = res.data.products;
                    console.log(this.productData);
                    this.renderProductList();
                }
            })
            .catch(err => {
                console.log(err);
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
                    if (res.data.success) {
                        alert('刪除成功')
                        app.getProductData();
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },
}
app.init();