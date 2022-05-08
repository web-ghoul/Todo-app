let createdInput = document.querySelector('section form input')
let createdButton = document.querySelector('section form button')
let footList = document.querySelectorAll('section .foot ul li')
let allState = document.querySelector('section .foot ul .all')
let activeState = document.querySelector('section .foot ul .act')
let completeState = document.querySelector('section .foot ul .complete')


//Button To Add New Task Handle
createdButton.addEventListener('click', function(e) {
    e.preventDefault()
    createdButton.firstElementChild.classList.toggle('active')
    let newTask = createdInput.value
    if (newTask !== '') {
        storageHandle(newTask)
    }
    createdInput.value = ''
    dataHandle()
    checkState()
})

//Input Handle
createdInput.addEventListener('focus', function() {
    createdButton.firstElementChild.classList.remove('active')
})

//List Of States Of Tasks Hanlde
footList.forEach((list) => {
    list.addEventListener('click', function() {
        footList.forEach((li) => {
            li.classList.remove('active')
        })
        state(list)
        list.classList.add('active')
    })
})

//All State Handle
allState.addEventListener('click', function() {
    if (localStorage.getItem('tasks')) {
        all()
    }
})

//Active State Handle
activeState.addEventListener('click', function() {
    if (localStorage.getItem('tasks')) {
        active()
    }
})

//Complete State Handle
completeState.addEventListener('click', function() {
    if (localStorage.getItem('tasks')) {
        completed()
    }
})

//Data Show Handle
function dataHandle() {
    let lists = document.querySelector('section .content .lists')
    if (localStorage.getItem('tasks')) {
        let array = JSON.parse(localStorage.getItem('tasks'))
        let tasks = ''
        footList.forEach((list) => {
            if (list.textContent === array[0].state) {
                footList.forEach((li) => {
                    li.classList.remove('active')
                })
                list.classList.add('active')
            }
        })
        for (let i = 0; i < array.length; i++) {
            tasks += `  <li class= "${array[i].hide ? `${array[i].id} hide`: `${array[i].id}`}" >
                            <div class="task">
                                <span class="check ${array[i].active ? "": "active"}" onclick = "checks(this)">
                                    <i class="fas fa-check"></i>
                                </span>
                                <span class='do ${array[i].active ? "":"line"}' onclick = "doTask(this)">${array[i].name}</span>
                            </div>
                            <div class="icon" onclick="closed(this)">
                                <img src="./images/icon-cross.svg" alt="">
                            </div>
                        </li>`
        }
        lists.innerHTML = tasks
    } else {
        lists.innerHTML = ` <li style="justify-content:center">
                                <div class="task" >
                                    <span style="text-align:center">Add your tasks</span>
                                </div>
                            </li>`
    }
    counting()
}

//Control Of LocalStorage
function storageHandle(task) {
    let array = []
    let taskObj = {
        'name': task,
        'active': true,
        'hide': false,
        'state': 'All'
    }
    if (localStorage.getItem('tasks')) {
        array = JSON.parse(localStorage.getItem('tasks'))
        taskObj.id = array[array.length-1].id+1
        array.push(taskObj)
        localStorage.setItem('tasks', JSON.stringify(array))
    } else {
        taskObj.id = 0
        array.push(taskObj)
        localStorage.setItem('tasks', JSON.stringify(array))
    }
}

//Close Button Handle
function closed(e) {
    let array = JSON.parse(localStorage.getItem('tasks'))
    let elID = e.parentElement.classList[0]
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === +elID) {
            array[i] = ''
        }
    }
    array = array.filter((e) => e != '')
    if (array.length > 0) {
        localStorage.setItem('tasks', JSON.stringify(array))
    } else {
        localStorage.clear()
    }
    dataHandle()
}

//Counter Of Tasks Handle
function counting() {
    let counter = document.querySelector('section .foot .counter span')
    if (localStorage.getItem('tasks')) {
        let array = JSON.parse(localStorage.getItem('tasks'))
        counter.innerHTML = array.length
    } else {
        counter.innerHTML = '0'
    }
}


//Call Function
dataHandle()

//Check If Tasks Complete Or Not Handle
function checks(check) {
    check.classList.toggle('active')
    check.nextElementSibling.classList.toggle('line')
    let array = JSON.parse(localStorage.getItem('tasks'))
    let elIndex = check.parentElement.parentElement.classList[0]
    for(let i=0;i<array.length;i++){
        if(array[i].id === +elIndex){
            if (check.classList.contains('active')) {
                array[i].active = false
            } else {
                array[i].active = true
            }
        }
    }
    localStorage.setItem('tasks', JSON.stringify(array))
    checkState()
}

//Check If Tasks Complete Or Not Handle
function doTask(task) {
    task.classList.toggle('line')
    task.previousElementSibling.classList.toggle('active')
    let array = JSON.parse(localStorage.getItem('tasks'))
    let elIndex = task.parentElement.parentElement.classList[0]
    for(let i=0;i<array.length;i++){
        if(array[i].id === +elIndex){
            if (task.classList.contains('line')) {
                array[i].active = false
            } else {
                array[i].active = true
            }
        }
    }
    localStorage.setItem('tasks', JSON.stringify(array))
    checkState()
}

//All State Function Handle
function all() {
    let array = JSON.parse(localStorage.getItem('tasks'))
    for (let i = 0; i < array.length; i++) {
        array[i].hide = false
    }
    localStorage.setItem('tasks', JSON.stringify(array))
    dataHandle()
}

//Active State Function Handle
function active() {
    let lists = document.querySelectorAll('section .content .lists li')
    let array = JSON.parse(localStorage.getItem('tasks'))
    lists.forEach((list) => {
        let elID = list.classList[0]
        if (list.firstElementChild.firstElementChild.classList.contains('active')) {
            for (let i = 0; i < array.length; i++) {
                if (array[i].id === +elID) {
                    array[i].hide = true
                }
            }
        } else {
            for (let i = 0; i < array.length; i++) {
                if (array[i].id === +elID) {
                    array[i].hide = false
                }
            }
        }
    })
    localStorage.setItem('tasks', JSON.stringify(array))
    dataHandle()
}

//Complete State Function Handle
function completed() {
    let lists = document.querySelectorAll('section .content .lists li')
    let array = JSON.parse(localStorage.getItem('tasks'))
    lists.forEach((list) => {
        let elID = list.classList[0]
        if (list.firstElementChild.firstElementChild.classList.contains('active')) {
            for (let i = 0; i < array.length; i++) {
                if (array[i].id === +elID) {
                    array[i].hide = false
                }
            }
        } else {
            for (let i = 0; i < array.length; i++) {
                if (array[i].id === +elID) {
                    array[i].hide = true
                }
            }
        }
    })
    localStorage.setItem('tasks', JSON.stringify(array))
    dataHandle()
}


//Set All Task For Specific State 
function state(list){
    let array = JSON.parse(localStorage.getItem('tasks'))
    for (let i = 0; i < array.length; i++) {
        array[i].state = list.textContent
    }
    localStorage.setItem('tasks', JSON.stringify(array))
}

//Clear Button Handle
function clearComplete(){
   if(localStorage.getItem('tasks')){
       let array = JSON.parse(localStorage.getItem('tasks'))
       for(let i=0;i<array.length;i++){
           if(!array[i].active){
               array[i] = ''
           }
       }
       array = array.filter((e)=>e!=='')
       console.log(array)
       if(array.length>0){
        localStorage.setItem('tasks',JSON.stringify(array))
       }
       else{
           localStorage.clear()
       }
   }
    dataHandle()
    checkState()
}

//Show What Is State Of The Task 
function checkState(){
    if(localStorage.getItem('tasks')){
        let array = JSON.parse(localStorage.getItem('tasks'))
        if(array[0].state === 'All'){
            all()
        }
        else if(array[0].state === 'Active'){
            active()
        }
        else if(array[0].state === 'Completed'){
            completed()
        }
    }
}

let linkOfTheme = document.getElementById('theme')
let iconOfTheme = document.querySelector('section .head .icon') 


//Toggle Theme
function toggleTheme(){
    let headImg = document.querySelector('header picture img')
    let sectionHeadIcon = document.querySelector('section .head .icon img')
    if(localStorage.getItem('theme') === './dark.css'){
        localStorage.setItem('theme','./light.css')
        headImg.setAttribute('src','./images/bg-desktop-light.jpg') 
        sectionHeadIcon.setAttribute('src','./images/icon-moon.svg')
        linkOfTheme.href = localStorage.getItem('theme')
    }
    else{
        localStorage.setItem('theme','./dark.css')
        headImg.setAttribute('src','./images/bg-desktop-dark.jpg')
        sectionHeadIcon.setAttribute('src','./images/icon-sun.svg')
        linkOfTheme.href = localStorage.getItem('theme')
    }
}

//Control LocalStorage Of Theme
function controlTheme(){
    let headImg = document.querySelector('header picture img')
    let sectionHeadIcon = document.querySelector('section .head .icon img')
    if(localStorage.getItem('theme') === './dark.css'){
        localStorage.setItem('theme','./dark.css')
        headImg.setAttribute('src','./images/bg-desktop-dark.jpg')
        sectionHeadIcon.setAttribute('src','./images/icon-sun.svg')
        linkOfTheme.href = localStorage.getItem('theme')
    }
    else{
        localStorage.setItem('theme','./light.css')
        headImg.setAttribute('src','./images/bg-desktop-light.jpg') 
        sectionHeadIcon.setAttribute('src','./images/icon-moon.svg')
        linkOfTheme.href = localStorage.getItem('theme')
    }
}
controlTheme()




//Call Function
dataHandle()
dataHandle()