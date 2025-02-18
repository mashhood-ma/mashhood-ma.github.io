document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // بررسی تم ذخیره‌شده در localStorage
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
        body.classList.add("dark");
        themeToggle.innerHTML = '<i class="ri-sun-line"></i>';
    } else {
        themeToggle.innerHTML = '<i class="ri-moon-line"></i>';
    }

    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark");
        const newTheme = body.classList.contains("dark") ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        themeToggle.innerHTML = newTheme === "dark" ? '<i class="ri-sun-line"></i>' : '<i class="ri-moon-line"></i>';
    });

    // دریافت اطلاعات معلم از localStorage
    const userData = JSON.parse(localStorage.getItem("teacher"));
    if (userData) {
        document.getElementById("teacher-name").innerText = `${userData.firstName} ${userData.lastName}`;
        document.getElementById("teacher-code").innerText = userData.nationalCode;
    }

    // داده‌های نمودار
    const studentsChart = new Chart(document.getElementById("studentsChart"), {
        type: "bar",
        data: {
            labels: ["کلاس 1", "کلاس 2", "کلاس 3"],
            datasets: [{
                label: "تعداد دانش‌آموزان",
                data: [25, 30, 28],
                backgroundColor: "rgba(54, 162, 235, 0.5)"
            }]
        }
    });

    const gradesChart = new Chart(document.getElementById("gradesChart"), {
        type: "line",
        data: {
            labels: ["ریاضی", "علوم", "ادبیات"],
            datasets: [{
                label: "میانگین نمرات",
                data: [18, 15, 17],
                borderColor: "rgba(255, 99, 132, 1)",
                fill: false
            }]
        }
    });
});
