import * as superTest from 'supertest';
import DatabaseConnection from '../../src/utills/connection';
import App from '../../src/index';
import Constant from '../../src/constants/index';

const ApplicationTest = superTest(App);

beforeAll(async () => {
  try {
    await DatabaseConnection.dropCollection('users');
    await DatabaseConnection.dropCollection('verifications');
    await DatabaseConnection.dropCollection('parcels');
    await DatabaseConnection.dropCollection('cards');
    await DatabaseConnection.dropCollection('drivers');
    await DatabaseConnection.dropCollection('debtmanagers');
    await DatabaseConnection.dropCollection('wallets');
    await DatabaseConnection.dropCollection('transactionhistories');
  } catch (e) {
    console.log(e);
  }
});

//-----------------------------------------------------------------------
//----------------------------------------------------------------------------------
// Testing User Authentication
//=======================================
//==============================================================

describe('Testing Dansako User Authentication Application flow, E2E', () => {
  //test Data
  let user = {
    phoneNumber: '09050709444',
    firstName: 'solomon',
    lastName: 'yunana',
    gender: 'male',
    countryCode: 'NG',
    password: 'Ss4solex',
  };
  let token: string;
  let pin: string;
  let accessToken: string;
  let refreshToken: string;

  test('Should signup / register user successfully', async (done) => {
    ApplicationTest.post('/signUp')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { message, payload } = response.body;
        expect(response.status).toBe(200);
        expect(message).toBeDefined();
        expect(typeof payload).toBe('object');
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should fail to login, since user is not verified', async (done) => {
    ApplicationTest.post('/login')
      .send({
        phoneNumber: user.phoneNumber,
        password: user.password,
        countryCode: user.countryCode,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409)
      .then((response) => {
        const { message, error } = response.body;
        expect(response.status).toBe(409);
        expect(message).toBeDefined();
        expect(error).toBe(
          Constant.RequestResponse.AccountNotVerified,
        );
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should send sms and get a token that can be used for verifying account ', async (done) => {
    ApplicationTest.post('/verify/sms')
      .send({
        phoneNumber: user.phoneNumber,
        countryCode: user.countryCode,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { payload } = response.body;
        expect(response.status).toBe(200);
        expect(payload.token).toBeDefined();
        expect(payload.pin).toBeDefined();
        token = payload.token;
        pin = payload.pin;
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should not send sms and get a token that can be used for verifying account since time last sent code is barely 3 minutes ', async (done) => {
    ApplicationTest.post('/verify/call')
      .send({
        phoneNumber: user.phoneNumber,
        countryCode: user.countryCode,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(403)
      .then((response) => {
        const { error } = response.body;
        expect(response.status).toBe(403);
        expect(error).toBe(Constant.RequestResponse.PinNotTimeOut);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should fail if pin is not correct', async (done) => {
    ApplicationTest.post('/verify/code')
      .send({
        token: token,
        pin: '2333',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .then((response) => {
        const { error, message } = response.body;
        expect(response.status).toBe(401);
        expect(message).toBeDefined();
        expect(error).toBe(
          Constant.RequestResponse.UnAuthorizedRequest,
        );
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should verify account since pin and token is ok', async (done) => {
    ApplicationTest.post('/verify/code')
      .send({
        token: token,
        pin: pin,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { message, payload } = response.body;
        expect(response.status).toBe(200);
        expect(message).toBeDefined();
        expect(payload.accessToken).toBeDefined();
        expect(payload.refreshToken).toBeDefined();
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should not be able to login with invalid credentials', async (done) => {
    ApplicationTest.post('/login')
      .send({
        phoneNumber: user.phoneNumber,
        countryCode: user.countryCode,
        password: user.password + 'xx',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(403)
      .then((response) => {
        let { error } = response.body;
        expect(response.status).toBe(403);
        expect(error).toBe(
          Constant.RequestResponse.InvalidCredential,
        );
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should be able to login from a verified account', async (done) => {
    ApplicationTest.post('/login')
      .send({
        phoneNumber: user.phoneNumber,
        password: user.password,
        countryCode: user.countryCode,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const data = response.body;
        expect(response.status).toBe(200);
        expect(data.message).toBeDefined();
        expect(data.accessToken).toBeDefined();
        expect(data.refreshToken).toBeDefined();
        expect(typeof data.payload).toBe('object');
        accessToken = data.accessToken;
        refreshToken = data.refreshToken;
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should change password successfully since pin and token is ok', async (done) => {
    ApplicationTest.post('/reset-password')
      .send({
        accessToken: accessToken,
        password: user.password,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { message, payload } = response.body;
        const { accessToken, refreshToken } = payload;
        expect(response.status).toBe(200);
        expect(message).toBeDefined();
        expect(accessToken).toBeDefined();
        expect(refreshToken).toBeDefined();
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should not be able to signup with a verified account', async (done) => {
    ApplicationTest.post('/signUp')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409)
      .then((response) => {
        const { message, error } = response.body;
        expect(response.status).toBe(409);
        expect(message).toBeDefined();
        expect(error).toBe(Constant.RequestResponse.UserExist);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should not be able to get new access token due to invalid token', async (done) => {
    ApplicationTest.post('/token/refresh')
      .send({
        refreshToken: 'kdeieidkdkdkdkdk',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(403)
      .then((response) => {
        const { message, error } = response.body;
        expect(response.status).toBe(403);
        expect(message).toBeDefined();
        expect(error).toBe(
          Constant.RequestResponse.InvalidCredential,
        );
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should be able to get an access token with a valid refresh token', async (done) => {
    ApplicationTest.post('/token/refresh')
      .send({
        refreshToken: refreshToken,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((response) => {
        const { payload, message } = response.body;
        expect(response.status).toBe(200);
        expect(message).toBeDefined();
        expect(payload.accessToken).toBeDefined();
        done();
      });
  });
});

//-----------------------------------------------------------------------
//----------------------------------------------------------------------------------
// Testing Driver Authentication
//=======================================
//==============================================================

describe('Testing Dansako Driver Authentication Application flow, E2E', () => {
  //test Data
  let user = {
    phoneNumber: '08105007352',
    countryCode: 'NG',
    firstName: 'David',
    lastName: 'James',
    gender: 'male',
    password: 'Ss5@848484848',
    driverLicense: '8484888d8484938',
    taxiLicense: '8Q8488d8djdjd8d88',
    driverLicensePhoto: 'https://firebase.io.image.com',
    photo: 'https://firebase.io.image',
    guarrantorInformation: {
      fullName: 'Ezra Monday',
      phoneNumber: '07036183471',
      address: 'No 7 club road',
      ID: '949kdkdk949949kdk',
      email: 'solomonyunana95@gmail.com',
      IDType: 'nin',
      placeOfWork: 'No 5 club road',
      positionAtWork: 'Dixre Enterprise',
      addressOfPlaceOfWork: 'COO',
    },
  };
  let token: string;
  let pin: string;
  let accessToken: string;
  let refreshToken: string;

  test('Should signup / register driver successfully', async (done) => {
    ApplicationTest.post('/signUp/driver')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { message, payload } = response.body;
        expect(response.status).toBe(200);
        expect(message).toBeDefined();
        expect(typeof payload).toBe('object');
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should fail to login, since driver is not verified', async (done) => {
    ApplicationTest.post('/login/driver')
      .send({
        phoneNumber: user.phoneNumber,
        password: user.password,
        countryCode: user.countryCode,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409)
      .then((response) => {
        const { message, error } = response.body;
        expect(response.status).toBe(409);
        expect(message).toBeDefined();
        expect(error).toBe(
          Constant.RequestResponse.AccountNotVerified,
        );
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should send sms and get a token that can be used for verifying account ', async (done) => {
    ApplicationTest.post('/verify/sms')
      .send({
        phoneNumber: user.phoneNumber,
        countryCode: user.countryCode,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { payload } = response.body;
        expect(response.status).toBe(200);
        expect(payload.token).toBeDefined();
        expect(payload.pin).toBeDefined();
        token = payload.token;
        pin = payload.pin;
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should not send sms and get a token that can be used for verifying account since time last sent code is barely 3 minutes ', async (done) => {
    ApplicationTest.post('/verify/call')
      .send({
        phoneNumber: user.phoneNumber,
        countryCode: user.countryCode,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(403)
      .then((response) => {
        const { error } = response.body;
        expect(response.status).toBe(403);
        expect(error).toBe(Constant.RequestResponse.PinNotTimeOut);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should fail if pin is not correct', async (done) => {
    ApplicationTest.post('/verify/code')
      .send({
        token: token,
        pin: '2333',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .then((response) => {
        const { error, message } = response.body;
        expect(response.status).toBe(401);
        expect(message).toBeDefined();
        expect(error).toBe(
          Constant.RequestResponse.UnAuthorizedRequest,
        );
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should verify account since pin and token is ok', async (done) => {
    ApplicationTest.post('/verify/code')
      .send({
        token: token,
        pin: pin,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { message, payload } = response.body;
        expect(response.status).toBe(200);
        expect(message).toBeDefined();
        expect(payload.accessToken).toBeDefined();
        expect(payload.refreshToken).toBeDefined();
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should not be able to login with invalid credentials', async (done) => {
    ApplicationTest.post('/login/driver')
      .send({
        phoneNumber: user.phoneNumber,
        countryCode: user.countryCode,
        password: user.password + 'xx',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(403)
      .then((response) => {
        let { error } = response.body;
        expect(response.status).toBe(403);
        expect(error).toBe(
          Constant.RequestResponse.InvalidCredential,
        );
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should be able to login from a verified account', async (done) => {
    ApplicationTest.post('/login/driver')
      .send({
        phoneNumber: user.phoneNumber,
        password: user.password,
        countryCode: user.countryCode,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const data = response.body;
        expect(response.status).toBe(200);
        expect(data.message).toBeDefined();
        expect(data.accessToken).toBeDefined();
        expect(data.refreshToken).toBeDefined();
        expect(typeof data.payload).toBe('object');
        accessToken = data.accessToken;
        refreshToken = data.refreshToken;
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should change password successfully since pin and token is ok', async (done) => {
    ApplicationTest.post('/reset-password')
      .send({
        accessToken: accessToken,
        password: user.password,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { message, payload } = response.body;
        const { accessToken, refreshToken } = payload;
        expect(response.status).toBe(200);
        expect(message).toBeDefined();
        expect(accessToken).toBeDefined();
        expect(refreshToken).toBeDefined();
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should not be able to signup with a verified account', async (done) => {
    ApplicationTest.post('/signUp/driver')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409)
      .then((response) => {
        const { message, error } = response.body;
        expect(response.status).toBe(409);
        expect(message).toBeDefined();
        expect(error).toBe(Constant.RequestResponse.UserExist);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should not be able to get new access token due to invalid token', async (done) => {
    ApplicationTest.post('/token/refresh')
      .send({
        refreshToken: 'kdeieidkdkdkdkdk',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(403)
      .then((response) => {
        const { message, error } = response.body;
        expect(response.status).toBe(403);
        expect(message).toBeDefined();
        expect(error).toBe(
          Constant.RequestResponse.InvalidCredential,
        );
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should be able to get an access token with a valid refresh token', async (done) => {
    ApplicationTest.post('/token/refresh')
      .send({
        refreshToken: refreshToken,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((response) => {
        const { payload, message } = response.body;
        expect(response.status).toBe(200);
        expect(message).toBeDefined();
        expect(payload.accessToken).toBeDefined();
        done();
      });
  });
});

//-----------------------------------------------------------------------
//----------------------------------------------------------------------------------
// Testing Extra User Authentication to check for brutforce attack on login and pin verification to account
//=======================================
//==============================================================

describe('Testing Security Measure on login, and verification, E2E', () => {
  //test Data
  let user = {
    phoneNumber: '09050709445',
    firstName: 'Test',
    lastName: 'Brutfox',
    gender: 'male',
    countryCode: 'NG',
    password: 'Ss4solex',
  };
  let token: string;
  let pin: string;
  let accessToken: string;
  let refreshToken: string;

  test('Should signup / register user successfully', async (done) => {
    ApplicationTest.post('/signUp')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { message, payload } = response.body;
        expect(response.status).toBe(200);
        expect(message).toBeDefined();
        expect(typeof payload).toBe('object');
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should send sms and get a token that can be used for verifying account ', async (done) => {
    ApplicationTest.post('/verify/sms')
      .send({
        phoneNumber: user.phoneNumber,
        countryCode: user.countryCode,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { payload } = response.body;
        expect(response.status).toBe(200);
        expect(payload.token).toBeDefined();
        expect(payload.pin).toBeDefined();
        token = payload.token;
        pin = payload.pin;
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should not send sms and get a token that can be used for verifying account since time last sent code is barely 3 minutes ', async (done) => {
    ApplicationTest.post('/verify/call')
      .send({
        phoneNumber: user.phoneNumber,
        countryCode: user.countryCode,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(403)
      .then((response) => {
        const { error } = response.body;
        expect(response.status).toBe(403);
        expect(error).toBe(Constant.RequestResponse.PinNotTimeOut);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should fail if pin is not correct', async (done) => {
    ApplicationTest.post('/verify/code')
      .send({
        token: token,
        pin: '2333',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .then((response) => {
        const { error, message } = response.body;
        expect(response.status).toBe(401);
        expect(message).toBeDefined();
        expect(error).toBe(
          Constant.RequestResponse.UnAuthorizedRequest,
        );
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should verify account since pin and token is ok', async (done) => {
    ApplicationTest.post('/verify/code')
      .send({
        token: token,
        pin: pin,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { message, payload } = response.body;
        expect(response.status).toBe(200);
        expect(message).toBeDefined();
        expect(payload.accessToken).toBeDefined();
        expect(payload.refreshToken).toBeDefined();
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should not be able to login with invalid credentials', async (done) => {
    ApplicationTest.post('/login')
      .send({
        phoneNumber: user.phoneNumber,
        countryCode: user.countryCode,
        password: user.password + 'xx',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(403)
      .then((response) => {
        let { error } = response.body;
        expect(response.status).toBe(403);
        expect(error).toBe(
          Constant.RequestResponse.InvalidCredential,
        );
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should be able to login from a verified account', async (done) => {
    ApplicationTest.post('/login')
      .send({
        phoneNumber: user.phoneNumber,
        password: user.password,
        countryCode: user.countryCode,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const data = response.body;
        expect(response.status).toBe(200);
        expect(data.message).toBeDefined();
        expect(data.accessToken).toBeDefined();
        expect(data.refreshToken).toBeDefined();
        expect(typeof data.payload).toBe('object');
        accessToken = data.accessToken;
        refreshToken = data.refreshToken;
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should change password successfully since pin and token is ok', async (done) => {
    ApplicationTest.post('/reset-password')
      .send({
        accessToken: accessToken,
        password: user.password,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { message, payload } = response.body;
        const { accessToken, refreshToken } = payload;
        expect(response.status).toBe(200);
        expect(message).toBeDefined();
        expect(accessToken).toBeDefined();
        expect(refreshToken).toBeDefined();
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('User should be blocked after 3 login attempts within two hours. i.e user should only get 3 login attempts in 2 hours', async (done) => {
    const invalidCred = {
      phoneNumber: user.phoneNumber,
      countryCode: user.countryCode,
      password: user.password + 'xx',
    };

    await ApplicationTest.post('/login')
      .send(invalidCred)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    await ApplicationTest.post('/login')
      .send(invalidCred)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    await ApplicationTest.post('/login')
      .send(invalidCred)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    //user should be blocked on performing the third login attempt
    ApplicationTest.post('/login')
      .send(invalidCred)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(403)
      .then((response) => {
        const { error } = response.body;
        expect(response.status).toBe(403);
        expect(error).toBe(Constant.RequestResponse.UserSuspended);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should not be able to signup with a verified account', async (done) => {
    ApplicationTest.post('/signUp')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409)
      .then((response) => {
        const { message, error } = response.body;
        expect(response.status).toBe(409);
        expect(message).toBeDefined();
        expect(error).toBe(Constant.RequestResponse.UserExist);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should not be able to get new access token due to invalid token', async (done) => {
    ApplicationTest.post('/token/refresh')
      .send({
        refreshToken: 'kdeieidkdkdkdkdk',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(403)
      .then((response) => {
        const { message, error } = response.body;
        expect(response.status).toBe(403);
        expect(message).toBeDefined();
        expect(error).toBe(
          Constant.RequestResponse.InvalidCredential,
        );
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should be able to get an access token with a valid refresh token', async (done) => {
    ApplicationTest.post('/token/refresh')
      .send({
        refreshToken: refreshToken,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((response) => {
        const { payload, message } = response.body;
        expect(response.status).toBe(200);
        expect(message).toBeDefined();
        expect(payload.accessToken).toBeDefined();
        done();
      });
  });
});

//====================================================================
//===================== Testing card functionality
//============================================================================
//=======================================================================

describe('Testing Adding User And Driver Credit Card Authorization', () => {
  let user: any;
  let driver: any;
  let paymentDetailsUser = {
    email: 'solomonyunana95@gmail.com',
    cardNumber: '5848483038483938484938',
    reference: 'trx_8fp4zg3r',
    userId: '',
  };

  let paymentDetailsDriver = {
    email: 'solomonyunana96@gmail.com',
    cardNumber: '4848483038483938484938',
    reference: 'trx_mvcmy1l2',
    userId: '',
  };

  const userLoginCreds = {
    phoneNumber: '09050709444',
    countryCode: 'NG',
    password: 'Ss4solex',
  };

  const driverLoginCreds = {
    phoneNumber: '08105007352',
    countryCode: 'NG',
    password: 'Ss5@848484848',
  };

  test('Should be able to login to set the driver object', async (done) => {
    ApplicationTest.post('/login/driver')
      .send(driverLoginCreds)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const data = response.body;
        expect(response.status).toBe(200);
        expect(data.message).toBeDefined();
        expect(data.accessToken).toBeDefined();
        expect(data.refreshToken).toBeDefined();
        expect(typeof data.payload).toBe('object');
        driver = data.payload;
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should be able to login to set the user object', async (done) => {
    ApplicationTest.post('/login')
      .send(userLoginCreds)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const data = response.body;
        expect(response.status).toBe(200);
        expect(data.message).toBeDefined();
        expect(data.accessToken).toBeDefined();
        expect(data.refreshToken).toBeDefined();
        expect(typeof data.payload).toBe('object');
        user = data.payload;
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Add User credit Card', async (done) => {
    ApplicationTest.post('/card')
      .send({ ...paymentDetailsUser, userId: user.userId })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { authorization, cardNumber } = response.body.payload;
        expect(authorization).toBeDefined();
        expect(cardNumber).toBe(paymentDetailsUser.cardNumber);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Get User Credit Card', async (done) => {
    ApplicationTest.get(`/card/${user.userId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { payload } = response.body;
        expect(typeof payload).toBe('object');
        expect(payload.cardNumber).toBe(
          paymentDetailsUser.cardNumber,
        );
        expect(payload.authorization).toBeDefined();
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Checking if user Card exist or ', async (done) => {
    ApplicationTest.post(`/card/check`)
      .send({
        cardNumber: paymentDetailsUser.cardNumber,
        userId: user.userId,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .then((response) => {
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  // test('Should not be able to Remove User valid card since it have no outstanding payment', async (done) => {
  //   ApplicationTest.delete(`/card/${userAuthorization}`)
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(500)
  //     .then((response) => {
  //       done();
  //     })
  //     .catch((e) => {
  //       done(e);
  //     });
  // });

  test('Add Driver credit Card', async (done) => {
    ApplicationTest.post('/card')
      .send({ ...paymentDetailsDriver, userId: driver.userId })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { authorization, cardNumber } = response.body.payload;
        expect(authorization).toBeDefined();
        expect(cardNumber).toBe(paymentDetailsDriver.cardNumber);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Get Driver Credit Card', async (done) => {
    ApplicationTest.get(`/card/${driver.userId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { payload } = response.body;
        expect(typeof payload).toBe('object');
        expect(payload.cardNumber).toBe(
          paymentDetailsDriver.cardNumber,
        );
        expect(payload.authorization).toBeDefined();
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Checking if Driver Card exist or ', async (done) => {
    ApplicationTest.post(`/card/check`)
      .send({
        cardNumber: paymentDetailsDriver.cardNumber,
        userId: driver.userId,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .then((response) => {
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  // test('Should  be able to Remove Driver  card since it have no outstanding payment on it', async (done) => {
  //   ApplicationTest.delete(`/card/${driverAuthorization}`)
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .then((response) => {
  //       done();
  //     })
  //     .catch((e) => {
  //       done(e);
  //     });
  // });
});

describe('Test main app functionality between driver and user', () => {
  let user: any;
  let driver: any;
  let cashTransactionParcel: string;
  let cardTransactionParcel: string;

  const userLoginCreds = {
    phoneNumber: '09050709444',
    countryCode: 'NG',
    password: 'Ss4solex',
  };

  const driverLoginCreds = {
    phoneNumber: '08105007352',
    countryCode: 'NG',
    password: 'Ss5@848484848',
  };

  const testParcel = {
    transactionType: 0,
    parcelOwner: '60789bf44d6baf002721b923',
    parcelPicker: '607897c94d6baf002721b921',
    distance: 2,
    parcelPrice: 100,
    parcelOwnerPhoneNumber: userLoginCreds.phoneNumber,
    parcelLocationPhysicalAddress:
      'Guaranty Trust Bank, Race Course Road, City Centre, Kaduna, Nigeria',
    parcelDestinationPhysicalAddress:
      'Golf Course Road, City Centre, Kaduna, Nigeria',
    parcelLocation: ['7.437041066586971', '10.535496005021187'],
    parcelDestination: ['7.444148249924184', '10.520786183838831'],
  };

  test('Should be able to login to set the driver object', async (done) => {
    ApplicationTest.post('/login/driver')
      .send(driverLoginCreds)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const data = response.body;
        expect(response.status).toBe(200);
        expect(data.message).toBeDefined();
        expect(data.accessToken).toBeDefined();
        expect(data.refreshToken).toBeDefined();
        expect(typeof data.payload).toBe('object');
        driver = data.payload;
        testParcel.parcelPicker = data.payload.userId;
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Should be able to login to set the user object', async (done) => {
    ApplicationTest.post('/login')
      .send(userLoginCreds)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const data = response.body;
        expect(response.status).toBe(200);
        expect(data.message).toBeDefined();
        expect(data.accessToken).toBeDefined();
        expect(data.refreshToken).toBeDefined();
        expect(typeof data.payload).toBe('object');
        user = data.payload;
        testParcel.parcelOwner = data.payload.userId;
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Create a parcel with cash transaction', async (done) => {
    ApplicationTest.post('/parcel')
      .send({
        ...testParcel,
        parcelOwner: user.userId,
        parcelPicker: driver.userId,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { parcelId } = response.body.payload;
        cashTransactionParcel = parcelId;
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Driver pickup parcel -- Cash transaction', async (done) => {
    ApplicationTest.put('/parcel/picked-parcel')
      .send({
        parcelId: cashTransactionParcel,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Driver delivered parcel -- Cash transaction', async (done) => {
    ApplicationTest.put('/parcel/deliver-parcel')
      .send({
        parcelId: cashTransactionParcel,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Parcel Owner confirms parcel is  delivered -- Cash transaction', async (done) => {
    ApplicationTest.put('/parcel/confirm-parcel')
      .send({
        parcelId: cashTransactionParcel,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Create a parcel with card transaction ', async (done) => {
    ApplicationTest.post('/parcel')
      .send({
        ...testParcel,
        transactionType: 1,
        userAuthorization: '94949kdkdkdk',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const { parcelId } = response.body.payload;
        cardTransactionParcel = parcelId;
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Driver pickup parcel --- Card transaction', async (done) => {
    ApplicationTest.put('/parcel/picked-parcel')
      .send({
        parcelId: cardTransactionParcel,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Driver delivered parcel card transaction', async (done) => {
    ApplicationTest.put('/parcel/deliver-parcel')
      .send({
        parcelId: cardTransactionParcel,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  test('Parcel Owner confirms parcel is  delivered card transaction', async (done) => {
    ApplicationTest.put('/parcel/confirm-parcel')
      .send({
        parcelId: cardTransactionParcel,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});
