const { text } = require("body-parser");

const form = document.getElementById('student-form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // ذخیره اطلاعات در localStorage
    const studentData = {
        name: name,
        password: password,
        part: selectElement,
    };

     // بررسی وضعیت لاگین
     if (localStorage.getItem("isLoggedIn") === "true") {
        // اگر کاربر قبلاً لاگین کرده باشد، به داشبورد هدایت می‌شود
        window.location.href = "./dashboard.html";
    }

    localStorage.setItem('studentData', JSON.stringify(studentData));

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Server error!');
        }
    })
    .then(data => {
        Toastify({
            text: "✅ ورود موفقیت‌آمیز بود!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "green",
        }).showToast();

        // ⏳ یک تأخیر ۳ ثانیه‌ای برای نمایش Toastify و بعد ریدایرکت
        setTimeout(() => {
            window.location.href = './main/dashboard/index.html';
        }, 3000);

        form.reset(); 
    })
    .catch(error => {
        console.error('Error:', error);

        Toastify({
            text: "❌ خطای سرور! لطفاً بعداً امتحان کنید.",
            duration: 5000,
            gravity: "top",
            position: "right",
            backgroundColor: "red",
        }).showToast();
    });
});

// 📌 بازیابی اطلاعات ذخیره‌شده در localStorage بعد از رفرش صفحه
document.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('studentData');

    if (savedData) {
        const studentData = JSON.parse(savedData);
        document.getElementById('name').value = studentData.name;
        document.getElementById('password').value = studentData.password;
    }
});

function redirectUser(event) {
    event.preventDefault();

    const selectElement = document.getElementById('part');
    const selectedValue = selectElement.value;

    if (selectedValue === 'student') {
        window.location.href = './main/studentDashboard/index.html'
    }
    else if (selectedValue === 'teacher') {
        window.location.href = './main/dashboard/index.html'
    }
    else {
        Toastify({
            text: 'لطفا نقش خود را انتخاب کنید! ❌',
            duration: 5000,
            gravity: 'top',
            position: 'right',
            backgroundColor: 'red'
        }).showToast();
    }
}
