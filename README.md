# Gallery-1.1
## Dependencies:
[node](https://nodejs.org/en/)
[mongo](https://www.mongodb.com/)
[bower](https://www.npmjs.com/package/bower)

## In order to run the app:
```
C:\mongodb\bin\mongod.exe
```
Open another tab
```
cd app
npm i
bower i
npm run start
```

#### To populate the db with images:
You can add or remove .jpg files from `app/public/images/` to your liking.
Open another tab
```
cd app/public
node populateDb.js
```
This only works if your database is empty and there are .jpg files in `app/public/images/`

#### Go to [localhost:3000](http://localhost:3000) with your favourite browser