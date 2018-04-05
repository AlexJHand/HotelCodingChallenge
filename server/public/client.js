// Client side logic
$(document).ready(getCompanies());

// Ensuring that client.js is sourced correctly
console.log("In js");

// Global variables
let companies = [];
let guests = [];
let templates = [];

// Classes
// Company class
class Company {
    constructor(name, city, timezone) {
        this.name = name;
        this.city = city;
        this.timezone = timezone;
    } // end constructor
} // end class

// Guest class
class Guest {
    constructor(firstName, lastName, roomNumber, startTime, endTime) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.roomNumber = roomNumber;
        this.startTime = startTime;
        this.endTime = endTime;
    } // end constructor
} // end class

// Template class
class Template {
    constructor(name, text) {
        this.name = name;
        this.text = text;
    } // end constructor
} // end class

// Functions

// buildMessage function takes selected guest, hotel, and template info and replaces all keywords in template with 
// the relevant guest and hotel information
function buildMessage(guest, hotel, templateMessage) {
    console.log('in buildMessage');

    // start with empty message
    let message = "";
    // convert timestamps into 'morning', 'afternoon', and 'evening'
    let convertedStartTime = timeConversion(guest.startTime, hotel.timezone);
    let convertedEndTime = timeConversion(guest.endTime, hotel.timezone);

    // arrays of keywords and replacement words
    let keywords = ["firstName", "lastName", "roomNumber", "checkIn", "checkOut", "hotelName", "city"];
    let replacementWords = [guest.firstName, guest.lastName, guest.roomNumber, convertedStartTime, convertedEndTime, hotel.name, hotel.city];

    // loop through template and replace keywords with replacements
    for (let k = 0; k < keywords.length; k++) {
        templateMessage = templateMessage.replace(keywords[k], replacementWords[k])
    }
    console.log(templateMessage);
    // append the new completed message to the DOM
    $('#messageDisplay').append(templateMessage);
} //end function

// customMessage function retrieves the guest, hotel, and custom input template info from the DOM
function customMessage() {
    console.log("in customMessage");

    // get info from DOM
    let selectedGuest = getSelectedGuest();
    let selectedHotel = getSelectedHotel();
    let inputMessage = $('#customText').val();
    console.log('inputMessage', inputMessage);

    // error handling to ensure the user has created a custom template
    if (inputMessage == "") {
        // display an error message
        $('#messageDisplay').append("Error: Make sure that a custom message has been entered.");
    } else {
        // send information to buildMessage
        buildMessage(selectedGuest, selectedHotel, inputMessage);
    }
}

// getCompanies function retrieves the hotel data from the Companies.json file from the server
function getCompanies() {
    console.log('in getCompanies');
    // ajax get call to server
    $.ajax({
        type: 'GET',
        url: '/companies',
        success: function(response) {
            console.log('response', response);
            // loop cycles through response data, creates each new entry as an object of the Company class,
            // and pushes it to the companies array
            for (let i = 0; i < response.length; i++) {
                let company = new Company(response[i].company, response[i].city, response[i].timezone)
                companies.push(company)
            }
            console.log("Companies array", companies); 
            // call the getGuests function
            getGuests();
        }
    });
} //end function

// getGuests function retrieves the hotel data from the Guests.json file from the server
function getGuests () {
    console.log('in getGuests');
    // ajax get call to server
    $.ajax({
        type: 'GET',
        url: '/guests',
        success: function (response) {
            console.log('response', response);
            // loop cycles through response data, creates each new entry as an object of the Guest class,
            // and pushes it to the guests array
            for (let j = 0; j < response.length; j++) {
                let guest = new Guest(response[j].firstName, response[j].lastName, response[j].reservation.roomNumber, response[j].reservation.startTimestamp, response[j].reservation.endTimestamp )
                guests.push(guest);
            }
            console.log("guests", guests);
            // call the getTemplates function
            getTemplates();
        }
    });
} //end function

// getTemplates function retrieves the hotel data from the Templates.json file from the server
function getTemplates() {
    console.log('in getTemplates');
    // ajax get call to server
    $.ajax({
        type: 'GET',
        url: '/templates',
        success: function (response) {
            console.log('response', response);
            // loop cycles through response data, creates each new entry as an object of the Template class,
            // and pushes it to the templates array
            for (let k = 0; k < response.length; k++) {
                let template = new Template(response[k].name, response[k].text)
                templates.push(template);
            }
            console.log("templates", templates);
            // call the populateGuests function
            populateGuests();
        }
    });
} //end function

// getSelectedGuest function determines which guest the user has selected
function getSelectedGuest() {
    // get value from select
    let selectedGuestIndex = $('#guestSelect').val();
    // change value into int
    selectedGuestIndex = parseInt(selectedGuestIndex);
    // use value to determine which object in array to use
    let selectedGuest = guests[selectedGuestIndex];
    return selectedGuest;
} //end  function

// getSelectedHotel function determines which hotel the user has selected
function getSelectedHotel() {
    // get value from select
    let selectedHotelIndex = $('#hotelSelect').val();
    // change value into int
    selectedHotelIndex = parseInt(selectedHotelIndex);
    // use value to determine which object in array to use
    let selectedHotel = companies[selectedHotelIndex];
    return selectedHotel;
} //end  function

// getSelectedTemplate function determines which template the user has selected
function getSelectedTemplate() {
    // get value from select
    let selectedTemplateIndex = $('#templateSelect').val();
    // change value into int
    selectedTemplateIndex = parseInt(selectedTemplateIndex);
    // use value to determine which object in array to use
    let selectedTemplate = templates[selectedTemplateIndex];
    return selectedTemplate;
} //end  function

// inputMessage function clears the DOM of any previous message, then grabs selected guest, hotel, and template info
// from the DOM, and then determines if that is a custom template or a previously made one.
function inputMessage() {
    // clear DOM of previous message
    $('#messageDisplay').empty();
    // get selections from DOM
    let selectedGuest = getSelectedGuest();
    let selectedHotel = getSelectedHotel();
    let selectedTemplate = getSelectedTemplate();

    // if/else error handling to ensure all fields are filled
    if (selectedGuest == undefined || selectedHotel == undefined || selectedTemplate == undefined) {
        // error message if not all fields are selected
        $('#messageDisplay').append("Error: make sure that guest, hotel, and template are all selected.");
    } else {
        console.log("form submitted", selectedGuest, selectedHotel, selectedTemplate.text);
        // switch to determine which template is selected
        switch (selectedTemplate.name) {
            case "Check-In": {
                // send info to buildMessage
                buildMessage(selectedGuest, selectedHotel, selectedTemplate.text);
                break;
            }
            case "Check-Out": {
                // send info to buildMessage
                buildMessage(selectedGuest, selectedHotel, selectedTemplate.text);
                break;
            }
            // custom template case
            // adds additional directions, as well as a textarea and additional submit button
            case "Custom Template": {
                $('#messageDisplay').append("Please enter your custom message in the box below. Use the keywords firstName, "
                    + "lastName, roomNumber, checkIn, checkOut, hotelName, and city, and the application will "
                    + "autofill the relevant values.");
                $('#messageDisplay').append("<textarea id='customText' rows='5' cols='100'></textarea>");
                $('#messageDisplay').append("<button onclick='customMessage()'>Submit Custom</button>");
                break;
            }
        }
    }
} // end function

// populateGuests function creates html options containing the guest from Guests.json for the guestSelect 
// and populates them on the DOM
function populateGuests() {
    for (let i = 0; i < guests.length; i++) {
        $('#guestSelect').append('<option value="' + i + '">' + guests[i].firstName + " " + guests[i].lastName + '</option>');
    }
    populateHotels();
} //end function

// populateHotels function creates html options containing the companies from Companies.json for the hotelSelect
// and populates them on the DOM
function populateHotels() {
    for (let j = 0; j < companies.length; j++) {
        $('#hotelSelect').append('<option value="' + j + '">' + companies[j].name + '</option>')
    }
    populateTemplates();
} //end function

// populateTemplates function creates html options containing the templates from Templates.json for the templateSelect
// and populates them on the DOM
function populateTemplates() {
    for (let k = 0; k < templates.length; k++) {
        $('#templateSelect').append('<option value="' + k + '">' + templates[k].name + '</option>')
    }
} //end function

// timeConversion function takes timestamp from guest object and converts it to 'morning', 'afternoon', or 'evening'
function timeConversion(timeToConvert, timeZone) {
    // convert timestamp to readable time
    let date = new Date(timeToConvert * 1000);
    let hours = date.getHours();
    // adjust time from UTC depending on timezone of the hotel
    switch(timeZone) {
        case "US/Eastern": {
            console.log("US/Eastern");
            // factor in changes moving across 00:00 am
            hours = twentyFourHourConversion(hours, 5);
            console.log(hours);
            break;
        }
        case "US/Central": {
            console.log("US/Central");
            // factor in changes moving across 00:00 am
            hours = twentyFourHourConversion(hours, 6);
            console.log(hours);
            break;
        }
        case "US/Mountain": {
            console.log("US/Mountain");
            // factor in changes moving across 00:00 am
            hours = twentyFourHourConversion(hours, 7);
            console.log(hours);
            break;
        }
        case "US/Pacific": {
            console.log("US/Pacific");
            // factor in changes moving across 00:00 am
            hours = twentyFourHourConversion(hours, 8);
            console.log(hours);
            break;
        }
        default: {
            // default just uses UTC time
            console.log("UTC time");
            break;
        }
    }
    let minutes = "0" + date.getMinutes();
    let checkIn = hours + ":" + minutes.substr(-2);
    console.log("hours", hours);
    
    // logic to determine what time of day
    if (hours < 12) {
        return "morning";
    } else if (hours >= 12 && hours < 18) {
        return "afternoon";
    } else {
        return "evening";
    }
} //end function

// twentyFourHourConversion determines the time if the change in timezone moves over 00:00 am
function twentyFourHourConversion(utc, hoursToSubtract) {
    console.log("time", utc);
    // if/else the time moves across 00:00 am
    if ((utc - hoursToSubtract) < 0) {
        // if time moves across 00:00, subtract utc from hours to subtract, then subtract the remaining hours
        // from 24
        let remainingHours = hoursToSubtract - utc;
        let convertedTime = 24 - remainingHours;
        console.log("convertedTime", convertedTime);
        return convertedTime;
    } else {
        // if no conversion is needed
        let convertedTime = utc - hoursToSubtract;
        console.log("convertedTime", convertedTime);
        return convertedTime;
    }
} //end function
