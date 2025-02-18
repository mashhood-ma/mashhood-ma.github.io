document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll(".otp-input");

    // ✅ بازیابی اطلاعات ذخیره‌شده در localStorage
    const savedOTP = localStorage.getItem('otp');
    if (savedOTP) {
        savedOTP.split('').forEach((digit, index) => {
            if (inputs[index]) inputs[index].value = digit;
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    let phone = urlParams.get('phone');

    if (!phone) {
        phone = localStorage.getItem('phoneNumber');
    } else {
        localStorage.setItem('phoneNumber', phone);
    }

    console.log("شماره تلفن: ", phone); 

    // ✅ مدیریت ورود و خروج کاربر در فیلدهای OTP
    inputs.forEach((input, index) => {
        input.addEventListener("input", (e) => {
            if (e.target.value.length === 1) {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            }
            // ✅ ذخیره OTP در localStorage
            const otp = Array.from(inputs).map(input => input.value).join('');
            localStorage.setItem('otp', otp);
        });

        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && index > 0 && input.value === "") {
                inputs[index - 1].focus();
            }
        });
    });

    document.getElementById('otp-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const otp = Array.from(inputs).map(input => input.value).join('');
        console.log("OTP وارد شده: ", otp);

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone: phone, otp: otp }),
        })
            .then(response => response.json())
            .then(data => {
                if (otp === '1234') {  
                    Toastify({
                        text: "✅ تأیید موفق!",
                        duration: 3000,
                        gravity: "top", 
                        position: "right",
                        backgroundColor: "green",
                    }).showToast();

                    // ✅ حذف اطلاعات از localStorage بعد از تأیید موفق
                    localStorage.removeItem('otp');
                    localStorage.removeItem('phoneNumber');

                    setTimeout(() => {
                        window.location.href = '../dashboard/index.html'; 
                    }, 2000);
                } else {
                    Toastify({
                        text: "❌ کد وارد شده اشتباه است!",
                        duration: 5000,
                        gravity: "top",
                        position: "right",
                        backgroundColor: "red",
                    }).showToast();
                }
            })
            .catch(error => {
                console.error('Error:', error);

                Toastify({
                    text: "❌ مشکلی پیش آمد! دوباره امتحان کنید.",
                    duration: 5000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "red",
                }).showToast();
            });
    });
});
