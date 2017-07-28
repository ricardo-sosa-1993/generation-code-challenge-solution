# generation-code-challenge-solution
This is my solution to the generation code challenge. 

## Setup
The **server** needs to be run first:

```
cd server
npm install
npm start
```

Then the **webapp**. **The markers won't be shown until all the locations have been retrieved in the server:**

```
cd webapp
npm install
npm start
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
