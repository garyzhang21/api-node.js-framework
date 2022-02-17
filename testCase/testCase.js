const log4js = require('log4js');
const expect = require('chai').expect;

let url = 'test';
const MainAPI = require('/Users/lin.c.zhang/api-node.js-framework/Bissness/api.js');

var mainApi = new MainAPI(url);

const addContext = require('mochawesome/addContext');
let tcNo = 'Case 1';
let request;
let response;
let timeStamp = new Date();
//syncTime
let syncTimeAPI = 0;


describe(tcNo + ': ', function () {

    this.timeout(20000);
    beforeEach(function () {
        response = null;
        addContext(this, {
            title: 'StartTime',
            value: {
                StartTime: timeStamp = new Date()
            }
        });
    });
    afterEach(function () {
        if (response) {
            addContext(this, {
                title: 'Request',
                value: {
                    Request: request
                }
            });
            addContext(this, {
                title: 'Response',
                value: {
                    Response: response
                }
            });
            addContext(this, {
                title: 'EndTime',
                value: {
                    EndTime: timeStamp = new Date()
                }
            });
        }
    });

    it('case01:', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let id = '75853881571069';
                mainApi.callExpress(id, (res, url, headers) => {
                    //Expect assert
                    expect(res.statusCode).to.equal(200,'Get failed');
                    const resBody = JSON.parse(res.body);
                    console.log(`resBody is `,resBody);
                    done();
                });

            }, syncTimeAPI * 1000);
        } catch (e) {
            done(e);
        }
    });



});


