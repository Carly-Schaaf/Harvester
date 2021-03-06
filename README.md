## Harvester
[Live Link](https://backyardharvest.herokuapp.com/#/)

With Harvester, you can find and harvest local produce right in your own neighborhood. This project was built with Node.js, ReactJS, Apollo Client, GraphQL, and MongoDB.

![show](https://user-images.githubusercontent.com/39382120/63894649-03f84d00-c9a2-11e9-856d-186842ab7066.png)

### Technologies used
 1.	Node.js
 2. React.js
 3.	GraphQL
 4. Apollo Client
 3.	MongoDB & the Mongoose ORM framework
 4.	HTML5
 5.	SCSS/CSS3
 6. Material UI

### External APIs:

* Google Maps API, Google Geocoding API, Google Place's Autocomplete
* Wikipedia API to fetch produce photos and description

![index](https://user-images.githubusercontent.com/39382120/63894648-03f84d00-c9a2-11e9-92f5-b34d2f8deb8b.png)

Leveraging GraphQL’s easy integration of multiple data sources, I incorporated the Wikipedia API in order to add photos and a description to user-entered produce. This entailed adding "Description" and "Thumbnail" fields and their respective resolve functions to my GraphQL ProduceType (pictured below). 

![produce-type](https://user-images.githubusercontent.com/39382120/63896304-85ea7500-c9a6-11e9-89df-62ca26140b3e.png)

Users can also search produce by name and location. I implemented the search-by-name feature using Mongoose's regex method (pictured below) and the search-by-location feature using the Google Geocoding API in order to turn user-entered input into coordinates.

![regex](https://user-images.githubusercontent.com/39382120/63896303-85ea7500-c9a6-11e9-972f-93dcd8121a09.png)

The following modal allows users to review produce. After the review is submitted, I manually update the Apollo InMemoryCache so the user can see the review immediately upon submission.

![review-create](https://user-images.githubusercontent.com/39382120/63894650-03f84d00-c9a2-11e9-910d-5e1c88ead871.png)

This project was designed and built in under two weeks.
