// const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'];

// //left
// let html = "";
// let counter = 1;
// rows.forEach(row => {

//     html += `<div class="label">${row}</div>`;
//     for (let i = 0; i < 3; i++) {
//         html += `<div id="${row+counter}">${counter}</div>`;
//         counter++;
//     }
//     counter += 12;
// });
// document.querySelector('#left').innerHTML = html;

// //right
// html = "";
// counter = 1;
// rows.forEach(row => {

//     counter += 12;
//     for (let i = 0; i < 3; i++) {
//         html += `<div id="${row+counter}">${counter}</div>`;
//         counter++;
//     }
//     html += `<div class="label">${row}</div>`;
// });
// document.querySelector('#right').innerHTML = html;

// //middle
// html = "";
// counter = 1;
// rows.forEach(row => {

//     counter += 3;
//     for (let i = 0; i < 9; i++) {
//         html += `<div id="${row+counter}">${counter}</div>`;
//         counter++;
//     }
// });
// document.querySelector('#middle').innerHTML = html;

const reservedSeats = {
    record1: {
        seat: "B19",
        owner: {
            fname: "Joe",
            lname: "Smith"
        }
    },
    record2: {
        seat: "B20",
        owner: {
            fname: "Joe",
            lname: "Smith"
        }
    },
    record3: {
        seat: "B21",
        owner: {
            fname: "Joe",
            lname: "Smith"
        }
    },
    record4: {
        seat: "B22",
        owner: {
            fname: "Joe",
            lname: "Smith"
        }
    }
};

function makeRows(sectionLength, rowLength, placement) {

    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'];
    let html = "";
    let counter = 1;

    rows.forEach(row => {
        12
        switch (placement) {
            case 'left':
                html += `<div class="label">${row}</div>`;
                break;
            case 'right':
                counter += (rowLength - sectionLength);
                break;
            default:
                counter += ((rowLength - sectionLength) / 2);
                break;
        }

        for (let i = 0; i < sectionLength; i++) {
            html += `<div class="a" id="${row+counter}">${counter}</div>`;
            counter++;
        }

        switch (placement) {
            case 'left':
                counter += (rowLength - sectionLength);
                break;
            case 'right':
                html += `<div class="label">${row}</div>`;
                break;
            default:
                counter += ((rowLength - sectionLength) / 2);
                break;
        }
    });
    document.querySelector(`#${placement}`).innerHTML = html;
}

makeRows(3, 15, 'left');
makeRows(3, 15, 'right');
makeRows(9, 15, 'middle');



// function reservation(record) {                                   //my method for reserved seats
//     let selectedRecord = document.querySelector(`#${record}`);
//     selectedRecord.className = "r";
//     selectedRecord.innerHTML = "R";
// }
// reservation(reservedSeats.record1.seat);
// reservation(reservedSeats.record2.seat);
// reservation(reservedSeats.record3.seat);
// reservation(reservedSeats.record4.seat);


(function() {
    "use strict";

    for (const key in reservedSeats) {
        if (reservedSeats.hasOwnProperty(key)) {
            const obj = reservedSeats[key];
            document.querySelector(`#${obj.seat}`).className = "r";
            document.querySelector(`#${obj.seat}`).innerHTML = "R";
        }
    }

})();


// //selecting seats my program
// let seatArray = [];
// const aArray = document.querySelectorAll('.a');
// aArray.forEach(item => {

//     item.addEventListener('click', function(evt) {
//         if (evt.target.className == 'a') {
//             evt.target.className = 's';
//             seatArray.push(evt.target.id);
//         } else {
//             evt.target.className = 'a';
//             seatArray.splice(seatArray.indexOf(evt.target.id), 1);

//         }
//         console.log(seatArray);
//     })

// });

(function() {
    "use strict";

    let selectedSeats = [];
    const seats = document.querySelectorAll('.a');

    seats.forEach(seat => {
        seat.addEventListener('click', function(event) {
            seatSelectionProcess(seat.id);
        })
    });

    function seatSelectionProcess(thisSeat) {
        if (!document.querySelector(`#${thisSeat}`).classList.contains('r')) {
            const index = selectedSeats.indexOf(thisSeat);
            if (index > -1) {
                selectedSeats.splice(index, 1);
                document.querySelector(`#${thisSeat}`).className = 'a';
            } else {
                selectedSeats.push(thisSeat);
                document.querySelector(`#${thisSeat}`).className = 's';
            }
        }
        console.log(selectedSeats);
        manageConfirmForm();
    }



    document.querySelector('#reserve').addEventListener('click', event => {
        event.preventDefault();
        document.querySelector('#resform').style.display = "block";
    })

    document.querySelector('#cancel').addEventListener('click', event => {
        event.preventDefault();
        document.querySelector('#resform').style.display = "none";
    })

    function manageConfirmForm() {
        if (selectedSeats.length > 0) {
            document.querySelector('#confirmres').style.display = "block";
            let seatString = selectedSeats.toString();
            seatString = seatString.replace(/,/g, ", ");
            seatString = seatString.replace(/,(?=[^,]*$)/, ' and');
            if (selectedSeats.length == 1)
                document.querySelector('#selectedseats').innerHTML = `You have selected ${seatString} seat`;
            else
                document.querySelector('#selectedseats').innerHTML = `You have selected ${seatString} seats`;

        } else {
            document.querySelector('#confirmres').style.display = "none";
            document.querySelector('#selectedseats').innerHTML = `You need to select some seats to reserve <br><a href="#" id="error">Close<a/> this dialog box and pick at least one seat`;
            document.querySelector('#error').addEventListener('click', () => {
                document.querySelector('#resform').style.display = "none";
            })
        }
    }
    manageConfirmForm();

    //resrvation part starts
    document.querySelector('#confirmres').addEventListener('submit', event => {
        event.preventDefault();
        processReservation();

    })

    function processReservation() {
        const hardCodeRecords = Object.keys(reservedSeats).length;
        const fname = document.querySelector('#fname').value;
        const lname = document.querySelector('#lname').value;
        let counter = 1;
        let nextRecord = '';

        selectedSeats.forEach(thisSeat => {
            document.querySelector(`#${thisSeat}`).className = 'r';
            document.querySelector(`#${thisSeat}`).innerHTML = "R";
            nextRecord = `record${hardCodeRecords + counter}`;
            reservedSeats[nextRecord] = { //for adding property to an existing object use square brackets
                seat: thisSeat,
                owner: {
                    fname: fname,
                    lname: lname
                }
            };
            counter++;

        })

        document.querySelector('#resform').style.display = "none";
        selectedSeats = [];
        manageConfirmForm();
    }


})();