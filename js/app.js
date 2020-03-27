console.log('welcome to app note');
showNotes();
// If user adds a note, add it to the localStorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addText = document.getElementById('addText');
    let addTital = document.getElementById('addTital');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title : addTitle.value,
        text : addText.value
    }

    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addText.value = '';
    addTitle.value = '';
    // console.log(notesObj);
    showNotes();
});

// function to show element from local storage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard card my-2 mx-2" style="width: 18rem;">

        <div class="card-body ">
            <h5 class="card-title">${element.title}</h5>
            <p class="cardText">${element.text}</p>
            <button id=${index} onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`;
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = `Nothing to show, use add Notes section above the note`;
    }
}

// function to delete a note
function deleteNote(index) {
    // console.log('I\'m deleting', index);

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchText');
search.addEventListener('input', function () {
   
    let inputVal = search.value.toLowerCase();
    // console.log('inputn event fire', inputVal);    
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element) {
      let cardText = element.getElementsByTagName('p')[0].innerText;
      if (cardText.includes(inputVal)) {
          element.style.display = 'block';
      }  
      else{
          element.style.display = 'none';
      }
      //   console.log(cardText);

    });
});