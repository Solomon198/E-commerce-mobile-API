/**
 * @api {GET} /card/:userId Get user card
 * @apiName Get Card
 * @apiGroup Card
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 * @apiParam {string}  userId of the user
 *
 * @apiSuccess {string} message describes the success of the action performed
 * @apiSuccess {Object} payload object containing card information
 * @apiSuccess {string} payload.authorization Authorization code from payment platform
 * @apiSuccess {string} payload.cardNumber User Card number
 * @apiSuccess {string} payload.email user email address
 * @apiSuccess {string} payload.userId id of the user
 * @apiSuccess {bolean} payload.outStandingDiscount true if amount charge during verification of card have not been used up on platform
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESS",
 *       "payload":
 *             {
 *               "authorization": "848dAz48.84",
 *               "cardNumber": "134585859494849",
 *                "email": "example@go.com",
 *                "userId": "49dkkdk99393",
 *                "outStandingDiscount": true
 *             }
 *
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
