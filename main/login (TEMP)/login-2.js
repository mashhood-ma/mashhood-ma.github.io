document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('student-form');
    const phoneForm = document.getElementById('phone-form');

    // ✅ بازیابی اطلاعات ذخیره‌شده در localStorage برای فرم ثبت‌نام دانش‌آموز
    if (form) {
        const savedStudent = localStorage.getItem('studentData');
        if (savedStudent) {
            const studentData = JSON.parse(savedStudent);
            document.getElementById('name').value = studentData.name;
            document.getElementById('grade').value = studentData.grade;
        }

        form.addEventListener('submit', async function (event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const grade = document.getElementById('grade').value;

            // ✅ ذخیره اطلاعات در localStorage
            localStorage.setItem('studentData', JSON.stringify({ name, grade }));

            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts', { 
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, grade }),
                });

                const data = await response.json();
                console.log('Student added:', data);

                Toastify({
                    text: "✅ دانش‌آموز با موفقیت اضافه شد!",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "green",
                }).showToast();

                form.reset();
            } catch (error) {
                console.error('Error:', error);

                Toastify({
                    text: "❌ خطایی رخ داد. دوباره امتحان کنید.",
                    duration: 5000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "red",
                }).showToast();
            }
        });
    }

    // ✅ بازیابی اطلاعات ذخیره‌شده در localStorage برای فرم تأیید شماره موبایل
    if (phoneForm) {
        const savedPhone = localStorage.getItem('phoneNumber');
        if (savedPhone) {
            document.getElementById('phone').value = savedPhone;
        }

        phoneForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const phone = document.getElementById('phone').value;

            // ✅ ذخیره شماره تلفن در localStorage
            localStorage.setItem('phoneNumber', phone);

            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone }),
                });

                const data = await response.json();

                if (data.id) { 
                    document.getElementById('message').innerText = '✅ کد تأیید ارسال شد!';
                    document.getElementById('message').style.display = 'block';

                    setTimeout(() => {
                        window.location.href = 'login3.html?phone=' + phone;
                    }, 3000);
                } else {
                    Toastify({
                        text: "❌ مشکلی پیش آمد! دوباره امتحان کنید.",
                        duration: 5000,
                        gravity: "top",
                        position: "right",
                        backgroundColor: "red",
                    }).showToast();
                }
            } catch (error) {
                console.error('Error:', error);

                Toastify({
                    text: "❌ خطای سرور! لطفاً بعداً امتحان کنید.",
                    duration: 5000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "red",
                }).showToast();
            }
        });
    }
});
