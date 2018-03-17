# ReactNativeExamplarStarter

Running android:

cd reactNative

yarn install



cd android


gradlew clean


cd ..


yarn android


In android studio, open a new file or project from file. Select the android project.


When the project opens/gets loaded, launch the AVD manager and create an emulator unless you've already created it in the past.


Check to make sure you have required SDK's installed.

https://stackoverflow.com/questions/38577669/run-react-native-on-android-emulator


Launch using the green icon.


Notes:

- There is no hot-reloading at the moment, so meaning, you will have to delete the application from the phone, and reinstall it from the studio when testing an update.


- yarn android and npm android simply just refer to the script inside package.json, where you can see all the scripts, in this case it calls 'react-native run-android'.


- When running react-native run-android, this simply starts the server. When you launch the app, it will try to connect by adress to that server, launched via the terminal command.
