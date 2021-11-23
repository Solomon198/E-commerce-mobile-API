/**
 * @api {PUT} /admin/variables/update Set environment variables
 * @apiName Set Variables
 * @apiGroup Admin
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 * @apiParam {number} amountPerKm amout to charge per mile or km
 * @apiParam {number} radiusOfMatch distance from where drivers should be matched
 *
 * @apiSuccess {string} message success message
 * @apiSuccess {object} payload containing environment variables
 * @apiSuccess {number} payload.amountPerKm amout to charge per mile or km
 * @apiSuccess {number} payload.radiusOfMatch distance from where drivers should be matched
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESS",
 *       "payload": {
 *                    "amountPerKm": 50,
 *                    "radiusPerKm": 50,
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
