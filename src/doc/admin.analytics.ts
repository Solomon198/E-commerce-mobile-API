/**
 * @api {GET} /admin/dashboard-analytics Get informations to display on dashboard
 * @apiName Admin Analytic
 * @apiGroup Admin
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 * @apiSuccess {string} payload object containing analytics information
 * @apiSuccess {string} payload.drivers number of registered drivers
 * @apiSuccess {string} payload.users number of registered users
 * @apiSuccess {string} payload.totalDeliveries number of deliveries in total
 * @apiSuccess {string} payload.completedDeliveries number of completed deliveries
 * @apiSuccess {string} payload.cancelledDeliveries number of deliveries cancelled
 * @apiSuccess {string} payload.activeDeliveries number of active deliveries
 * @apiSuccess {string} payload.applications number of drivers that applied and are not yet confirmed
 * @apiSuccess {object} payload.environmentVariables environmentVariables object
 * @apiSuccess {string} payload.environmentVariables.amountPerKm How much plaform charges per mile/km
 * @apiSuccess {string} payload.environmentVariables.radiusOfMatch distance away from parcel at a circle point of view to match drivers
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESS",
 *       "payload":{
 *                "drivers":85,
 *                "users": 60,
 *                "totalDeliveries":100,
 *                "completedDeliveries": 200,
 *                "cancelledDeliveries": 400,
 *                "activeDeliveries": 599,
 *                "applications": 5489,
 *                "environmentVariables": {
 *                    "amountPerKm": 59,
 *                    "radiusOfMatch": 50,
 *                  }
 *                }
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
