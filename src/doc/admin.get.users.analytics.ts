/**
 * @api {GET} /admin/analytics/user/:userId Get user analytics
 * @apiName Get User Analytics
 * @apiGroup Admin
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 *
 * @apiSuccess {string} message success message
 * @apiSuccess {object} payload containing analytics information
 * @apiSuccess {number} payload.completedTrips No of completed trips
 * @apiSuccess {number} payload. No of cancelled trips
 * @apiSuccess {number} payload.totalMoneySpent Total money spent by customer
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESS",
 *       "payload": {
 *                    "completedTrips": 50,
 *                    "cancelledTrips": 50,
 *                    "totalMoneySpent": 500,
 *                  }
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
