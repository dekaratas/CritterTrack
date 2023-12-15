# CritterTrack
![](https://i.imgur.com/Wv1IwWn.png)
*Start Screen*

## Overview
CritterTrack is a desktop app written in JavaScript that enables hobbyists, photographers and enthusiasts of the deep blue sea to store detailed records of their encounters with Marine wildlife supported by an easy to navigate graphical interface.

![](https://i.imgur.com/az3Uh6Q.png)
*Record Entry Screen*

The user has the ability to upload images via their imgur account and fill in information such as the exact position of their encounter as well as various scientific observations including the Surface Temperature and the Salinity levels they've measured at the time.

![](https://i.imgur.com/3RcxMmP.png)
*Success*

Stored information is then represented on a global map featuring key details as well as markers pointing to the location on said map.

![](https://i.imgur.com/ZfEQMMQ.png)
*Keep track via an interactive map*


## Getting Started
### Requirements
- Debian based OS (for now)
- node package manager (optional)
- PostgreSQL (optional)

If you're running a Debian based system, feel free to download the most recent .deb file under releases and install it by executing `dpkg -i crittertrack_1.0.0_amd64.deb` inside your terminal. Files for the backend API and PostgreSQL/Prisma schema are contained within the repo as well as a commented out function that will fetch data from OBIS to populate charts.

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
