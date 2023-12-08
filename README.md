# CritterTrack

## Overview
CritterTrack is a desktop app written in JavaScript that enables hobbyists, photographers and enthusiasts of the deep blue sea to store detailed records of their encounters with Marine wildlife supported by an easy to navigate graphical interface.

The user has the ability to upload images via their imgur account and fill in information such as the exact position of their encounter as well as various scientific observations including the Surface Temperature and the Salinity levels they've measured at the time.

Stored information is then represented on a global map featuring key details as well as markers pointing to the location on said map.

### Getting Started
To try the project for yourself, clone the github repo into a folder of your choice and navigate to the root directory.
From inside there, run:
`npm i` and wait for all dependencies to finish downloading. Finally, navigate to both the server and CritterTrack folders and run `npm run start` in each of them.

## Tech Stack
### Frontend
- Electron w/ React
- Vite as bundler
- Open Source libraries such as Victory and React-Leaflet
### Backend
- Express.js
- PostgreSQL alongside Prisma as ORM
- Imgur's API
- Database entries supplied by the Ocean Biodiversity Information System
