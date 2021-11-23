/**
 * @api {PUT} /admin/update-driver update a drivers information
 * @apiName Update drivers information
 * @apiGroup Admin
 * @apiVersion  1.0.0
 * @apiSampleRequest off
 *
 *
 *
 * @apiParam {string} userId ID of the user to update information
 * @apiParam {string} firstName user first name
 * @apiParam {string} lastName user last name
 * @apiParam {string} gender user gender ---> male or female
 * @apiParam {string} password users account password, mininum should be 6 and should contain uppercase and lower case with at least a special character and a number.
 * @apiParam {string} driverLicense  drivers license number
 * @apiParam {string} taxiLicense    license number of vehicle
 * @apiParam {string} photo profile photo of driver
 * @apiParam {string} driverLicensePhoto photo of driver license or file
 * @apiParam {object} guarrantorInformation information of guarrantor
 * @apiParam {string} guarrantorInformation.fullName full name of guarrantor
 * @apiParam {string} guarrantorInformation.phoneNumber phone number of guarrantor
 * @apiParam {string} guarrantorInformation.address home address of guarrantor
 * @apiParam {string} guarrantorInformation.ID identity number of guarrantor
 * @apiParam {string} guarrantorInformation.IDType the identity type provided by guarrantor
 * @apiParam {string} guarrantorInformation.placeOfWork guarrantor place of work name
 * @apiParam {string} guarrantorInformation.positionAtWork the rank or position of guarrantor
 * @apiParam {string} guarrantorInformation.addressOfPlaceOfWork the address of guarrantor place of work
 *
 * @apiSuccess {String} message  describes the success of the action performed.
 * @apiSuccess {Object} payload The information of the driver.
 * @apiSuccess {string} payload.userId the ID of the driver
 * @apiSuccess {string} payload.firstName driver first name
 * @apiSuccess {string} payload.lastName driver last name
 * @apiSuccess {string} payload.gender driver gender
 * @apiSuccess {string} payload.phoneNumber driver phone number
 * @apiSuccess {boolean} payload.isVerified driver verification status
 * @apiSuccess {boolean} payload.isAvailable driver availability status
 * @apiSuccess {boolean} payload.isPicker Specify if driver is a picker or not
 * @apiSuccess {string} payload.isActiviated driver activation status
 * @apiSuccess {string} payload.photo driver profilePhoto
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Successful
 *     {
 *       "message": "SUCCESS",
 *       "payload": {
 *                    "userId": "4844849494949",
 *                    "firstName": "David",
 *                    "lastName": "Moyes",
 *                    "gender": "male",
 *                    "phoneNumber": "884430330",
 *                    "isVerified": false,
 *                    "isAvailable": true,
 *                    "isPicker": false,
 *                    "photo":"https://urltophoto.com",
 *                    "isActivated":"true",
 *
 *         }
 *     }
 *
 * @apiError InvalidInput Invalid input parameters.
 * @apiErrorExample InvalidInput:
 *     HTTP/1.1 400 BAD REQUEST
 *     {
 *        "error": "INVALID.PHONE | PASSWORD.STRENGTH.WEEK | INVALID.INPUT",
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
 * @apiError UserExist The user already exist.
 * @apiErrorExample User-Exist:
 *     HTTP/1.1 409 Conflict
 *     {
 *        "message": "describes reason for error",
 *        "error": "USER.EXIST"
 *     }
 *
 */
