// show students list

let resault = document.querySelector('body');

resault.innerHTML += students.map((student) => {
    return (
        `<div class="card">
            <div class="img"></div>
            <div class="textBox">
                <div class="textContent">
                <p class="h1">${student.name}</p>
                <span class="span">${student.number}</span>
                </div>
                <p class="p">${student.course} , ${student.class}</p>
            </div>
        </div>`
    )    
})