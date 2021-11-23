/**
 * @api {post} /parcel Create a Parcel to be delivered
 * @apiName Parcel
 * @apiGroup Parcel
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 * @apiParam {string} [userAuthorization] authorization code of the card selected, 
 * @apiParam {number} transactionType specify the transaction type wether cash or card which are 0 and 1 respectively
 * @apiParam {string} parcelOwnerPhoneNumber phone number of owner of parcel
 * @apiParam {string} parcelOwner  id of the parcel owner
 * @apiParam {string} parcelPicker id of driver selected 
 * @apiParam {number} parcelPrice amount for delivering the parcel
 * @apiParam {number} distance distance travel to deliver parcel usually in km(kilometer)
 * @apiParam {string} parcelDestinationPhysicalAddress The physical address of the destination the  parcel is to be delivered
 * @apiParam {string} parcelLocationPhysicalAddress The physical address of the location the  parcel is to be picked

 * @apiParam {Number[]} parcelLocation longitude and latitude of pickup location. NOTE longitude should come first before latitude
 * @apiParam {Number[]} parcelDestination longtitude and latitude of destination location. NOTE longitude should come first before latitude
 * 
 * @apiSuccess {string} message Success message of reques
 * @apiSuccess {payload} object containing response 
 * @apiSuccess {payload.parcelId} parcelId
 *
 *
 *
 *
 *
 *
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESS",
 *       "payload":{
 *          parcelId: "idid994949"
 *        }
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
