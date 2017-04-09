import {app} from '../app.js';

// Setting port that server should listen
let port = process.env.PORT || 3000;

// Starting server to listen to Requests
app.listen(port, () => console.log("Server is running on port 3000"));
