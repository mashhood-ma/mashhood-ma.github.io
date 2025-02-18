// داده ها به صورت static

const classes = [
    { className:"10/1" , schoolName:"ماندگار امام صادق (ع)" , studentCount:"25 نفر" , course:"ریاضی"},
    { className:"10/2" , schoolName:"ماندگار امام صادق (ع)" , studentCount:"25 نفر" , course:"ریاضی"},
    { className:"10/3" , schoolName:"ماندگار امام صادق (ع)" , studentCount:"25 نفر" , course:"ریاضی"},
    { className:"11/1" , schoolName:"ماندگار امام صادق (ع)" , studentCount:"25 نفر" , course:"ریاضی"},
    { className:"11/2" , schoolName:"ماندگار امام صادق (ع)" , studentCount:"25 نفر" , course:"ریاضی"},
    { className:"11/3" , schoolName:"ماندگار امام صادق (ع)" , studentCount:"25 نفر" , course:"ریاضی"},
    { className:"12/1" , schoolName:"ماندگار امام صادق (ع)" , studentCount:"25 نفر" , course:"ریاضی"},
    { className:"12/2" , schoolName:"ماندگار امام صادق (ع)" , studentCount:"25 نفر" , course:"ریاضی"},
    { className:"12/3" , schoolName:"ماندگار امام صادق (ع)" , studentCount:"25 نفر" , course:"ریاضی"}
];

const result = document.querySelector('#parent-class');

classes.forEach(classes => {
    result.innerHTML += `<div class="card-class center bg-gray-200 flex-col gap-4">
            <h2 class="text-2xl">${classes.className}</h2>
            <div class="flex flex-row">
                <p>مدرسه :</p>
                <p>${classes.schoolName}</p>
            </div>
            <div class="flex flex-row">
                <p>رشته :</p>
                <p>${classes.course}</p>
            </div>
            <div class="flex flex-row">
                <p>تعداد دانش آموزان :</p>
                <p>${classes.studentCount}</p>
            </div>
            <div><i class="ri-delete-bin-fill"></i>
                <span> | </span>
                <i class="ri-user-add-fill"></i>
                <span> | </span>
                <i class="ri-user-minus-fill"></i>
                <span> | </span>
                <i class="ri-edit-2-fill"></i>
            </div>
        </div>`
}); 