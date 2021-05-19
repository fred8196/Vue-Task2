const url = 'https://vue3-course-api.hexschool.io/';
const path = 'fred8196';
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const loginBtn = document.querySelector('#loginBtn');

loginBtn.addEventListener('click', () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    if (username == '' || password == '') {
        alert('請完整填寫帳號及密碼');
        return;
    }
    axios.post(`${url}admin/signin`,
        {
            username,
            password
        }).then(res => {
            console.log(res);
            const token = res.data.token;
            const expired = res.data.expired;
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
            if (res.data.success) {
                alert(res.data.message);
                window.location = 'admin.html'
            } else {
                alert(res.data.message);
            }
        })
})