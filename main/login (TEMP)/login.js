const form = document.getElementById('student-form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const grade = document.getElementById('grade').value;

    // ذخیره اطلاعات در localStorage
    const studentData = {
        name: name,
        grade: grade
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
            window.location.href = 'login-2.html';
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
        document.getElementById('grade').value = studentData.grade;
    }
});
