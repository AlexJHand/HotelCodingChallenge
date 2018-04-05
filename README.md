# Hotel Coding Challenge

This full-stack application allows a user to create greeting messages from hotels to guests, using existing or custom message template, based on stored guest and hotel information. The guest, hotel, and template information is stored in three separate JSON files and is served to the front end where the user is allowed to select which to use.

### How to Run

First, node package manager needs to be installed. In the terminal, navigate to the project folder and install it by using the command ```npm install```.

Then to run the program, use the command ``npm start``.

At this point, the server should be running, and to run the program, simply open the index.html file in a browser.

### Design Decisions

For this project, my main focus was making the code modular and changable if it needed to be adjusted by someone else. I used the full-stack so that I could easily read in the information from the JSON files.

On the back-end, I used separate routes for reading each JSON file. This was with keeping in line of trying to be modular. If another JSON file needed, to be added, then another router could easily be made, and vice versa if one needed to be deleted.

On the front-end, I tried to use the same principles. Even though all of the logic is contained in the single app.js file, I broke the code into many functions. This would allow things to be changed in the future much more easily, with a minimum change in functionality. A good example of this is how, when the user opts to use a custom template, I route that through the customMessage function before sending it to the buildMessage function. That minimized the amount of code used to make the changes.

### Languages

For this application, I used the full stack.

On the back-end. I used Node.js, as it makes it easy to spin up a server and to pull JSON files. I'm also very familiar and comfortable using it.

For the front-end, I used ES6 JavaScript, JQuery, and HTML5. I chose JavaScript because it makes interacting with JSON files easy, and I'm comfortable with it. I also used JQuery as I wanted the user interactions to take place on the DOM and it makes moving things around very easy. Also, because I was a little rusty with JQuery (been using Angular a lot lately) and wanted both a challenge and a chance to brush up.

### Verifying Correctness

To verify the correctness of my application, I made sure to make extensive use of if/else error handling, so that when things go wrong, they are accounted for.

### What I Didn't Get To

If I had more time to add more features, I would have spent some time on visual styling. I really wanted to focus on functionality and design of the code and didn't really make any time for making it look good. As it stands, the application in the browser looks very naked and could do with some styling. 