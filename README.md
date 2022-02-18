## Polybin: Paste your Polies :)
Polybin is a website where you can store any text and share it easily using short links.

![Screenshot (363)](https://user-images.githubusercontent.com/55295915/154601784-3992a84f-45c6-4d09-93fa-a8eb23923dde.png)

### Features
- Create and store texts
- Generate short links to access the texts
- Set a time duration for access to the texts
- See all the texts, delete them and renew their expiry duration
- Detect the recent IP addresses sorted by time that accessed a particular link
- Detect links in the texts and redirect directly to them
- Encrypt texts and allow decrypting through a key

### Tech Stack
- Database: MongoDB
- Frontend: React.js
- Backend: Node.js and Express.js

### Some APIs used
- [shrtcode](https://shrtco.de/docs/)
- [classify](https://classify-web.herokuapp.com/#/api)
- [isurl](https://www.npmjs.com/package/isurl)
- [uniqid](https://www.npmjs.com/package/uniqid)

### Website setup
The code for this website is divided into two repositories: frontend and backend. Both run on separate servers. The database is hosted on MongoDB Atlas.

#### Steps to run the frontend
- Clone this repository using `git clone https://github.com/Ankur-Khandelwal/polybin-frontend.git` in your terminal
- Move to the polybin-frontend folder by `cd polybin-frontend`
- Run `npm i` to install the dependencies
- Run `npm start` to run the frontend

To run the website properly, **both the frontend and backend servers have to be started**. The link to the backend repository is given below which also includes the steps to set up the backend.

### Link to backend repository: https://github.com/Ankur-Khandelwal/polybin-backend

## Working of the Website:
https://user-images.githubusercontent.com/55295915/154602213-7a28b856-d725-4da1-b441-fddef55db04f.mp4

