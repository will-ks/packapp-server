# PackApp

PackApp is a cloud based build service that lets you package your web app or website into a WebView based Android APK.
This repo contains the PackApp web server, which is an express.js server running on Node.js, and uses a mongoDB database.

## Related Projects

- PackApp web server: https://github.com/dambusm/packapp-server
- PackApp build server: https://github.com/dambusm/packapp-build-server
- PackApp android WebView application: https://github.com/dambusm/packapp-android

## Setup

- Clone repo
- `npm install`
- Copy .env.example to .env and fill in required variables

## Development server

Run `npm run dev` for a dev server.
