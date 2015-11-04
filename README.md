This is an addon starter template for the [Ionic Framework](http://ionicframework.com/) and [Oracle Mobile Cloud Service (MCS)] (https://cloud.oracle.com/mobile).

## How to use this template

The purpose of this template is to provide you a starting point with your Ionic based mobile app when using the Oracle Mobile Cloud Service mobile backend.
This template is provided "as-is" and you should make sure you adjust the code to reflect your environment before running it.

### With the Ionic tool:

To get started, run the following commands:

$ ionic start *your_app_name* https://github.com/mjabali/ionic-starter-mcs

$ cd *your_app_name*

Edit the www/js/app.js file and update the two constant variables (HostMcsUrl and MCSBackendID) on lines 9 and 10 to reflect your Oracle Mobile Cloud Service mobile backend. 

$ ionic serve

And you should be able to see the login page where you're going to authenticate against your mobile backend. Make sure you have the FixItFast mobile backend available as the demo code queries for incidents after the login process or update the code accordingly based on your needs.

It's also recommended that you disable CORS before testing this example in the browser.

Chrome: Run Chrome with the followin flag --disable-web-security

Firefox: Run Firefox with about:config -> security.fileuri.strict_origin_policy -> false

If you're successfuly able to run the demo, you can go ahead and test it in the emulator or real device.

Add your target platform (iOS, Android)
$ ionic platform add *platform_of_choice*

Build the app to your platform of choice
$ ionic build *platform_of_choice*

Run the app on the iOS Simulator or the Android Emulator
$ ionic emulate *platform_of_choice*

## Issues

