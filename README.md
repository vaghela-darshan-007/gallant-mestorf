# Leaderboard App



This is a simple leaderboard application built using React.js and styled-components. It displays a list of players with their scores in a leaderboard format. The scores are updated at regular intervals.

# Re-Submitted Changes ( As on 03-04-2024 ):
1. Instead of using 3 states for players, used only one state to manage data
    Advantage:
        - Code will be more manageable, readable and scalable
2. Dynamically calculated translateValue based on element height & margins
    => Added box-sizing: border-box property to eliminate calculation of internal paddings and border-widths
    => Removed fixed 750px height of "PlayerListContainer"
    => calculation of translateY value dynamically on "sortedPlayersWithTranslate"
    => Dynamic CSS changes using props
    Advantage:
        - Animation of translateY will be automatically set based on calculation
        - Now, more than 10 elements can be animated, previously it was only for 10 element and also hight was also fixed of each element
3. Added "Pt" text After score for better readability
4. Changed color theme and fonts for better fresh look and feel
5. Responsiveness
    => Added breakpoints for large screen, normal screen, medium screen and small screen
    => replaced pixels and percentage css with vh & vw css for better code standard
    Advantage:
        - Now, webpage will be look good in laptop, tablet and mobile devices as well
6. Added highlight for top 2 players with gold, silver and bronze text with better background
7. Created hooks for code reusability
    (i) useInitialPlayersData
        => To get initial data from json file, it can be used to fetch data from API as well
    (ii) useNumberCountAnimation
        => Seperated number count animation and used in hook, so that it can be applied in multiple places
        => replaced existing score count animation with this hook
        => NEW: used this hook to animate position number of player as well

## Prerequisites
- Node.js version 20.11.1
- npm (Node Package Manager)
### `npm install`


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Folder Structure

The project folder structure is organized as follows:

src/
|-- components/
|   |-- Leaderboard.tsx
|   |-- GlobalStyles.tsx
|   |-- PlayerList.tsx
|   |-- Score.tsx
|-- data/
|   |-- players.json
|-- App.tsx
|-- index.css
|-- index.tsx

## Technologies Used
- React.js
- styled-components

## GitHub Repo Link and branch
- https://github.com/vaghela-darshan-007/Stream-Score
- master ( branch )

## Credits
This project was created by Darshan Vaghela (vaghela-darshan-007) as a demonstration of React.js and styled-components usage.

