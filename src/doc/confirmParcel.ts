/**
 * @api {put} /parcel/confirm-parcel Parcel Owner request to confirm parcel delivery
 * @apiName Confirm-Parcel
 * @apiGroup Parcel
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 * @apiParam {string} parcelId id of the parcel
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESS",
 *       "payload":{}
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
 * @apiError Invalid-Parcel-Request.
 * @apiErrorExample Invalid-Parcel-Request:
 *     HTTP/1.1 403 FORBIDDEN
 *     {
 *        "error": "NOT.ALLOWED",
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
