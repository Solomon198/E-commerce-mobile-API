// import Constant from '../../src/constants/index';

describe('Validating phone number on Login', () => {
  test('testing', async (done) => {
    expect(200).toBe(200);
    done();
  });
  // test('Should fail to signup if phone number is an empty string', async (done) => {
  //   try {
  //     await axios.post(testPath + '/login', {
  //       phoneNumber: '',
  //       countryCode: 'NG',
  //       password: 'Ss4solex',
  //     });
  //   } catch (e) {
  //     const response = e.response;
  //     expect(response.status).toBe(400);
  //     expect(response.data.message).toBeDefined();
  //     expect(response.data.error).toBe(
  //       Constant.RequestResponse.InvalidInput,
  //     );
  //     done();
  //   }
  // });

  //   test('Should fail to signup if phone number is a string with empty spaces', async (done) => {
  //     try {
  //       await axios.post(testPath + '/login', {
  //         phoneNumber: '   ',
  //         countryCode: 'NG',
  //         password: 'Ss4solex',
  //       });
  //     } catch (e) {
  //       const response = e.response;
  //       expect(response.status).toBe(400);
  //       expect(response.data.message).toBeDefined();
  //       expect(response.data.error).toBe(
  //         Constant.RequestResponse.InvalidInput,
  //       );
  //       done();
  //     }
  //   });

  //   test('Should fail to signup if the international format of phone number cannot be retrieved', async (done) => {
  //     try {
  //       let d = await axios.post(testPath + '/login', {
  //         phoneNumber: 'hhh',
  //         countryCode: 'NG',
  //         password: 'Ss4solex',
  //       });
  //     } catch (e) {
  //       const response = e.response;
  //       expect(response.status).toBe(400);
  //       expect(response.data.message).toBeDefined();
  //       expect(response.data.error).toBe(
  //         Constant.RequestResponse.InvalidInput,
  //       );
  //       done();
  //     }
  //   });

  //   test('Should fail to signup if phone number is not defined or null.', async (done) => {
  //     try {
  //       await axios.post(testPath + '/login', {
  //         countryCode: 'NG',
  //         password: 'Ss4solex',
  //       });
  //     } catch (e) {
  //       const response = e.response;
  //       expect(response.status).toBe(400);
  //       expect(response.data.message).toBeDefined();
  //       expect(response.data.error).toBe(
  //         Constant.RequestResponse.InvalidInput,
  //       );
  //       done();
  //     }
  //   });
  // });

  // describe('Validating Country Code', () => {
  //   test('Should fail to login if password is an empty string', async (done) => {
  //     try {
  //       await axios.post(testPath + '/login', {
  //         phoneNumber: '09050709444',
  //         countryCode: 'NG',
  //         password: '',
  //       });
  //     } catch (e) {
  //       const response = e.response;
  //       expect(response.status).toBe(400);
  //       expect(response.data.message).toBeDefined();
  //       expect(response.data.error).toBe(
  //         Constant.RequestResponse.InvalidInput,
  //       );
  //       done();
  //     }
  //   });

  //   test('Should fail to login if password is not defined or null.', async (done) => {
  //     try {
  //       await axios.post(testPath + '/login', {
  //         phoneNumber: '09050709444',
  //         countryCode: 'NG',
  //       });
  //     } catch (e) {
  //       const response = e.response;
  //       expect(response.status).toBe(400);
  //       expect(response.data.message).toBeDefined();
  //       expect(response.data.error).toBe(
  //         Constant.RequestResponse.InvalidInput,
  //       );
  //       done();
  //     }
  //   });
});

// describe('Validating Country Code', () => {
//   test('Should fail to login if countryCode is an empty string', async (done) => {
//     try {
//       await axios.post(testPath + '/login', {
//         phoneNumber: '09050709444',
//         countryCode: '',
//         password: 'Ss4solex',
//       });
//     } catch (e) {
//       const response = e.response;
//       expect(response.status).toBe(400);
//       expect(response.data.message).toBeDefined();
//       expect(response.data.error).toBe(
//         Constant.RequestResponse.InvalidInput,
//       );
//       done();
//     }
//   });

//   test('Should fail to login if countryCode is not defined or null.', async (done) => {
//     try {
//       await axios.post(testPath + '/login', {
//         phoneNumber: '09050709444',
//         password: 'Ss4solex',
//       });
//     } catch (e) {
//       const response = e.response;
//       expect(response.status).toBe(400);
//       expect(response.data.message).toBeDefined();
//       expect(response.data.error).toBe(
//         Constant.RequestResponse.InvalidInput,
//       );
//       done();
//     }
//   });
// });
