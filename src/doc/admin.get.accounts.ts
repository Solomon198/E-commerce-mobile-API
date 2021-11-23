/**
 * @api {GET} /admin Get list of all admins
 * @apiName Get Admin accounts
 * @apiGroup Admin
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 *
 * @apiSuccess {string} message success message
 * @apiSuccess {Array} payload Array containing information about the array of admins
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESS",
 *       "payload": [{
 *                    "userId": "4844849494949",
 *                    "firtName": "David",
 *                    "lastName": "Moyes",
 *                    "gender": "male",
 *                    "accountType": "user",
 *                    "phoneNumber": "884430330",
 *                    "isVerified": true,
 *                    "isAvailable": true,
 *                    "isPicker": true,
 *                  },
 *                    ....
 *                 ]
 *
 *     }
 *
 * @apiError InvalidInput Invalid input parameters.
 * @apiErrorExample InvalidInput:
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *        "error": "INVALID.INPUT",
 *        "message": "describes reason for error"
 *     }
 *
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
 *
 */
