document.addEventListener("DOMContentLoaded", () => {
    const savedData = JSON.parse(localStorage.getItem("userData")) || {};
    const profileImage = document.getElementById("profileImage");
    const profileInput = document.getElementById("profileInput");
    const changeProfileBtn = document.getElementById("changeProfileBtn");
    const settingsForm = document.getElementById("settingsForm");
    const changePasswordBtn = document.getElementById("changePasswordBtn");

    // مقداردهی اولیه به فیلدها (در صورت وجود اطلاعات ذخیره‌شده)
    document.getElementById("fullName").value = savedData.fullName || "";
    document.getElementById("email").value = savedData.email || "";
    document.getElementById("phoneNumber").value = savedData.phoneNumber || "";
    document.getElementById("nationalCode").value = savedData.nationalCode || "";

    // مقداردهی عکس پروفایل (در صورت وجود)
    if (savedData.profileImage) {
        profileImage.src = savedData.profileImage;
    }

    // وقتی روی دکمه "تغییر عکس" کلیک شد، انتخابگر فایل باز شود
    changeProfileBtn.addEventListener("click", () => {
        profileInput.click();
    });

    // تغییر عکس پروفایل و ذخیره در localStorage
    profileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileImage.src = e.target.result;

                // به‌روزرسانی عکس در localStorage
                const updatedData = JSON.parse(localStorage.getItem("userData")) || {};
                updatedData.profileImage = e.target.result;
                localStorage.setItem("userData", JSON.stringify(updatedData));

                // نمایش SweetAlert فقط هنگام تغییر عکس
                Swal.fire({
                    title: "موفق!",
                    text: "عکس پروفایل تغییر کرد و ذخیره شد.",
                    icon: "success",
                    confirmButtonText: "باشه",
                    customClass: {
                        confirmButton: "custom-confirm-button"
                    }
                });
            };
            reader.readAsDataURL(file);
        }
    });

    // ذخیره اطلاعات هنگام ارسال فرم
    settingsForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const userData = {
            fullName: document.getElementById("fullName").value,
            email: document.getElementById("email").value,
            phoneNumber: document.getElementById("phoneNumber").value,
            nationalCode: document.getElementById("nationalCode").value,
            profileImage: profileImage.src,
        };

        localStorage.setItem("userData", JSON.stringify(userData));

        Swal.fire({
            title: "موفق!",
            text: "اطلاعات با موفقیت ذخیره شد.",
            icon: "success",
            confirmButtonText: "باشه",
            customClass: {
                confirmButton: "custom-confirm-button"
            }
        });

        setTimeout(() => {
            window.location.href = '../dashboard/index.html';
        }, 2000);
    });

    // تغییر رمز عبور
    changePasswordBtn.addEventListener("click", () => {
        Swal.fire({
            title: "تغییر رمز عبور",
            html: `
                <div class="relative w-full">
                    <input type="password" id="newPassword" class="swal2-input text-right" placeholder="رمز جدید">
                </div>
                <div class="relative w-full mt-3">
                    <input type="password" id="confirmPassword" class="swal2-input text-right" placeholder="تکرار رمز جدید">
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: "ذخیره",
            cancelButtonText: "لغو",
            width: "400px",
            customClass: {
                confirmButton: "custom-confirm-button",
                cancelButton: "custom-cancel-button"
            },
            preConfirm: () => {
                const newPassword = Swal.getPopup().querySelector("#newPassword").value;
                const confirmPassword = Swal.getPopup().querySelector("#confirmPassword").value;

                if (!newPassword || !confirmPassword) {
                    Swal.showValidationMessage("لطفاً تمام فیلدها را پر کنید!");
                    return false;
                }

                if (newPassword.length < 6) {
                    Swal.showValidationMessage("رمز باید حداقل ۶ کاراکتر باشد!");
                    return false;
                }

                if (newPassword !== confirmPassword) {
                    Swal.showValidationMessage("رمزها مطابقت ندارند!");
                    return false;
                }

                localStorage.setItem("userPassword", newPassword);
                return newPassword;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "موفق!",
                    text: "رمز عبور تغییر کرد و ذخیره شد!",
                    icon: "success",
                    confirmButtonText: "باشه",
                    customClass: {
                        confirmButton: "custom-confirm-button"
                    }
                });
            }
        });
    });
});
