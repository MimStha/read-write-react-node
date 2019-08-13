# React Node Test App

- React and NodeJs
- User should be able to enter a number to the text field
- On page load, make a request to server and load the number in the textfield  
    -- Pull the number from the file where it is stored  
    -- Display 0, if no number is stored  
- Replace the number if user enters a different number  
    -- A submit button to replace the existing number  
    -- Call NodeJs API to save the number to the existing file  
- Use semantic/ Material UI for text and submit button (not too fancy)
- Use docker to build

## Note

---

- May use any library to make UI and backend
- No security needed
- Same file to store and retrieve number

## Usage

---

- Run the app from either docker or without docker
- Run with docker  
    -- Assuming you have a docker daemon running  
    -- Go to the root directory (cd ~/read-write-file-node-react)  
    -- Commands to run  

        docker-compose build

        docker-compose up 

- Run without docker (Carry-out following commands on both client and server folder)  
    -- Insatall npm packages  

        npm i
    -- After packages are installed  

        npm run start

## Credits

---

- Client  
    -- ReactJS - [https://reactjs.org/](https://reactjs.org/)   
    -- Material UI - [https://material-ui.com/](https://material-ui.com/)  
    -- clsx - [https://github.com/lukeed/clsx](https://github.com/lukeed/clsx)  
    -- Notification library - [https://github.com/iamhosseindhv/notistack](https://github.com/iamhosseindhv/notistack)  
    -- Parcel (bundler) - [https://parceljs.org/](https://parceljs.org/)  

- Server  
    -- NodeJS - [https://nodejs.org/en/](https://nodejs.org/en/)  
    -- ExpressJS - [https://expressjs.com/](https://expressjs.com/)  
    -- esm (ECMAScript module loader) - [https://github.com/standard-things/esm](https://github.com/standard-things/esm) 

- Docker - [https://www.docker.com/](https://www.docker.com/)
