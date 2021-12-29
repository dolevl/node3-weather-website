const weatherForm = document.querySelector('form')
const search = document.querySelector("input")
const message1 = document.querySelector("#message-1")
const message2 = document.querySelector("#message-2")
const message3 = document.querySelector("#message-3")
const message4 = document.querySelector("#message-4")
message1.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) =>
{
    e.preventDefault()
    const location = search.value
    message1.textContent = "Loading..."
    message2.textContent = ""
    message3.textContent = ""
    message4.textContent = ""
    fetch("/weather?address=" + location).then((response) =>
    {
        response.json().then((data) =>
        {
            if (data.error)
            {
                message1.textContent = data.error
            }
            else
            {
                message1.textContent = "Location is " + data.location + "."
                message2.textContent = "Forecast is " + data.forecast + "."
                message3.textContent = "Humidity is " + data.humidity + "%."
                message4.textContent = "Visibility is " + data.visibility + "%."
            }
        })
    })
})