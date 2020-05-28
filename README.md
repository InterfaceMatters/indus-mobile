## Scripts

* `yarn` - Install all dependencies.

* To run the app on android simulator:

  * Start the simulator first.
  
  * Then run the following commands.
  
  `yarn android` - Creates a build and installs the app on the simulator. Also starts the metro builder.
  
* To run the app on ios simulator:
    
   `yarn ios` - Creates a build and installs the app on the simulator. Also starts the metro builder.

* `cd ios && pod install` - Required only when a Native dependency is added and is required to be linked.

* `yarn start` - Starts metro builder.
