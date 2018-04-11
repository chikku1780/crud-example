const express = require('express');
const bodyParser = require('body-parser');

const util = require('./service/util');
const crudService = require('./service/crudService');

const app = express();
const port = process.env.PORT || 3000;

const middleWareFunction = function (req, res, next) {
    // console.log('do Something here');
    next();
};

app.use(middleWareFunction);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => res.send('Hello World! - An app for CRUD example'));

app.post('/user', (req, res) => {
    let providedData = req.body;
    // console.log(providedData);
    if (!util.isUndefinedNullEmptyString(providedData) && !util.isEmptyObject(providedData)) {
        let userId = providedData.id;
        let userName = providedData.name;

        if (!util.isString(userId)) {
            return res.send(util.formErrorMessage('ERROR_VALIDATION', 'id should be number', null));
        }

        if (!util.isString(userName)) {
            return res.send(util.formErrorMessage('ERROR_VALIDATION', 'name should be string', null));
        }

        let record = {};
        // record._id = parseInt(userId, 10);
        record.id = parseInt(userId, 10);
        record.name = userName;

        crudService.insertRecordIntoUsers(record, function (err, doc) {
            if (err) {
                return res.send(util.formErrorMessage('ERROR_INTERNAL', 'Database error', err));
            }
            else {
                return res.send(util.formSuccessMessage('SUCCESS_OK', 'Created successfully', doc));
            }
        });
    }
    else {
        return res.send(util.formErrorMessage('ERROR_VALIDATION', 'Empty object given', null));
    }
});

app.get('/user', (req, res) => {
    crudService.getAllRecordsFromUsers(function (err, docs) {
        if (err) {
            return res.send(util.formErrorMessage('ERROR_INTERNAL', 'Database error', err));
        }
        else {
            return res.send(util.formSuccessMessage('SUCCESS_OK', 'ok', docs));
        }

    });
});

app.listen(port, () => console.log('Server is listening on port 3000!'));