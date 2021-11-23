/**
 * @api {GET} /admin/analytics/driver/:userId Get driver analytics
 * @apiName Get Driver Analytics
 * @apiGroup Admin
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 *
 * @apiSuccess {string} message success message
 * @apiSuccess {object} payload containing analytics information
 * @apiSuccess {number} payload.completedTrips No of completed trips
 * @apiSuccess {number} payload. No of cancelled trips
 * @apiSuccess {number} payload.totalMoneyEarned Total money earned by driver
 * @apiSucess  {number} payload.balance Driver account balance with plaform
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESS",
 *       "payload": {
 *                    "completedTrips": 50,
 *                    "cancelledTrips": 50,
 *                    "totalMoneyEarned": 500,
 *                    "balance": 5000
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
