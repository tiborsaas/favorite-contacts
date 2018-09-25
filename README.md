# My favorite contacts
Take-home assignment for Hearsay Budapest Sites Developer Candidates

## General guideline
- You have 24 hours to send back your solution, you should be able to complete the actual work in 2-3 hours.
- Make sure:
    - Your app builds and runs
    - The code is clean, organized and understandable
    - The logic in your app implements the specifications exactly
    - The look of your app matches the visual mock-up


## Specifications
Your task is to implement a simple list of favorite contacts based on the user's call history.
- The list must include every contact from the call history only once (```callHistory.json```)
- Each list item must display the first name, last name (in bold) and the time since the last call in days
    - The last call can be calculated from the ```called``` UNIX timestamp (seconds) value
- The list must be ordered by the call counts of each contact in a descending order
    - If the call counts of calls of two contacts are equal, then the contact with the latest last call precedes the other one
- The header should be always visible, even if the user scrolls

```
1. Contact U - 4 calls
2. Contact X - 3 calls
       last call: Aug 8, 2018
3. Contact Y - 3 calls
       last call: Jun 30, 2018
4. Contact Z - 2 calls
...
```

### Visual design
Please refer to the mock-up image in the ```mockup``` folder. Colors, padding, margins and font sizes don't need to be exact.

### Nice to have
If you are comfortable with webpack and its configuration then change the application to use SASS/SCSS instead of plain CSS. (This is not mandatory)

## Technical help
We created an environment for you to accomplish this task. 
- Before you start working please install the npm packages:
```
npm install
```
- To build and run your application
```
npm start
```    
- This command will transpile and bundle your code into ```public/bundle.js```, which will be loaded by the browser
  It will also start a local server, you may access your application at ```http://localhost:8888```
- The project is set up with babel and webpack, which allows you to use most of the ES6 features


