/**
 * @api {post} /verify/sms Send sms verification
 * @apiName  smsVerification
 * @apiGroup Verification
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 * @apiParam {string} phoneNumber users phone number.
 * @apiParam {string} countryCode two letter country code of user in uppercase e.g NG for Nigeria.
 *
 * @apiSuccess {String} message  describes the success of the action performed.
 * @apiSuccess {String} payload  An object which contains verifcation information.
 * @apiSuccess {String} payload.token  The verification token.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESSFULL",
 *        "payload": {
 *             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnRsRm9ybWF0IjoiKzIzNDkwNTA3MDk0NDQiLCJpYXQiOjE2MTExNDYxMDB9.   qCVA9lh-g64PyMkkcDOxauU9Ok9SCNP1_ceoFc8kALI"
 *                }
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
 *
 * @apiError Last Pin Requested Not timeout.
 * @apiErrorExample Pin-Not-Timeout:
 *     HTTP/1.1 403 FORBIDDEN
 *     {
 *        "error": "PIN.NOT.TIMEOUT",
 *        "mesage": "describes reason for error"
 *     }
 *
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
 * @apiError Invalid login credential .
 * @apiErrorExample InvalidCredential:
 *     HTTP/1.1 403 Forbidden
 *     {
 *        "message": "describes reason for error",
 *        "error": "INVALID.LOGIN.CREDENTIALS"
 *     }
 *
 */
