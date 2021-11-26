# CONTACT LIST
A simple react task to render uses contacts list using fake mockAPI.

|                                                 Contact list Light Page                                                    |                                                 Contact list Dark Page                                                |
| :-------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: |
| ![image](https://user-images.githubusercontent.com/53113836/143238465-a8135833-1d14-43a0-bae5-63b9f98a80ce.png) |![image](https://user-images.githubusercontent.com/53113836/143238555-6dc10be8-a8b9-4b9a-a88c-efc6ca8ff4f7.png) |
|                                                  Search by name                                                  |                                                  Loading process                                                    |
| ![image](https://user-images.githubusercontent.com/53113836/143243178-5f7b9f82-1916-4d00-b34e-d83fc35cc194.png) | ![image](https://user-images.githubusercontent.com/53113836/143379759-b145e90e-357a-4fa7-bece-611aec51826a.png) |



## Setup


### 1. Clone this repo:
```git clone https://github.com/AdedayoMj/simple-contact-list-rendering.git```

Demo Link: https://kntestcontacts.netlify.app/

### 2. Install dependencies:

Navigate to the cloned repo's directory and run:
```cd mockAPI 
   yarn install
   cd web-client
   yarn install
```

### 3. Run the mock api server:
Run the command to start up server 
```yarn start```.
Verify the json file by Open your browser and enter : localhost:3000/contacts
Deployed server link: https://mockserverkn.herokuapp.com/
sample shown below:

```
[
{
"id": 1,
"name": "Homer Simpson",
"url": " https://vignette.wikia.nocookie.net/simpsons/images/b/bd/Homer_Simpson.png/revision/latest/scale-to-width-down/72?cb=20140126234206"
},
{
"id": 2,
"name": "Marge Simpson",
"url": " https://vignette.wikia.nocookie.net/simpsons/images/4/4d/MargeSimpson.png/revision/latest/scale-to-width-down/78?cb=20180314071936"
},
]
```
### 4. Run the development web-client:
Run the command to start up webpack 
```yarn start```.
Open your browser and enter localhost:8081 into the address bar.
Also this will start a watch process, so you can change the source and the process will recompile and refresh the browser



## Technology
- Material Ui
- Typescript
- Json Server
- Webpack
