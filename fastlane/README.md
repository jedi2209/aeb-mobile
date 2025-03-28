fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew install fastlane`

# Available Actions
## iOS
### ios prepare
```
fastlane ios prepare
```
Prepare the iOS app for dev or build
### ios beta
```
fastlane ios beta
```
Push a new beta build to TestFlight

----

## Android
### android test
```
fastlane android test
```
Runs all the tests
### android internal
```
fastlane android internal
```
Submit a new Internal Build to Google Play
### android release
```
fastlane android release
```
Make a new release build

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
