// BEGIN Time management (from https://muffinman.io/javascript-time-ago-function/)
const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];


function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    let minutes = date.getMinutes();

    if (minutes < 10) {
        // Adding leading zero to minutes
        minutes = `0${minutes}`;
    }

    if (prefomattedDate) {
        // Today at 10:20
        // Yesterday at 10:20
        return `${prefomattedDate} at ${hours}:${minutes}`;
    }

    if (hideYear) {
        // 10 January at 10:20
        return `${day} ${month} at ${hours}:${minutes}`;
    }

    // 10 January 2017 at 10:20
    return `${day} ${month} ${year} at ${hours}:${minutes}`;
}

function timeAgo(dateParam) {
    if (!dateParam) {
        return null;
    }

    const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today = new Date();
    const yesterday = new Date(today - DAY_IN_MS);
    const seconds = Math.round((today - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const isThisYear = today.getFullYear() === date.getFullYear();


    if (seconds < 5) {
        return 'now';
    } else if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (seconds < 90) {
        return 'about a minute ago';
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (isToday) {
        return getFormattedDate(date, 'Today'); // Today at 10:20
    } else if (isYesterday) {
        return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
    } else if (isThisYear) {
        return getFormattedDate(date, false, true); // 10. January at 10:20
    }

    return getFormattedDate(date); // 10. January 2017. at 10:20
}
// END Time Management

let toggleNew = false;
function toggleNewButton() {
    toggleNew = !toggleNew;
    for (i = 0; i < listAPI.length; i++) {
        toggleEdit[i] = false;
    }
    refresh();
}

let toggleEdit = [];
function toggleEditButton(n) {
    for (i = 0; i < listAPI.length; i++) {
        i != n ? toggleEdit[i] = false : toggleEdit[n] = !toggleEdit[n];
    }
    toggleNew = false;
    refresh();
}

function refresh() {
    let target = document.getElementById('newTarget');
    let add = '';
    // new entries
    if (toggleNew) {
        add += '<form class="entry container d-flex flex-column w-50 text-center text-white border rounded mt-3 mb-3" action="http://localhost:9090/add" method="post">';
        add += '<h2 class="mb-0 mt-3">New entry</h2>';
        add += '<p class="mb-0 mt-3">Name :</p>';
        add += '<input class="m-0" type="text" name="name">';
        add += '<p class="mb-0 mt-3">Breed :</p>';
        add += '<input class="m-0" type="text" name="breed">';
        add += '<p class="mb-0 mt-3">Size :</p>';
        add += '<input class="m-0" type="text" name="size">';
        add += '<p class="mb-0 mt-3">Weight :</p>';
        add += '<input class="m-0" type="text" name="weight">';
        add += '<p class="mb-0 mt-3">Age :</p>';
        add += '<input class="m-0" type="text" name="age">';
        add += '<p class="mb-0 mt-3">Location :</p>';
        add += '<input class="m-0" type="text" name="location">';
        add += '<p class="mb-0 mt-3">Photo URL (temporary) :</p>';
        add += '<input class="m-0" type="text" name="image">';
        add += '<p class="mb-0 mt-3">Comment :</p>';
        add += '<input class="m-0" type="text" name="comment">';
        add += '<button class="btn btn-primary mt-3 mb-3">Add</button>';
        add += '</form>';
    }
    target.innerHTML = add;
    // show list
    target = document.getElementById('listTarget');
    add = '';
    for (i = 0; i < listAPI.length; i++) {
        if (listAPI[i].found.toLowerCase() == "yes") {
            add += '<div class="card m-5 border border-success highlight-green">';
        }
        else if (listAPI[i].found.toLowerCase() == "no") {
            add += '<div class="card m-5 border border-danger highlight-red">';
        }
        add += '<div class="row p-3">';
        add += '<div class="col-2">';
        add += '<div class="card-title text-white text-center mb-0 font-weight-bold">' + listAPI[i].name + '</div>';
        add += '<img class="card-img" src="' + listAPI[i].image + '">';
        add += '</div>';
        add += '<div class="row col-10">'
        add += '<div class="col-8">';
        add += '<div class="card-text text-white font-weight-bold">' + listAPI[i].age + ' years old ' + listAPI[i].breed + ' (' + listAPI[i].location + ')</div>';
        add += '<div class="card-text text-white">Size : ' + listAPI[i].size + '</div>';
        add += '<div class="card-text text-white">Weight : ' + listAPI[i].weight + '</div>';
        add += '<div class="card-text text-white font-italic">' + listAPI[i].comment + '</div>';
        add += '</div>';
        add += '<div class="col-4 p-0 mt-3 text-right">';
        add += '<form action="http://localhost:9090/delete?_method=DELETE" method="post">';
        add += '<input type="hidden" name="id" value="' + i + '">';
        add += '<button class="btn btn-danger col-6">Delete</button>';
        add += '</form>';
        add += '<button class="btn btn-warning col-6 mt-1" onclick="toggleEditButton(' + i + ')">Edit</button>';
        add += '</div>';
        add += '<div class="row d-flex justify-content-between ml-3 mr-0 mt-auto w-100">';
        if (listAPI[i].found.toLowerCase() == "yes") {
            add += '<div class="card-text text-success">Found !</div>';
        }
        else if (listAPI[i].found.toLowerCase() == "no") {
            add += '<div class="card-text text-danger">Missing !</div>';
        }
        add += '<div class="card-text text-primary font-italic">Last edited : ' + timeAgo(listAPI[i].date) + '</div>';
        add += '</div>';
        add += '</div>';
        add += '</div>';
        add += '</div>';
        add += '<div id="editTarget' + i + '" class="editTarget">';
        add += '</div>';
    }
    target.innerHTML = add;
    // show edit
    for (i = 0; i < listAPI.length; i++) {
        target = document.getElementById('editTarget' + i);
        add = '';
        if (toggleEdit[i]) {
            add += '<form class="entry container d-flex flex-column w-50 text-center text-white border rounded mt-3 mb-3" action="http://localhost:9090/edit?_method=PUT" method="post">';
            add += '<h2 class="mb-0 mt-3">Edit entry</h2>';
            add += '<p class="mb-0 mt-3">Name :</p>';
            add += '<input class="m-0" type="text" name="name" value="' + listAPI[i].name + '">';
            add += '<p class="mb-0 mt-3">Breed :</p>';
            add += '<input class="m-0" type="text" name="breed" value="' + listAPI[i].breed + '">';
            add += '<p class="mb-0 mt-3">Size :</p>';
            add += '<input class="m-0" type="text" name="size" value="' + listAPI[i].size + '">';
            add += '<p class="mb-0 mt-3">Weight :</p>';
            add += '<input class="m-0" type="text" name="weight" value="' + listAPI[i].weight + '">';
            add += '<p class="mb-0 mt-3">Age :</p>';
            add += '<input class="m-0" type="text" name="age" value="' + listAPI[i].age + '">';
            add += '<p class="mb-0 mt-3">Location :</p>';
            add += '<input class="m-0" type="text" name="location" value="' + listAPI[i].location + '">';
            add += '<p class="mb-0 mt-3">Photo URL (temporary) :</p>';
            add += '<input class="m-0" type="text" name="image" value="' + listAPI[i].image + '">';
            add += '<p class="mb-0 mt-3">Comment :</p>';
            add += '<input class="m-0" type="text" name="comment" value="' + listAPI[i].comment + '">';
            add += '<p class="mb-0 mt-3">Found ? (Yes/No) (temporary) :</p>';
            add += '<input class="m-0" type="text" name="found" value="' + listAPI[i].found + '">';
            add += '<input type="hidden" name="int" value="' + i + '">';
            add += '<button class="btn btn-primary mt-3 mb-3">Confirm</button>';
            add += '</form>';
            currentInt = i;
        }
        target.innerHTML = add;
    }
}