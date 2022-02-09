'use strict';

let best;
let worst;
let average;
let strStat; //string που εμφανίζεται στη τελευταία γραμμή του πίνακα
let clone;
let emptycells = true;
let filterColAge;
let filterColCountry;
let filterColPerBest;
const myHeading = document.getElementsByClassName('uomTrack')[0];
myHeading.style.color = 'white';

myHeading.style.backgroundColor = '#618685';
myHeading.style.width = '80%';
myHeading.style.marginLeft = 'auto';
myHeading.style.marginRight = 'auto';
myHeading.style.textAlign = 'center';
const myTable = document.getElementsByClassName('uomTrack')[1];

myTable.style.color = 'white';

myTable.style.backgroundColor = '#618685';
myTable.style.tableLayout = 'auto';
myTable.style.fontSize = '20px';
myTable.style.textAlign = 'center';
myTable.style.borderCollapse = 'separate';
myTable.style.width = '85%';
myTable.style.marginLeft = 'auto';
myTable.style.marginRight = 'auto';
myTable.style.marginBottom = '30px';
myTable.caption.style.fontSize = '30px';

const contents = document.getElementById('ilo');
//contents.style.display = 'none';



//initial setup
let ilopoi = document.getElementById('ilo');
let titlos = document.getElementById('title');
let setupPage = document.getElementById('setup');
ilopoi.style.display = "none";
//category Race
const categoryRaceSelection = document.getElementById('categoryRace');
let categoryRace = categoryRaceSelection.value;

categoryRaceSelection.addEventListener('change', function(evt) {
    updateInputs();
}, false);


//which Race
const whichRaceSelection = document.getElementById('whichRace');

addOptionsRun();

function addOption(a, b) {
    let newOption = new Option(a, b);
    whichRaceSelection.add(newOption, undefined);
}

//αριθμος αγωνιζομένων
const nrAthletesSelection = document.getElementById('nrAthletes');
//let nrAthletes = nrAthletesSelection.value;
nrAthletesSelection.addEventListener('change', function(evt) {
    //validate
    if (nrAthletesSelection.value < 2)
        nrAthletesSelection.value = 2;
    else if (nrAthletesSelection.value > 30)
        nrAthletesSelection.value = 30;
}, false);






function addOptionsRun() {
    whichRaceSelection.options.length = 0;
    addOption('100μ.', '100μ.');
    addOption('200μ.', '200μ.');
    addOption('400μ.', '400μ.');
    addOption('500μ.', '500μ.');
    addOption('1500.', '1500.');
    addOption('5000μ.', '5000μ.');
    addOption('10000μ.', '10000μ.');
}

function addOptionsObstacles() {
    whichRaceSelection.options.length = 0;
    addOption('110 μ. εμπόδια', '110 μ. εμπόδια');
    addOption('400 μ. εμπόδια', '400 μ. εμπόδια');
    addOption('3000 μ. στιπλ', '3000 μ. στιπλ');

}

function addOptionsDist() {
    whichRaceSelection.options.length = 0;
    addOption('800 μ.', '800 μ');
    addOption('1500 μ.', '1500 μ.');

}

function addOptionLongsDist() {
    whichRaceSelection.options.length = 0;
    addOption('5000 μ. εμπόδια', '5000 μ.');
    addOption('10000. εμπόδια', '10000 μ.');
    addOption('Μαραθώνιος', 'Μαραθώνιος');

}

function addOptionWalk() {
    whichRaceSelection.options.length = 0;
    addOption('20000 μ. εμπόδια', '20000 μ.');
    addOption('50000 μ. εμπόδια', '50000 μ.');

}


function updateInputs() {

    categoryRace = categoryRaceSelection.value;
    switch (categoryRace) {
        case "Δρόμοι ταχύτητας":
            addOptionsRun();
            break;
        case "Δρόμοι με εμπόδια":
            addOptionsObstacles();
            break;
        case "Δρόμοι μεσαίων αποστάσεων":
            addOptionsDist();
            break;
        case "Δρόμοι μεγάλων αποστάσεων":
            addOptionLongsDist();
            break;
        case "Βάδην":
            addOptionWalk();
            break;


    }
};






//αλλαγή σε input των κελιών του body του πίνακα
//και προσθήκη σε όλα τα κελιά eventlistener change
const tBodyOfMyTable = myTable.getElementsByTagName('tbody')[0];
for (var roww = 0; roww < tBodyOfMyTable.rows.length; roww++) {
    for (var cel = 0; cel < tBodyOfMyTable.rows[roww].cells.length; cel++) {
        let tempCellCValue = tBodyOfMyTable.rows[roww].cells[cel].innerHTML;
        tBodyOfMyTable.rows[roww].cells[cel].innerHTML = '';
        var input = tBodyOfMyTable.rows[roww].cells[cel].appendChild(createInputText(tempCellCValue));
        //input.addEventListener('change', validateAfterChange)
    }

    //προσθήκη δύο στηλών με κουμπί copy και delete
    let rowA = tBodyOfMyTable.rows[roww];
    var cell1 = document.createElement('td'),
        cell2 = document.createElement('td');
    rowA.appendChild(cell1);
    cell1.innerHTML = '<img src="assets/copy.svg" class="copy" alt="rubbish" width="35" ALIGN=center></td>';

    rowA.appendChild(cell2);
    cell2.innerHTML = '<img src="assets/rubbish.svg" class="rubbish" alt="copy" width="35" ALIGN=center></td>';

}



// button Next
document.getElementById('btnNext').addEventListener('click', function(evt) {
    //τιτλος
    let whichRace = whichRaceSelection.value;
    myTable.caption.innerHTML = "<strong>Αγώνας &nbsp" + whichRace + "</strong>";
    //δημιουργία πίνακα
    instertEmptyRows(nrAthletesSelection.value - 1);

    showStatistics();
    //απόκρυψη setup και εμφάνιση πίνακα
    setupPage.style.display = 'none';
    titlos.style.display = 'none';
    ilopoi.style.display = 'block';
    colFilter();
}, false);


//button load (from setup)
document.getElementById('btnLoadFromSetup').addEventListener('click', function(evt) {
    var storageObj = window['localStorage'];

    if (storageObj.length == 0)
        alert("δεν έχει αποθηκευτεί πίνακας!");
    else {
        //απόκρυψη setup και εμφάνιση πίνακα
        setupPage.style.display = 'none';
        titlos.style.display = 'none';
        ilopoi.style.display = 'block';
        colFilter();
        updateList('localStorage');

    }


}, false);




//Φίλτρο στηλών
function colFilter() {
    filterColAge = document.getElementById('colAgeShowYN').checked;

    filterColPerBest = document.getElementById('colPerBestShowYN').checked;

    filterColCountry = document.getElementById('colCountryShowYN').checked;


    filterAge(filterColAge);
    filterCountry(filterColCountry);
    filterPerBest(filterColPerBest);


}
// button filters
document.getElementById('btnFilterCountry').addEventListener('click', function(evt) {
    filterColCountry = !filterColCountry;
    filterCountry(filterColCountry);
}, false);
document.getElementById('btnFilterAge').addEventListener('click', function(evt) {
    filterColAge = !filterColAge;
    filterAge(filterColAge);
}, false);
document.getElementById('btnFilterPerBest').addEventListener('click', function(evt) {
    filterColPerBest = !filterColPerBest;
    filterPerBest(filterColPerBest);
}, false);



function filterAge(show) {
    let btnAge = document.getElementById('btnAge');
    for (let j = 0; j < tBodyOfMyTable.rows.length; j++) {

        let a = tBodyOfMyTable.rows[j].cells[2]
        if (!show) {
            btnAge.style.display = "none";
            a.style.display = "none";
        } else {
            btnAge.style.display = '';
            a.style.display = '';
        }
    }
    validateInputs();
    showStatistics()
}

function filterCountry(show) {
    let btnCountry = document.getElementById('btnCountry');
    for (let j = 0; j < tBodyOfMyTable.rows.length; j++) {

        let a = tBodyOfMyTable.rows[j].cells[0]
        if (!show) {
            btnCountry.style.display = "none";
            a.style.display = "none";
        } else {
            btnCountry.style.display = '';
            a.style.display = '';

        }
    }
    validateInputs();
    showStatistics()
}

function filterPerBest(show) {
    let btnPerBest = document.getElementById('btnPBest');
    for (let j = 0; j < tBodyOfMyTable.rows.length; j++) {

        let a = tBodyOfMyTable.rows[j].cells[3]
        if (!show) {
            btnPerBest.style.display = "none";
            a.style.display = "none";
        } else {
            btnPerBest.style.display = '';
            a.style.display = '';

        }
    }
    validateInputs();
    showStatistics()
}


//Δημιουργία πίνακα
//Εισαγωγή κενών γραμμών

function instertEmptyRows(rows) {
    for (let i = 0; i < rows; i++) {
        let emptyrow = document.getElementById("trForClone");
        let cloneEmpty = emptyrow.cloneNode(true); // copy children too
        tBodyOfMyTable.appendChild(cloneEmpty);

    }
}



function validateAfterChange() {
    showStatistics();
}

const tHeadOfMyTable = myTable.getElementsByTagName('thead')[0];
//Αλλαγή Font style στο head του table
tHeadOfMyTable.style.fontSize = '30px';
tHeadOfMyTable.style.fontWeight = 'bold';

//προσθήκη γραμμής ανάμεσα head και body του table
var newRow = tHeadOfMyTable.insertRow(1);
newRow.innerHTML = "<td colspan='5'><hr></td>"
    //προσθήκη γραμμής ανάμεσα body και foot του table
const tFootOfMyTable = myTable.getElementsByTagName('tfoot')[0];
var newRow = tFootOfMyTable.insertRow(0);
newRow.innerHTML = "<td colspan='5'><hr></td>"
    //προσθήκη στατιστικών στο foot του table
var newRowForStats = tFootOfMyTable.insertRow(1);
newRowForStats.innerHTML = "<td colspan='4'>"
showStatistics();


tFootOfMyTable.style.fontSize = '24px';

var trs = myTable.getElementsByTagName("tr");
var tds = null;

tds = trs[0].getElementsByTagName("td");
for (var n = 0; n < tds.length; n++) {
    tds[n].style.border = '5 px solid white';
}


function createInputText(tempCellCValue) {


    var inText = document.createElement('input');
    inText.type = 'text';
    inText.value = tempCellCValue;
    inText.style.textAlign = "center";
    inText.style.height = '30px';
    inText.style.width = '90%';
    inText.style.fontSize = '25px';

    return inText;
};


function findBestWorstAvg() {
    let floatNumbers = [];
    let r;
    for (r = 0; r < tBodyOfMyTable.rows.length; r++) {
        floatNumbers.push(parseFloat(tBodyOfMyTable.rows[r].cells[4].firstElementChild.value));
    }

    best = Math.min.apply(null, floatNumbers);

    worst = Math.max.apply(null, floatNumbers);
    let sum = floatNumbers.reduce((a, b) => a + b, 0);
    average = (sum / floatNumbers.length) || 0;

};

// value change
document.querySelector('table').addEventListener('change', function(evt) {
    validateInputs();
    showStatistics();

}, false);
// Κάδος
document.querySelector('table').addEventListener('click', function(evt) {

    const
        tdStyle = evt.target.style,
        bgColor = tdStyle.backgroundColor;

    if (evt.target.className == 'rubbish') {
        if (tBodyOfMyTable.rows.length > 1) {
            evt.target.closest('tr').remove();
            showStatistics();
        } else {
            alert("at least one item...")
        }
    }

}, false);
// copy
document.querySelector('table').addEventListener('click', function(evt) {

    if (evt.target.className == 'copy') {
        //var newCopyRow =evt.target.closest('tr').clone();

        clone = evt.target.closest('tr').cloneNode(true);
        tBodyOfMyTable.appendChild(clone);

    }

}, false);


// sortCountry
let sCa = true;
document.getElementById('btnCountry').addEventListener('click', function(evt) {
    sCa = !sCa;
    let stingsCountry = [];
    let r;
    let j;

    for (r = 0; r < tBodyOfMyTable.rows.length - 1; r++) {
        for (j = 0; j < tBodyOfMyTable.rows.length - 1; j++) {
            let a = tBodyOfMyTable.rows[j].cells[0].firstElementChild.value;
            let b = tBodyOfMyTable.rows[j + 1].cells[0].firstElementChild.value;
            if (sCa) {
                if (b < a) {
                    swapRows(j);
                }
            } else {
                if (b > a) {
                    swapRows(j);
                }
            }

        }
    }
    putArrow('btnCountry');

}, false);

document.getElementById('btnCountry').addEventListener('mouseenter', function(evt) {

    this.style.color = 'darkBlue';
    document.body.style.cursor = 'pointer';

}, false);
document.getElementById('btnCountry').addEventListener('mouseleave', function(evt) {
    this.style.color = 'white';
    document.body.style.cursor = 'default';
}, false);

// sortName
let sNa = true;
document.getElementById('btnName').addEventListener('click', function(evt) {
    sNa = !sNa;
    let stingsCountry = [];
    let r;
    let j;
    if (validateInputs()) {
        for (j = 0; j < tBodyOfMyTable.rows.length - 1; j++) {
            let a = tBodyOfMyTable.rows[j].cells[1].firstElementChild.value;
            let b = tBodyOfMyTable.rows[j + 1].cells[1].firstElementChild.value;
            if (sNa) {
                if (b < a) {
                    swapRows(j);
                }
            } else {
                if (b > a) {
                    swapRows(j);
                }
            }

        }

    }
    putArrow('btnName');

}, false);
document.getElementById('btnName').addEventListener('mouseenter', function(evt) {

    this.style.color = 'darkBlue';
    document.body.style.cursor = 'pointer';

}, false);
document.getElementById('btnAge').addEventListener('mouseenter', function(evt) {

    this.style.color = 'darkBlue';
    document.body.style.cursor = 'pointer';

}, false);
document.getElementById('btnName').addEventListener('mouseleave', function(evt) {
    this.style.color = 'white';
    document.body.style.cursor = 'default';
}, false);
document.getElementById('btnAge').addEventListener('mouseleave', function(evt) {
    this.style.color = 'white';
    document.body.style.cursor = 'default';
}, false);
// sortAge
let sAa = true;
document.getElementById('btnAge').addEventListener('click', function(evt) {
    sAa = !sAa;
    let r;
    let j;
    if (validateInputs()) {
        for (j = 0; j < tBodyOfMyTable.rows.length - 1; j++) {
            let a = tBodyOfMyTable.rows[j].cells[2].firstElementChild.value;
            let b = tBodyOfMyTable.rows[j + 1].cells[2].firstElementChild.value;
            if (sAa) {
                if (parseInt(b) < parseInt(a)) {
                    swapRows(j);
                }
            } else {
                if (parseInt(b) > parseInt(a)) {
                    swapRows(j);
                }
            }

        }

    }

    putArrow('btnAge');

}, false);
document.getElementById('btnPBest').addEventListener('mouseenter', function(evt) {

    this.style.color = 'darkBlue';
    document.body.style.cursor = 'pointer';

}, false);
document.getElementById('btnPBest').addEventListener('mouseleave', function(evt) {
    this.style.color = 'white';
    document.body.style.cursor = 'default';
}, false);
// sortPersBest
let sPa = true;
document.getElementById('btnPBest').addEventListener('click', function(evt) {
    sPa = !sPa;
    let r;
    let j;
    if (validateInputs()) {
        for (r = 0; r < tBodyOfMyTable.rows.length - 1; r++) {
            for (j = 0; j < tBodyOfMyTable.rows.length - 1; j++) {
                let a = tBodyOfMyTable.rows[j].cells[3].firstElementChild.value;
                let b = tBodyOfMyTable.rows[j + 1].cells[3].firstElementChild.value;
                if (sPa) {
                    if (parseFloat(b) < parseFloat(a)) {
                        swapRows(j);
                    }
                } else {
                    if (parseFloat(b) > parseFloat(a)) {
                        swapRows(j);
                    }
                }

            }
        }
    }

    putArrow('btnPBest');

}, false);
document.getElementById('btnPBest').addEventListener('mouseenter', function(evt) {

    this.style.color = 'darkBlue';
    document.body.style.cursor = 'pointer';

}, false);
document.getElementById('btnPBest').addEventListener('mouseleave', function(evt) {
    this.style.color = 'white';
    document.body.style.cursor = 'default';
}, false);
// sortTime
let sTa = true;
document.getElementById('btnTime').addEventListener('click', function(evt) {
    sTa = !sTa;
    let r;
    let j;

    if (validateInputs()) {
        for (r = 0; r < tBodyOfMyTable.rows.length - 1; r++) {
            for (j = 0; j < tBodyOfMyTable.rows.length - 1; j++) {
                let a = tBodyOfMyTable.rows[j].cells[4].firstElementChild.value;
                let b = tBodyOfMyTable.rows[j + 1].cells[4].firstElementChild.value;
                if (sTa) {
                    if (parseFloat(b) < parseFloat(a)) {
                        swapRows(j);
                    }
                } else {
                    if (parseFloat(b) > parseFloat(a)) {
                        swapRows(j);
                    }
                }

            }
        }
    }

    putArrow('btnTime');
}, false);
document.getElementById('btnTime').addEventListener('mouseenter', function(evt) {

    this.style.color = 'darkBlue';
    document.body.style.cursor = 'pointer';

}, false);
document.getElementById('btnTime').addEventListener('mouseleave', function(evt) {
    this.style.color = 'white';
    document.body.style.cursor = 'default';
}, false);


function swapRows(k) {
    let i;
    for (i = 0; i < 5; i++) {
        let a = tBodyOfMyTable.rows[k].cells[i].firstElementChild.value;
        let b = tBodyOfMyTable.rows[k + 1].cells[i].firstElementChild.value;
        let tmpValu = a;
        tBodyOfMyTable.rows[k].cells[i].firstElementChild.value = b;
        tBodyOfMyTable.rows[k + 1].cells[i].firstElementChild.value = tmpValu;
    }
}


function validateInputs() {
    let i;
    emptycells = false;
    let invalidcells = false;
    //ελεγχοσ για κενα κελιά
    for (i = 0; i < tBodyOfMyTable.rows.length; i++) {
        for (let j = 0; j < 4; j++) {

            let d = tBodyOfMyTable.rows[i].cells[j].firstElementChild;
            if ((j == 0) && !filterColCountry)
                continue;
            if ((j == 2) && !filterColAge)
                continue;
            if ((j == 3) && !filterColPerBest)
                continue;

            if (d.value == "") {
                emptycells = true;
            }

        }
    }




    for (i = 0; i < tBodyOfMyTable.rows.length; i++) {
        let d = tBodyOfMyTable.rows[i].cells[0].firstElementChild;
        d.value = d.value.toUpperCase().substring(0, 3);
    }

    for (i = 0; i < tBodyOfMyTable.rows.length; i++) {
        let a = tBodyOfMyTable.rows[i].cells[2].firstElementChild;
        let b = tBodyOfMyTable.rows[i].cells[3].firstElementChild;
        let c = tBodyOfMyTable.rows[i].cells[4].firstElementChild;
        if (isNotInt(a.value) || (a.value <= 0)) {

            a.style.color = 'red';
        } else {
            a.style.color = 'black';
            a.value = parseInt(a.value.toString()).toFixed(0);

        }
        if (isNotFloat(b.value) || (b.value <= 0)) {

            b.style.color = 'red';
        } else {

            b.style.color = 'black';
            b.value = parseFloat(b.value.toString()).toFixed(2);

        }
        if (isNotFloat(c.value) || (c.value <= 0)) {

            c.style.color = 'red';
            invalidcells = true;
        } else {
            c.style.color = 'black';
            c.value = parseFloat(c.value.toString()).toFixed(2);
        }
    }
    if (emptycells) {
        msgEmptyCells();
        return false;
    }
    if (invalidcells) {
        return false;
    }
    return true;

}

function msgEmptyCells() {
    newRowForStats.innerHTML = "<td colspan='4'>Empty Cells!</td>";
}

function isNotFloat(n) {
    return !(parseFloat(n.match(/^-?\d*(\.\d+)?$/)) > 0);
}

function isNotInt(n) {
    return !(parseInt(n.match(/^-?\d*(\.\d+)?$/)) > 0);
}

function showStatistics() {
    if (emptycells == false) {
        findBestWorstAvg();
        if (validateInputs()) {
            strStat = "<td colspan='4'>Best: ";
            strStat += best;
            strStat += " Worst: "
            strStat += worst;
            strStat += " Average: "
            strStat += average.toFixed(2);
            strStat += "   </td>"
            newRowForStats.innerHTML = strStat;
        } else {
            strStat = "<td colspan='4'>Best: ";
            newRowForStats.innerHTML = "<td colspan='4'>Not Correct Time Values!</td>";
        }
    } else
        msgEmptyCells();

}

function putArrow(strBtnClick) {
    switch (strBtnClick) {
        case 'btnCountry':

            document.getElementById('btnCountry').innerHTML = "<td>Country <img src='assets/ArrowDown.svg'  alt='AD' width='35' ALIGN=center></td>";
            document.getElementById('btnName').innerHTML = "<td>Name</td>";
            document.getElementById('btnAge').innerHTML = "<td>Age</td>";
            document.getElementById('btnPBest').innerHTML = "<td>Per.Best</td>";
            document.getElementById('btnTime').innerHTML = "<td>Time</td>";
            break;
        case 'btnName':
            document.getElementById('btnCountry').innerHTML = "<td>Country</td>";
            document.getElementById('btnName').innerHTML = "<td>Name <img src='assets/ArrowDown.svg'  alt='AD' width='35' ALIGN=center></td>";

            document.getElementById('btnAge').innerHTML = "<td>Age</td>";
            document.getElementById('btnPBest').innerHTML = "<td>Per.Best</td>";
            document.getElementById('btnTime').innerHTML = "<td>Time</td>";
            break;
        case 'btnAge':
            document.getElementById('btnCountry').innerHTML = "<td>Country</td>";
            document.getElementById('btnName').innerHTML = "<td>Name</td>";
            document.getElementById('btnAge').innerHTML = "<td>Age <img src='assets/ArrowDown.svg'  alt='AD' width='35' ALIGN=center></td>";
            document.getElementById('btnPBest').innerHTML = "<td>Per.Best</td>";
            document.getElementById('btnTime').innerHTML = "<td>Time</td>";
            break;
        case 'btnPBest':
            document.getElementById('btnCountry').innerHTML = "<td>Country</td>";
            document.getElementById('btnName').innerHTML = "<td>Name</td>";
            document.getElementById('btnAge').innerHTML = "<td>Age</td>";
            document.getElementById('btnPBest').innerHTML = "<td>Per.Best <img src='assets/ArrowDown.svg'  alt='AD' width='35' ALIGN=center></td>";
            document.getElementById('btnTime').innerHTML = "<td>Time</td>";
            break;
        case 'btnTime':
            document.getElementById('btnCountry').innerHTML = "<td>Country</td>";
            document.getElementById('btnName').innerHTML = "<td>Name</td>";
            document.getElementById('btnAge').innerHTML = "<td>Age</td>";
            document.getElementById('btnPBest').innerHTML = "<td>Per.Best</td>";
            document.getElementById('btnTime').innerHTML = "<td>Time<img src='assets/ArrowDown.svg'  alt='AD' width='35' ALIGN=center></td>";
            break;
    }
}





function updateList(storage) {
    clearallEntries();

    var key;
    var str = '';
    var storageObj = window[storage];
    let keyCell = 2;
    myTable.caption.innerHTML = storageObj[1];
    instertEmptyRows(storageObj[0] - 1);
    for (let i = 0; i < storageObj[0]; i++) {
        for (let j = 0; j < 5; j++) {
            let d = tBodyOfMyTable.rows[i].cells[j].firstElementChild;
            d.value = storageObj[keyCell].toString();
            keyCell++;
        }
        //document.getElementById(storage).innerHTML = str;
    }
    validateInputs();
    showStatistics();

}


function clearallEntries() {

    for (let i = tBodyOfMyTable.rows.length - 1; i > 0; i--)
        tBodyOfMyTable.deleteRow(i);
    for (let i = 0; i < 5; i++) {
        let d = tBodyOfMyTable.rows[0].cells[i].firstElementChild;
        d.value = "";
    }
}


document.getElementById('btnNewTable').addEventListener('click', function() {

    window.location.reload();
});


document.getElementById('btnDeleteStorage').addEventListener('click', function() {
    localStorage.clear();
});

document.getElementById('btnSave').addEventListener('click', function() {
    if (validateInputs() == true) {
        let numberOfRows = tBodyOfMyTable.rows.length;


        localStorage.clear();
        localStorage.setItem(0, numberOfRows);
        localStorage.setItem(1, myTable.caption.innerHTML);
        let keyCell = 2;
        for (let i = 0; i < numberOfRows; i++) {
            for (let j = 0; j < 5; j++) {
                localStorage.setItem(keyCell, tBodyOfMyTable.rows[i].cells[j].firstElementChild.value);
                keyCell++;
            }
        }
        updateList('localStorage');
    } else
        alert('not correct values!');

});






document.getElementById('btnLoad').addEventListener('click', function() {
    var storageObj = window['localStorage'];

    if (storageObj.length == 0)
        alert("δεν έχει αποθηκευτεί πίνακας!");
    else
        updateList('localStorage');
});


function removeKey(evt) {
    var key;
    if (evt.target.nodeName !== 'BUTTON') return;
    key = evt.target.parentNode.getAttribute('data-key');
    window[evt.currentTarget.id].removeItem(key);
    updateList(evt.currentTarget.id);
}






// Register service worker to control making site work offline

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/pwa-examples/a2hs/sw.js')
        .then(() => { console.log('Service Worker Registered'); });
}

// Code to handle install prompt on desktop

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = 'block';

    addBtn.addEventListener('click', () => {
        // hide our user interface that shows our A2HS button
        addBtn.style.display = 'none';
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});