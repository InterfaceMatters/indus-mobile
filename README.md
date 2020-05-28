# Indus mobile app

## Pre-requisites
1. Create a firebase project if not already created.
2. Add an android and iOS application to it.
   _REF: https://firebase.google.com/docs/projects/learn-more#setting_up_a_firebase_project_and_adding_apps_
3. Obtain `google-services.json` and `GoogleService-Info.plist` and place them under `android/app` and `ios/` respectively.

## Development
`yarn` - Install all dependencies.

#### To run the app on android simulator:
1. Start the simulator first.
2. Run `yarn android` - Creates a build and installs the app on the simulator. Also starts the metro builder.

#### To run the app on iOS simulator:
1, `yarn ios` - Creates a build and installs the app on the simulator. Also starts the metro builder.

- `cd ios && pod install` - Required only when a Native dependency is added and is required to be linked.

`yarn start` - Starts metro builder.

## Creating build

#### Android
1. To create a debug build, run the following command:  
   `cd android && ./gradlew assembleDebug`  
   After successful completion you can find the apk in `app/build/outputs/apk/debug`.

2. To create a release build:  
   i. Create a signing key. _REF: https://developer.android.com/studio/publish/app-signing_  
   ii. Update `build.gradle` and `gradle.properties` to use key configurations.  
   iii. Run `cd android && ./gradlew assembleRelease` to create apk OR `cd android && ./gradlew bundleRelease` to build aab.
   After successful completion you can find the apk in `app/build/outputs/apk/release` which can be directly published to play store.

#### iOS
1. Open xcode.
2. Select generic ios device in the build target (top left menu).
3. Make sure you have a development team added to xcode and required certificates from apple developer account.
4. Click on `Product->Archive`. This will bundle the application and prompt for automatic signing of the app.
5. After signing the app, upload option will be available to directly upload the apk to store.
