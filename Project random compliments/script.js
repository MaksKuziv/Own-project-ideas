const tipEl = document.getElementById('tip');
const tipBtn = document.getElementById('tip-btn');

const generateTip = () => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'tip.json');

    xhr.onreadystatechange = function () {
        if(this.readyState === 4) {
            if(this.status === 200) {
                const data = JSON.parse(this.responseText);
                const randomIndex = Math.floor(Math.random() * data.length);
                tipEl.innerHTML = data[randomIndex].value;
            } else {
                tipEl.innerHTML = 'Щось пішло не так (Це не смішно)';
            }
        }
    };

    xhr.send();
};

tipBtn.addEventListener('click', generateTip);
document.addEventListener('DOMContentLoaded', generateTip);
