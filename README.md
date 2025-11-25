Zeller RN Code Challenge

This repository contains my implementation of the Zeller React Native coding challenge.
The project has been built, tested, and verified to run cleanly on both iOS and Android.

🚀 Tech Stack

React Native (0.73+)

TypeScript

Redux Toolkit

Realm DB

React Navigation

Jest + React Native Testing Library

📦 Project Setup
1. Install Dependencies
yarn install

2. iOS Setup
cd ios
pod install
cd ..
yarn ios

3. Android Setup
yarn android

🧪 Running Tests

Jest has been configured with mocks for:

Realm

AsyncStorage

Navigation

Reanimated

PagerView

Run the full test suite:

yarn test


All tests pass successfully.

🛠 Environment Files

For convenience, an example file is included:

.env.example


(There are no sensitive keys required for this assignment.)

🔐 Keystore

Android debug keystore is included (allowed & expected):

android/app/debug.keystore


Production keystores are not included.

📂 Folder Structure
.
├── src
│   ├── components
│   ├── navigation
│   ├── screens
│   ├── store
│   ├── db
│   ├── services
│   ├── __tests__
│   └── __mocks__      ← custom test mocks
├── ios
├── android
├── README.md
└── jest.setup.ts

🧹 Important Notes

The project runs on a clean install using yarn install.

All tests run with a mocked Realm database.

No unnecessary dependencies or files have been added.

.gitignore properly excludes:

node_modules

Pods

build artifacts

temporary Metro files

keystore except debug.keystor