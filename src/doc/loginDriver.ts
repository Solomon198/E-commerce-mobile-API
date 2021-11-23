/**
 * @api {post} /login/driver  driver login
 * @apiName DriverLogin
 * @apiGroup User
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 * @apiParam {String} phoneNumber driver phone number.
 * @apiParam {String} password driver account password.
 * @apiParam {String} countryCode two letter country code of user in uppercase e.g NG for Nigeria.
 *
 * @apiSuccess {String} message  describes the success of the action performed.
 * @apiSuccess {String} accessToken  driver access token expires in 1 hour.
 * @apiSuccess {String} refreshToken  driver refresh token which is required to get new access tokens.
 * @apiSuccess {Object} payload the driver object
 * @apiSuccess {Object} payload the driver object
 * @apiSuccess {string} payload.userId the ID of the driver
 * @apiSuccess {string} payload.firstName driver first name
 * @apiSuccess {string} payload.lastName driver last name
 * @apiSuccess {string} payload.gender driver gender
 * @apiSuccess {string} payload.accountType driver account type
 * @apiSuccess {string} payload.phoneNumber driver phone number
 * @apiSuccess {boolean} payload.isVerified driver verification status
 * @apiSuccess {boolean} payload.isAvailable driver availability status
 * @apiSuccess {boolean} payload.isPicker Specify if driver is a picker or not
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESS",
 *       "accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTA4Mjc4MDF9.-Dq68jB_jjpMMucMAPt5uAqbJnZMQUlM58VeL1J6vq0",
 *       "refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc1ZlcmlmaWVkIjpmYWxzZSwiX2lkIjoiNjAwMzQ4MTkzZGE5YzRmODJmODVlNDQ1IiwiZW1haWwiOiIgIiwicGhvbmUiOiIrMjM0OTA1MDcwOTQ0NCIsInVzZXJJZCI6IjYwMDM0ODE5M2RhOWM0ZjgyZjg1ZTQ0NSIsInNhbHQiOiIkMmEkMTAkMGgwVEp3T3hBTEhhQWN0SzNrMHV4ZSIsImhhc2giOiIkMmEkMTAkMGgwVEp3T3hBTEhhQWN0SzNrMHV4ZXlWYmprYzg3NzJrMGpKQzdySFZETGV0V3o1UnV1ODIiLCJpYXQiOjE2MTA4Mjc4MDF9.a5x1yMlnrsAcy32it81SenaPDZdY-THwMXgfuuGDrAk",
 *       "payload": {
 *                    "userId": "4844849494949",
 *                    "firstName": "David",
 *                    "lastName": "Moyes",
 *                    "gender": "male",
 *                    "accountType": "user",
 *                    "phoneNumber": "884430330",
 *                    "isVerified": true,
 *                    "isAvailable": true,
 *                    "isPicker": true,
 *                    "guarrantorInformation":{
 *                           fullName: "Victor Glama",
 *                           phoneNumber: "08034839438",
 *                           address: GF2 Gwari road,
 *                           ID: "848iudjdjj",
 *                           IDType:'nin',
 *                           addressOfPlaceOfWork: "dixre enterprise",
 *                            }
 *                  }
 *     }
 *
 * @apiError Invalid login credential.
 * @apiErrorExample InvalidCredential:
 *     HTTP/1.1 403 Forbidden
 *     {
 *        "message": "describes reason for error",
 *        "error": "INVALID.LOGIN.CREDENTIALS"
 *     }
 *
 * @apiError UserNotVerified The user is not verified.
 * @apiErrorExample Account-Not-Verified:
 *     HTTP/1.1 409 Conflict
 *     {
 *        "error": "ACCOUNT.NOT.VERIFIED",
 *        "message": "describes reason for error"
 *     }
 *
 *
 * @apiError InvalidInput Invalid input parameters.
 * @apiErrorExample InvalidInput:
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *        "error": "INVALID.PHONE | INVALID.INPUT",
 *        "message": "describes reason for error"
 *     }
 *
 * @apiError ServerError Internal server error.
 * @apiErrorExample Internal-Server-Error:
 *     HTTP/1.1 500 Internal server error
 *     {
 *        "error": "SERVER.ERROR",
 *        "mesage": "describes reason for error"
 *     }
 *
 *
 *
 * @apiError User Blocked.
 * @apiErrorExample User-Blocked:
 *     HTTP/1.1 403 FORBIDDEN
 *     {
 *        "error": "USER.SUSPENDED",
 *        "mesage": "describes reason for error"
 *     }
 *
 *
 *
 *
 *
 */
