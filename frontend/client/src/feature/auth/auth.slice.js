import { createSlice } from "@reduxjs/toolkit";
import authThunk from "./auth.service";

const login_user = JSON.parse(localStorage.getItem("current_user"));

const initialState = {
  user: login_user ? login_user : null,
  isLoggedIn: login_user ? true : false,
  message: "",
  error: false,
  loading: false,
  loggingOut: false,
  otpSessionTime: null,
  googleToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.message = "";
      state.error = null;
    },
    confirmlogout: (state) => {
      state.loggingOut = true;
    },
    cancelogout: (state) => {
      state.loggingOut = false;
    },
    deleteUserInfor: (state) => {
      localStorage.removeItem("current_user");
      state.isLoggedIn = false;
      state.user = null;
      state.loggingOut = false;
    },
    saveGoogleToken: (state, action) => {
      state.googleToken = action.payload;
    },
    confirmLogin: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authThunk.login.pending, (state) => {
        state.loading = true;
      })
      .addCase(authThunk.login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        localStorage.setItem("validClientSession", "true");
        localStorage.removeItem("temp_access_token");
      })
      .addCase(authThunk.login.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(authThunk.register.pending, (state) => {
        state.loading = true;
      })
      .addCase(authThunk.register.fulfilled, (state, action) => {
        state.loading = false;
        state.message =
          action.payload.message || "Đăng ký thành công. Hãy đăng nhập lại";
        localStorage.removeItem("temp_access_token");
        state.error = false;
      })
      .addCase(authThunk.register.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.message = action.payload;
        localStorage.removeItem("temp_access_token");
      })
      .addCase(authThunk.logout.fulfilled, (state) => {
        localStorage.removeItem("current_user");
        state.isLoggedIn = false;
        state.user = null;
        state.loggingOut = false;
      })
      .addCase(authThunk.getOTPSignup.pending, (state) => {
        state.loading = true;
      })
      .addCase(authThunk.getOTPSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Đã gửi OTP thành công";
        state.otpSessionTime = action.payload;
        state.error = false;
      })
      .addCase(authThunk.getOTPSignup.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.otpSessionTime = null;
        state.message = action.payload;
      })
      .addCase(authThunk.getOTPReset.pending, (state) => {
        state.loading = true;
      })
      .addCase(authThunk.getOTPReset.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Đã gửi OTP thành công";
        state.otpSessionTime = action.payload;
        state.error = false;
      })
      .addCase(authThunk.getOTPReset.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.otpSessionTime = null;
        state.message = action.payload;
      })
      .addCase(authThunk.validateOTP.pending, (state) => {
        state.loading = true;
      })
      .addCase(authThunk.validateOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.message =
          action.payload.message || "Xác thực số điện thoại thành công";
        localStorage.setItem("temp_access_token", action.payload.substring(12));
        state.otpSessionTime = null;
        state.error = false;
      })
      .addCase(authThunk.validateOTP.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(authThunk.updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(authThunk.updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.message =
          action.payload.message || "Cập nhật thông tin thành công";
        state.error = false;
        state.user = action.payload;
      })
      .addCase(authThunk.updateProfile.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(authThunk.changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(authThunk.changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message =
          action.payload.message || "Thay đổi password thành công";
        state.error = false;
      })
      .addCase(authThunk.changePassword.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(authThunk.resetPass.pending, (state) => {
        state.loading = true;
      })
      .addCase(authThunk.resetPass.fulfilled, (state) => {
        state.loading = false;
        state.message = "Đặt lại mật khẩu thành công";
        state.error = false;
        localStorage.removeItem("temp_access_token");
      })
      .addCase(authThunk.resetPass.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(authThunk.authenGoogleToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(authThunk.authenGoogleToken.fulfilled, (state) => {
        state.loading = false;
        localStorage.setItem("validClientSession", "true");
      });
  },
});

export const authActions = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectLoading = (state) => state.auth.loading;
export const selectMessage = (state) => state.auth.message;
export const selectError = (state) => state.auth.error;
export const selectLogout = (state) => state.auth.loggingOut;
export const selectUser = (state) => state.auth.user;
export const selectGoogleToken = (state) => state.auth.googleToken;
export const selectUserRoleId = (state) => {
  if (state.auth.user && state.auth.user.user) {
    if (state.auth.user.user.customer) return 1;
    if (state.auth.user.user.driver) return 4;
    if (state.auth.user.user.staff)
      if (state.auth.user.user.staff.adminId) return 3;
    return 2;
  }
  return 0;
};

export const selectOTPTime = (state) => state.auth.otpSessionTime;

export default authSlice.reducer;
