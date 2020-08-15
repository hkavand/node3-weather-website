
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#msg1')
const messagetwo = document.querySelector('#msg2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading ...'
    messagetwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then((response)=>{
        response.json().then((data)=>{
            if (data.error){
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.location
                messagetwo.textContent = data.forecast
            }
        })
    })
})



messageOne.textContent = ''