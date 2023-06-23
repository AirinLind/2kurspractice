const button = document.querySelector('button')

const listenerWindows = (openWindowsArray)=>{
    for (let i of openWindowsArray) {
        i.addEventListener('click', () => {
            let newWindow = window.open('', '', '')
            newWindow.document.body.innerHTML += localStorage.getItem(i.textContent)
        })
    }
}
function create() {
    const a = document.querySelector('.files-to-open')
    const data3 = Object.entries(localStorage)

    a.innerHTML = ''
    for (let i of data3) {
        console.log(i)
        a.innerHTML += `<a class="open" href="#">${i[0]}</a>`
    }

    const openWindowsArray = document.querySelectorAll('.open')
    listenerWindows(openWindowsArray)
}

const iterateFiles = (files)=>{
    for (let i of files) {
        i.addEventListener('click', async (eventSaveLink) => {
            let data2 = (await axios.get(`/pages/${i.textContent}`)).data
            console.log(data2)
            localStorage.setItem(i.textContent, data2)
            create()
        })
    }
}

button.addEventListener('click', async (event) => {
    event.preventDefault()
    const input = document.querySelector('input')
    console.log(input)
    const w = input.value

    let data = (await axios.post('/', {url: w})).data

    const fls = document.querySelector('.files-to-local-storage')

    fls.innerHTML = ''

    for (let i = 0; i < data.length; ++i) {
        console.log(i)
        fls.innerHTML += `<div class="col"> <a class="link" href="#">${data[i]}</a> </div>`
    }

    const files = document.querySelectorAll('.link')
    iterateFiles(files)

    console.log(files)
})

create()