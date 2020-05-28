## Scripts

## Pre-requisites

1. Create a firebase project if not already created.
2. Add an android and iOS application to it.
_REF: https://firebase.google.com/docs/projects/learn-more#setting_up_a_firebase_project_and_adding_apps_
3. Obtain `google-services.json` and `GoogleService-Info.plist` and place them under `android/app` and `ios/` respectively.

## Development
`yarn` - Install all dependencies.

#### To run the app on android simulator:
Start the simulator first. Then run the following command.  
`yarn android` - Creates a build and installs the app on the simulator.  
Also starts the metro builder.
  
#### To run the app on ios simulator:
`yarn ios` - Creates a build and installs the app on the simulator.  
Also starts the metro builder.
 
`cd ios && pod install` - Required only when a Native dependency is added and is required to be linked.
 
`yarn start` - Starts metro builder.
