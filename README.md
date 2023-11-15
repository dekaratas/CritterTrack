# solo-project-crittertrack

## Legacy Project Notes
The video presentation has hopefully given you some idea as to what the app is supposed to look like. 

I've omitted the Electron configuration that prevents resizing but the svg waves are currently intended for 1280x720 resolution. They can be generated on Haikei.app fairly easily for other resolutions and animated through simple js.

The backend is hopefully self explanatory but feel free to ask questions at any point. I'll try to clean up the code as much as possible and leave comments when I feel it's necessary. Postgresql should be familiar. Prisma is pretty easy to work with as well. Models are stored in a specific Prisma.schema file. Which should also contain the connection to your specific database.

Overall, not much knowledge or fiddling with Electron is necessary to understand the front-end part of the app. Basically, Electron distinguishes between main process (desktop app related) and a renderer process (web app code). If you go into the app's folder (CritterTrack) you'll be able to access the renderer folder which contains the  React code.

On the other hand, the main folder contains Electron's main configuration. It's responsible for creating windows etc. 
"WebPreferences" takes a lot of different options. You can set the window resolution, a lot of security related options can be toggled, etc. The docs and Google are pretty helpful.

The only two noteworthy things are that imgur API related functions are only accessible when running the app in build mode (npm run start) as opposed to dev mode (npm run dev).

And that some node/browser related functions are not accessible by the renderer by default
You want to look into the preload script loaded by Electron's main file to expose specific functionalities since Electron is very serious about security and restricts everything that's not necessary.

Other than that, there's not too much fancy stuff going on that requires anything beyond npm i in both folders.