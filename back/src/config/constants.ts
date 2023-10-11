
export class Constants {
  public static readonly TIMEZONE = "Asia/Kolkata";
  public static readonly SUCCESS = "SUCCESS";
  public static readonly ERROR = "ERROR";
  public static readonly BAD_DATA = "BAD_DATA";
  public static readonly BACKEND_API_FAILURE = "BACKEND_API_FAILURE";
  public static readonly CODE = "CODE";
  public static readonly APPROVED = "APPROVED";
  public static readonly FEEDBACK_EXITS = "Feedback already exists for this job.";
  public static readonly INVALID_REQUEST = "INVALID_REQUEST";
  public static readonly DRIVER_LISTING = "You have successfully listing a drivers.";
  public static readonly BID_LISTING = "You have successfully listing a bids.";
  public static readonly JOB_LISTING = "You have successfully listing a jobs.";
  public static readonly ONLY_IMAGE = "Please upload only images file.";
  public static readonly ERROR_TOKEN_NOT_FOUND = "Error in middleware.validateAdminUserByToken...error: Token not found.";
  public static readonly ERROR_TOKEN_INVALID = "Error in middleware.validateAdminUserByToken...error: Invalid Token.";
  public static readonly ERROR_TOKEN = "Error in middleware.validateAdminUserByToken...error:";
  public static readonly CONTACT_NUBER_ALREADY_EXITS = "Contact number is already used by another user";
  public static readonly START_AND_END_DATE = "Start and end date is required";
  public static readonly SEND_OTP = "Otp send successfully";
  public static readonly JOB_NOT_FOUND = "Job not found";
  public static readonly JOB_IS_ALREADY_COMPLETED = "Job is already completed";
  public static readonly BID_ALREADY_APPLY = "Vendor have already bid apply";
  public static readonly INVALID_RATING = "Invalid rating. Ratings must be between 1 and 5."
  public static readonly UPDATE_DRIVER_LOCATION = "Driver location updated successfully"
  public static readonly RESET_PASSWORD_SUBJECT = "Logistic Application Your Password Reset OTP"
  public static readonly SEND_PASSWORD_TO_DRIVER = "Logistic Application Your Password Reset OTP"
  public static readonly NO_DRIVER_AVAILABLE = "Your New Driver Account"
  public static readonly EMAIL_IS_USED = "Email is already used pls used different email"
  public static readonly IMAGE_SIZE = 10485760;
  public static readonly PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,14}$/
  public static readonly SELCET_BOTH_LICENCE = "Both license images (front and back) are required."
  public static readonly PASSWORD_ERROR = 'Password must start with an uppercase letter, be 8 characters long, and include at least one special character.'
  public static readonly RESPONSE_CODE = {
    success: 200,
    error: {
      internalServerError: 500,
      badRequest: 400,
      unauthorized: 401,
      forbidden: 403,
      notFound: 404,
    },
  };
  public static readonly SOCIAL_TYPE = {
    FACEBOOK: "FACEBOOK",
    GOOGLE: "GOOGLE",
  };
  public static readonly aws = {
    userImage: "user",
  };
}
