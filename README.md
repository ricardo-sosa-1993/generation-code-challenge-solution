# generation-code-challenge-solution
This is my solution to the generation code challenge. 

## Setup
You must have **npm** and **yarn** installed.

The app needs two Google Maps API keys (one server-side for geocoding, one browser key for the Maps JavaScript API). Create them in the Google Cloud Console and copy the example files:

```
cp server/.env.example server/.env   # GOOGLE_MAPS_API_KEY
cp webapp/.env.example webapp/.env   # REACT_APP_GOOGLE_MAPS_API_KEY
```

The server reads `GOOGLE_MAPS_API_KEY` from the environment (`GOOGLE_MAPS_API_KEY=... npm start`). The webapp reads `REACT_APP_GOOGLE_MAPS_API_KEY` from `webapp/.env` at build time (create-react-app injects it into `public/index.html`).

The **server** needs to be run first:

```
cd server
npm install
npm start
```

Then in another terminal tab the **webapp** must be run. **The markers won't be shown until all the locations have been retrieved in the server:**

```
cd webapp
yarn install
yarn start
```

## Overview
The project is built with React.js, Node.js and Express. Since it took a lot of time on the client to retrieve the locations 
from the google maps geolocation service, a node.js express server had to be created to provide a RESTful web service for the 
locations provision. The stores locations are retrieved from the server via asynchronous calls.

To store the favorite stores on the client the Local Storage API was used. The application is totally responsive. 
The result is the following:
![Favorite locations map](https://github.com/ricardo-sosa-alvarado/generation-code-challenge-solution/blob/master/1.png)
![Favorite locations map](https://github.com/ricardo-sosa-alvarado/generation-code-challenge-solution/blob/master/2.png)
![Favorite locations map](https://github.com/ricardo-sosa-alvarado/generation-code-challenge-solution/blob/master/3.png)
![Favorite locations map](https://github.com/ricardo-sosa-alvarado/generation-code-challenge-solution/blob/master/4.png)
