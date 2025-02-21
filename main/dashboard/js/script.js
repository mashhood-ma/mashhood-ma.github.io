// داده‌های نمودار ستونی (مقایسه کلاس‌ها)
const columnChartData = {
    labels: [
        'کلاس 1', 'کلاس 2', 'کلاس 3', 'کلاس 4', 'کلاس 5', 'کلاس 6', 'کلاس 7', 'کلاس 8',
        'کلاس 9', 'کلاس 10', 'کلاس 11', 'کلاس 12'
    ],
    datasets: [{
        label: 'میانگین نمرات کلاس‌ها',
        data: [15, 18, 17, 14, 16, 19, 18, 16, 17, 15, 14, 16],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
};

// تنظیمات نمودار ستونی
const ctxColumn = document.getElementById('barChart').getContext('2d');
const columnChart = new Chart(ctxColumn, {
    type: 'bar',
    data: columnChartData,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 20
            }
        }
    }
});

// داده‌های نمودار خطی (دروس مختلف)
const lineChartData = {
    labels: ['مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند', 'فروردین', 'اردیبهشت', 'خرداد'],
    datasets: [
        {
            label: 'ریاضی',
            data: [16, 17, 18, 14, 17, 19, 18, 19, 20],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
            tension: 0.4
        },
        {
            label: 'فیزیک',
            data: [18, 17, 19, 16, 18, 19, 20, 18, 20],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,
            tension: 0.4
        },
        {
            label: 'شیمی',
            data: [17, 18, 19, 16, 17, 18, 20, 19, 20],
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true,
            tension: 0.4
        }
    ]
};

// تنظیمات نمودار خطی
const ctxLine = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(ctxLine, {
    type: 'line',
    data: lineChartData,
    options: {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true,
                max: 20
            }
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const studentForm = document.getElementById("studentForm");
    const studentTableBody = document.querySelector("#studentTable tbody");

    // بارگزاری دانش‌آموزان از LocalStorage
    let students = JSON.parse(localStorage.getItem("students")) || [];

    // ذخیره دانش‌آموزان در LocalStorage
    function saveStudentsToLocalStorage() {
        localStorage.setItem("students", JSON.stringify(students));
    }

    // رویداد ارسال فرم
    studentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // خواندن اطلاعات فرم
        const name = document.getElementById("name").value.trim();
        const className = document.getElementById("class").value.trim();
        const nationalCode = document.getElementById("nationalCode").value.trim();
        const mathScore = parseInt(document.getElementById("mathScore").value || 0);
        const physicsScore = parseInt(document.getElementById("physicsScore").value || 0);
        const chemistryScore = parseInt(document.getElementById("chemistryScore").value || 0);
        const date = document.getElementById("date").value;

        if (!name || !className || !nationalCode || !date) {
            alert("لطفاً اطلاعات را به درستی وارد کنید.");
            return;
        }

        // پیدا کردن دانش‌آموز موجود
        const existingStudent = students.find(
            (s) => s.name === name && s.nationalCode === nationalCode
        );

        if (existingStudent) {
            // اگر دانش‌آموز موجود باشد، نمرات جدید به لیست نمرات اضافه می‌شوند
            if (mathScore > 0) existingStudent.scores.push({ subject: "ریاضی", score: mathScore, date });
            if (physicsScore > 0) existingStudent.scores.push({ subject: "فیزیک", score: physicsScore, date });
            if (chemistryScore > 0) existingStudent.scores.push({ subject: "شیمی", score: chemistryScore, date });
        } else {
            // اگر دانش‌آموز جدید است، به لیست اضافه می‌شود
            const newStudent = {
                name,
                className,
                nationalCode,
                scores: [],
            };

            if (mathScore > 0) newStudent.scores.push({ subject: "ریاضی", score: mathScore, date });
            if (physicsScore > 0) newStudent.scores.push({ subject: "فیزیک", score: physicsScore, date });
            if (chemistryScore > 0) newStudent.scores.push({ subject: "شیمی", score: chemistryScore, date });

            students.push(newStudent);
        }

        // به‌روزرسانی جدول
        updateStudentTable();

        // ذخیره اطلاعات در LocalStorage
        saveStudentsToLocalStorage();

        // پاک کردن فرم
        studentForm.reset();
    });

    // تابع برای به‌روزرسانی جدول
    function updateStudentTable() {
        studentTableBody.innerHTML = ""; // خالی کردن جدول

        students.forEach((student) => {
            const row = document.createElement("tr");

            // ستون نام
            const nameCell = document.createElement("td");
            nameCell.textContent = student.name;
            nameCell.classList.add(
                "px-6",
                "py-4",
                "whitespace-nowrap",
                "text-sm",
                "font-medium",
                "text-gray-900",
                "cursor-pointer"
            );
            nameCell.setAttribute("data-name", student.name); // برای کلیک

            // ستون کلاس
            const classCell = document.createElement("td");
            classCell.textContent = student.className;
            classCell.classList.add(
                "px-6",
                "py-4",
                "whitespace-nowrap",
                "text-sm",
                "text-gray-500"
            );

            // ستون کد ملی
            const nationalCodeCell = document.createElement("td");
            nationalCodeCell.textContent = student.nationalCode;
            nationalCodeCell.classList.add(
                "px-6",
                "py-4",
                "whitespace-nowrap",
                "text-sm",
                "text-gray-500"
            );

            // ستون آخرین تاریخ
            const dateCell = document.createElement("td");
            const lastScoreDate =
                student.scores[student.scores.length - 1]?.date || "-";
            dateCell.textContent = lastScoreDate;
            dateCell.classList.add(
                "px-6",
                "py-4",
                "whitespace-nowrap",
                "text-sm",
                "text-gray-500"
            );

            // ستون عملیات (حذف)
            const actionsCell = document.createElement("td");
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "حذف";
            deleteButton.classList.add(
                "px-4",
                "py-2",
                "bg-red-500",
                "text-white",
                "rounded",
                "hover:bg-red-600",
                "text-sm",
                "font-medium"
            );
            deleteButton.addEventListener("click", function () {
                row.remove();
                students.splice(students.indexOf(student), 1); // حذف از آرایه
                saveStudentsToLocalStorage(); // به‌روزرسانی LocalStorage
            });
            actionsCell.appendChild(deleteButton);
            actionsCell.classList.add(
                "px-6",
                "py-4",
                "text-sm",
                "font-medium"
            );

            // اضافه کردن سلول‌ها به ردیف
            row.appendChild(nameCell);
            row.appendChild(classCell);
            row.appendChild(nationalCodeCell);
            row.appendChild(dateCell);
            row.appendChild(actionsCell);

            // اضافه کردن ردیف به جدول
            studentTableBody.appendChild(row);
        });
    }

    // تابع نمایش مودال
    function showStudentModal(studentName) {
        const student = students.find((s) => s.name === studentName);
        if (!student) return;

        // ایجاد داده‌های نمودار خطی
        const chartData = {
            labels: student.scores.map((score) => score.date),
            datasets: [
                {
                    label: `نمرات ${student.name}`,
                    data: student.scores.map((score) => score.score),
                    borderColor: "rgba(54, 162, 235, 1)",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    fill: true,
                    tension: 0.4,
                },
            ],
        };

        const modal = document.getElementById("studentModal");
        if (!modal) return;

        // پاک کردن نمودار قبلی
        const ctxModalChart = modal.querySelector("canvas").getContext("2d");
        if (modal.chartInstance) {
            modal.chartInstance.destroy(); // نابجا کردن نمودار قبلی
        }

        // رسم نمودار جدید
        modal.chartInstance = new Chart(ctxModalChart, {
            type: "line",
            data: chartData,
            options: {
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true,
                    },
                    y: {
                        beginAtZero: true,
                        max: 20,
                    },
                },
            },
        });

        // نمایش مودال
        modal.style.display = "block";
    }

    // بستن مودال
    function closeModal() {
        const modal = document.getElementById("studentModal");
        if (!modal) return;
        modal.style.display = "none";

        // پاک کردن نمودار موجود
        if (modal.chartInstance) {
            modal.chartInstance.destroy();
        }
    }

    // اضافه کردن کلیک به اسم دانش‌آموزان
    document.querySelector("#studentTable tbody").addEventListener("click", function (event) {
        if (
            event.target.tagName === "TD" &&
            event.target.hasAttribute("data-name")
        ) {
            const name = event.target.getAttribute("data-name");
            showStudentModal(name);
        }
    });

    // بستن مودال با دکمه
    document.getElementById("closeModalBtn")?.addEventListener("click", closeModal);

    // بارگزاری داده‌ها از LocalStorage و به‌روزرسانی جدول
    updateStudentTable();
});

// حالت دارک و لایت تم

const darkModeBtn = document.getElementById("themee");

const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    darkModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    });

    // document.addEventListener("DOMContentLoaded", function () {
    //     // بررسی وضعیت لاگین
    //     if (localStorage.getItem("isLoggedIn") !== "true") {
    //         // اگر کاربر لاگین نکرده باشد، به صفحه لاگین هدایت می‌شود
    //         window.location.href = "./login.html";
    //     }
    
    //     // رویداد خروج از حساب
    //     document.getElementById("logout-btn").addEventListener("click", function () {
    //         // حذف وضعیت لاگین از Local Storage
    //         localStorage.removeItem("isLoggedIn");
    
    //         // هدایت به صفحه لاگین
    //         window.location.href = "./login.html";
    //     });
    // });
    