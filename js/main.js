var nameInp = document.getElementById('nameInp');
var urlInp = document.getElementById('urlInp');
var addtxt = document.getElementById('addtxt');
var demo = document.getElementById('demo');
var setUpdate = document.getElementById('setUpdate');
var eroorName = document.getElementById('eroorName');
var eroorUrl = document.getElementById('eroorUrl');

var temp;
var term;

var textContainer = [];
if (localStorage.getItem('databass3') != null) {
    textContainer = JSON.parse(localStorage.getItem('databass3'));
    displayTxet();
}
function addTxet() {
    if (regxeAddProduct()) {
        var textWord = {
            Name: nameInp.value,
            url: urlInp.value,
        }
        textContainer.push(textWord);
        console.log(textContainer);
        localStorage.setItem('databass3', JSON.stringify(textContainer));
        eroorName.classList.add('d-none');
        eroorUrl.classList.add('d-none');
        displayTxet();
        clearForm();
    }

    else {
        eroorName.classList.remove('d-none');
        eroorUrl.classList.remove('d-none');
    }

}

function displayTxet() {
    var cartoona = '';
    for (var i = 0; i < textContainer.length; i++) {
        cartoona +=
            `
            <tr>
                            <td>${textContainer[i].Name}</td>
                            <td><a class="btn btn-primary btn-sm" href="https://www.${textContainer[i].url}.com" target="_blank" role="button">visit</a></td>
                            <td><button type="button" class="btn btn-danger btn-sm" onclick="txtDelete(${i})">Delete</button></td>
                            <td><button type="button" class="btn btn-warning btn-sm" onclick="displayUpdateTxt(${i})">Update</button> </td>
                            </tr>
        `
    }
    document.getElementById('tbody').innerHTML = cartoona;

}

function txtDelete(index) {
    textContainer.splice(index, 1);
    localStorage.setItem('databass3', JSON.stringify(textContainer));

    displayTxet();

}

function clearForm() {

    nameInp.value = "";
    urlInp.value = "";

}
function search(term) {


    term.toLowerCase();
    var cartoona = '';

    for (var i = 0; i < textContainer.length; i++) {
        if (textContainer[i].Name.toLowerCase().includes(term.toLowerCase())) {
            cartoona += `
            <tr>
                            <td>${textContainer[i].Name}</td>
                            <td><a class="btn btn-primary btn-sm" href="https://www.${textContainer[i].url}.com" role="button">visit</a></td>
                            <td><button type="button" class="btn btn-danger btn-sm" onclick="txtDelete(${i})">Delete</button></td>

                            </tr>
        `
        }
    }

    document.getElementById('tbody').innerHTML = cartoona;

}

function displayUpdateTxt(i) {
    addtxt.classList.add('d-none');
    setUpdate.classList.remove('d-none');
    nameInp.value = textContainer[i].Name;
    urlInp.value = textContainer[i].url;
    displayTxet();
    temp = i;
}

function setUpdate2(temp) {
    textContainer[temp].Name = nameInp.value;
    textContainer[temp].url = urlInp.value;
    localStorage.setItem('databass3', JSON.stringify(textContainer));
    addtxt.classList.remove('d-none');
    setUpdate.classList.add('d-none');
    clearForm();
    displayTxet();
}

function regxeAddProduct() {

    var regx = /^.{1,}$/;
    if (regx.test(nameInp.value)) {
        return true;
    }
    else {
        return false;
    }

}