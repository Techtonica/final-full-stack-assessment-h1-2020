## Final App Assessment

## Database Helper Commands

When you want to initally create and seed the DB. If you are using this to "start over" make sure psql and/or Postico or closed or it will hang waiting for you to close your connection.

`npm run db:recreate`

When you have changed the schema and you want to commit your changes:

`npm run db:dump`

### Setup Instructions

- `npm run db:recreate`
- `cd express-api`
- `npm install`
- `npm start`
- `cd ../react-app`
- `npm install`
- `npm start`

If you prefer `yarn`, feel free to use that as well.
