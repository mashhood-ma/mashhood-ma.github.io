
        // داده‌های نمودار ستونی (نمرات دروس)
        const barChartData = {
            labels: ['ریاضی', 'فیزیک', 'شیمی', 'زیست‌شناسی', 'ادبیات', 'دینی'],
            datasets: [{
                label: 'نمرات',
                data: [17, 19, 16, 18, 14, 15],
                backgroundColor: 'rgba(75, 192, 192, 0.5)', // رنگ شفاف ستونی
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        };

        // داده‌های نمودار خطی (پیشرفت دروس)
        const lineChartData = {
            labels: ['مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
            datasets: [
                {
                    label: 'ریاضی',
                    data: [15, 16, 17, 18, 17, 18],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'فیزیک',
                    data: [14, 15, 17, 18, 19, 20],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: true,
                    tension: 0.4
                }
            ]
        };

        // تنظیمات و ایجاد نمودار ستونی
        const ctxBar = document.getElementById('barChart').getContext('2d');
        const barChart = new Chart(ctxBar, {
            type: 'bar',
            data: barChartData,
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

        // تنظیمات و ایجاد نمودار خطی
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
