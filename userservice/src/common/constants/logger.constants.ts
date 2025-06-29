export const LOGGER_MESSAGES = {
  SIGNUP_FAILED: 'Signup failed: User already exists - {email}',
  SIGNUP_INITIATED: 'User signup initiated and verification email sent: {email}',
  SIGNUP_ERROR: 'Signup error: {error}',
  EMAIL_VERIFICATION_FAILED_TOKEN: 'Email verification failed: Token expired for user {userId}',
  EMAIL_VERIFICATION_FAILED_INVALID: 'Email verification failed: Invalid token for user {userId}',
  EMAIL_VERIFICATION_FAILED_NOT_FOUND: 'Email verification failed: User data not found - {userId}',
  EMAIL_VERIFICATION_FAILED_SAVE: 'Email verification failed: Failed to save user - {userId}',
  EMAIL_VERIFIED: 'Email verified and user saved for: {userId}',
  EMAIL_VERIFICATION_ERROR: 'Email verification error: {error}',
  LOGIN_FAILED: 'Login failed for: {email}',
  LOGIN_NOT_VERIFIED: 'Login failed: User not verified - {email}',
  LOGIN_BLOCKED: 'Login failed: User not verified - {email}',
  LOGIN_SUCCESS: 'User logged in: {email}',
  LOGIN_TOKEN_ERROR: 'Login error during token generation: {error}',
  TOKEN_REFRESH_ERROR: 'Token refresh error: {error}',
  TOKEN_VALIDATION_ERROR: 'Token validation error: {error}',
  PASSWORD_CHANGE_NOT_FOUND: 'Password change failed: User not found - {userId}',
  PASSWORD_CHANGE_TOO_SHORT: 'Password change failed: Password too short for user {userId}',
  PASSWORD_CHANGE_INCORRECT: 'Password change failed: Incorrect old password for user {userId}',
  PASSWORD_CHANGE_SAME_OLD:
    'Password change failed: New password cannot be the same as old password for user {userId}',
  PASSWORD_CHANGE_SAME_CURRENT:
    'Password change failed: New password cannot be the same as current password for user {userId}',
  PASSWORD_CHANGED: 'Password changed for userId: {userId}',
  PASSWORD_CHANGE_ERROR: 'Password change error: {error}',
  PASSWORD_RESET_NOT_FOUND: 'Password reset initiation failed: User not found - {email}',
  PASSWORD_RESET_OTP_SENT: 'Password reset OTP sent to: {email}',
  PASSWORD_RESET_INIT_ERROR: 'Password reset initiation error: {error}',
  OTP_VERIFICATION_NOT_FOUND: 'OTP verification failed: User not found - {email}',
  OTP_VERIFICATION_FAILED: 'OTP verification failed for user: {email}',
  OTP_VERIFICATION_EXPIRED: 'OTP verification failed: OTP is expired for user {email}',
  OTP_VERIFIED: 'OTP verified for password reset: {email}',
  OTP_VERIFICATION_ERROR: 'OTP verification error: {error}',
  PASSWORD_RESET_FAILED_NOT_FOUND: 'Password reset failed: User not found - {email}',
  PASSWORD_RESET_INVALID_TOKEN: 'Password reset failed: Invalid reset token for user {email}',
  PASSWORD_RESET_TOKEN_EXPIRED: 'Password reset failed: Reset token is expired for user {email}',
  PASSWORD_RESET_TOO_SHORT: 'Password reset failed: Password too short for user {email}',
  PASSWORD_RESET_COMPLETED: 'Password reset completed for email: {email}',
  PASSWORD_RESET_ERROR: 'Password reset error: {error}',
  ADD_ADDRESS_NOT_FOUND: 'Add address failed: User not found - {userId}',
  ADD_ADDRESS_SUCCESS: 'Address added for userId: {userId}',
  ADD_ADDRESS_ERROR: 'Add address error: {error}',
  GET_ADDRESS_NOT_FOUND: 'Get addresses failed: User not found - {userId}',
  GET_ADDRESS_SUCCESS: 'Fetched addresses for userId: {userId}',
  GET_ADDRESS_ERROR: 'Get addresses error: {error}',
  UPDATE_ADDRESS_NOT_FOUND: 'Update address failed: User not found - {userId}',
  UPDATE_ADDRESS_NOT_FOUND_ADDRESS: 'Update address failed: Address not found - {addressId}',
  UPDATE_ADDRESS_NOT_FOUND_AFTER: 'Update address failed: User not found after update - {userId}',
  UPDATE_ADDRESS_NOT_FOUND_ADDRESS_AFTER:
    'Update address failed: Address not found after update - {addressId}',
  UPDATE_ADDRESS_SUCCESS: 'Address updated for userId: {userId}, addressId: {addressId}',
  UPDATE_ADDRESS_ERROR: 'update address error: {error}',
  DELETE_ADDRESS_NOT_FOUND: 'Delete address failed: User not found - {userId}',
  DELETE_ADDRESS_NOT_FOUND_ADDRESS: 'Delete address failed: Address not found - {addressId}',
  DELETE_ADDRESS_SUCCESS: 'Address deleted for userId: {userId}, addressId: {addressId}',
  DELETE_ADDRESS_ERROR: 'delete address error: {error}',
  GET_PROFILE_NOT_FOUND: 'Get user failed: User not found - {userId}',
  GET_PROFILE_SUCCESS: 'Fetched user by ID: {userId}',
  EDIT_PROFILE_NOT_FOUND: 'Edit profile failed: User not found - {userId}',
  EDIT_PROFILE_SUCCESS: 'Updated profile for user: {userId}',
  LOGOUT_SUCCESS: 'User logged out successfully with token: {token}',
  LOGOUT_ERROR: 'Logout error: {error}, token: {token}',
  SIGNUP_ATTEMPT: 'Signup attempt for email: {email}',
  SIGNUP_SUCCESS: 'Signup successful for email: {email}',
  EMAIL_VERIFICATION_ATTEMPT: 'Email verification attempt for user: {userId}',
  EMAIL_VERIFICATION_SUCCESS: 'Email verification successful for user: {userId}',
  LOGIN_ATTEMPT: 'Login attempt for email: {email}',
  LOGIN_ERROR: 'Login failed for email: {email} - {error}',
  GOOGLE_LOGIN_INITIATED: 'Google login initiated',
  GOOGLE_LOGIN_INIT_ERROR: 'Google login initiation failed - {error}',
  GOOGLE_LOGIN_REDIRECT: 'Google login redirect for user: {email}',
  GOOGLE_LOGIN_SUCCESS: 'Google login successful for user: {email}',
  GOOGLE_LOGIN_REDIRECT_ERROR: 'Google login redirect failed - {error}',
  TOKEN_REFRESH_SUCCESS: 'Token refresh successful for user: {userId}',
  PASSWORD_RESET_INITIATED: 'Password reset initiation for email: {email}',
  OTP_VERIFICATION_ATTEMPT: 'OTP verification attempt for email: {email}',
  OTP_VERIFICATION_SUCCESS: 'OTP verification successful for email: {email}',
  PASSWORD_RESET_ATTEMPT: 'Password reset attempt for email: {email}',
  PASSWORD_RESET_SUCCESS: 'Password reset successful for email: {email}',
  PASSWORD_CHANGE_ATTEMPT: 'Password change attempt for user: {userId}',
  PASSWORD_CHANGE_SUCCESS: 'Password change successful for user: {userId}',
  ADD_ADDRESS_ATTEMPT: 'Add address attempt for user: {userId}',
  GET_ADDRESS_ATTEMPT: 'Get addresses attempt for user: {userId}',
  UPDATE_ADDRESS_ATTEMPT: 'Update address attempt for user: {userId}, address: {addressId}',
  DELETE_ADDRESS_ATTEMPT: 'Delete address attempt for user: {userId}, address: {addressId}',
  GET_PROFILE_ATTEMPT: 'Get profile attempt for user: {userId}',
  GET_PROFILE_ERROR: 'Get profile failed for user: {userId} - {error}',
  EDIT_PROFILE_ATTEMPT: 'Edit profile attempt for user: {userId}',
  EDIT_PROFILE_ERROR: 'Edit profile failed for user: {userId} - {error}',
  LOGOUT_ATTEMPT: 'Logout attempt for user: {userId}',
  EMAIL_VERIFICATION_SENT: 'Email verification sent to: {email}',
  EMAIL_VERIFICATION_FAILED: 'Email verification failed for user: {email} - {error}',
  PASSWORD_RESET_OTP_FAILED: 'Password reset OTP sending failed for user: {email} -\ {error}',
  REDIS_CONNECTION_ERROR: 'Redis connection error: {error}',
  REDIS_CONNECTION_SUCCESS: 'Redis connection established successfully at {host}:{port}',
  REDIS_SET_ERROR: 'Redis set error for key "{key}": {error}',
  REDIS_GET_ERROR: 'Redis get error for key "{key}": {error}',
  REDIS_DEL_ERROR: 'Redis delete error for key "{key}": {error}',
  REDIS_EXPIRE_ERROR: 'Redis expire error for key "{key}" with seconds {seconds}: {error}',
  REDIS_DISCONNECTED: 'Redis disconnected from {host}:{port}',
  AUTH_GUARD_ATTEMPT: 'AuthGuard: Attempting to validate token - {token}',
  AUTH_GUARD_SUCCESS: 'AuthGuard: Token validation successful for userId - {userId}',
  AUTH_GUARD_ERROR: 'AuthGuard: Token validation failed - {error}',
  REDIS_INCR_ERROR: 'Redis increment error for key "{key}": {error}',
  REDIS_TTL_ERROR: 'Redis TTL error for key "{key}": {error}',
  PASSWORD_RESET_ATTEMPTS_EXCEEDED: 'Password reset attempts exceeded for user: {userId}',
  PPWORD_RESET_INITIATED: 'Password reset initiated for user: {userId}',
  TOKEN_REFRESH_ATTEMPT: 'Token refresh attempt for user: {userId}',
};
