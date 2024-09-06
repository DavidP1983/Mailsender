const btn = document.getElementById('btn');
const spinner = document.getElementById('spinner');
const popup = document.getElementById('liveToast');

function show() {
    popup.classList.remove('hide');
    popup.classList.add('show');

}

function hide() {
    const timer = setTimeout(hide, 3000);
    function hide() {
        popup.classList.remove('show');
        popup.classList.add('hide');
        clearTimeout(timer);
    }

}

document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    const obj = {};
    formData.forEach((val, key) => {
        obj[key] = val;
    })

    btn.setAttribute('disabled', '');
    spinner.style.display = 'block';


    fetch('/', {
        method: 'POST',
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify(obj),
    })
        .then(response => response.text())
        .then(result => {
            btn.removeAttribute('disabled', '');
            spinner.style.display = 'none';
            show();
        })
        .catch((error) => {
            console.log('Ошибка:', error);
            spinner.style.display = 'none';
            document.querySelector('#liveToast #message').style.color = 'red';
            document.querySelector('#liveToast #message').innerHTML = 'Error please try again';
            show();
        })
        .finally(() => {
            document.getElementById('form').reset();
            hide();
        })
});