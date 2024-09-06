import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import {
  getAccessToken,
  getRefreshToken,
  getUserInfo,
  redirectToLogin,
  removeTokens,
  removeUserInfo,
  setAccessToken,
  setRefreshToken,
  setTokens,
  setUserInfo,
} from "@/_utils/helpers/auth";
import {
  AuthState,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ForgotResetPasswordPayload,
  ForgotResetPasswordResponse,
  HomeOwnerProfile,
  LoginPayload,
  LoginResponse,
  PasswordUpdatePayload,
  PasswordUpdateResponse,
  ResendEmailPayload,
  SignUpPayload,
  VerifyEmailPayload,
  VerifyEmailResponse,
} from "@/_utils/types";

import apiClient from "../../_utils/helpers/apiClient";

export const signUpUser = createAsyncThunk<
  LoginResponse,
  SignUpPayload,
  { rejectValue: string }
>("auth/signup", async (payload, thunkAPI) => {
  try {
    const response = await apiClient.post<LoginResponse>(
      "/auth/signup",
      payload,
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "An error occurred while creating account",
    );
  }
});

export const verifyEmail = createAsyncThunk<
  VerifyEmailResponse,
  VerifyEmailPayload,
  { rejectValue: string }
>("auth/verifyEmail", async ({ userId, verificationCode }, thunkAPI) => {
  try {
    const response = await apiClient.post<VerifyEmailResponse>(
      `/auth/email-verification?userId=${userId}`,
      { verificationCode },
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "An error occurred during email verification",
    );
  }
});

export const resendVerificationCode = createAsyncThunk<
  VerifyEmailResponse,
  ResendEmailPayload,
  { rejectValue: string }
>("auth/resendVerificationCode", async ({ userId }, thunkAPI) => {
  try {
    const response = await apiClient.get<VerifyEmailResponse>(
      `/auth/resend-verification-code?userId=${userId}`,
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Failed to resend the verification code",
    );
  }
});

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      credentials,
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "An error occurred while logging in",
    );
  }
});

export const updatePassword = createAsyncThunk<
  PasswordUpdateResponse,
  PasswordUpdatePayload,
  { rejectValue: string }
>("user/updatePassword", async (passwordData, thunkAPI) => {
  try {
    const response = await apiClient.put<PasswordUpdateResponse>(
      "/user/password",
      passwordData,
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Failed to update password",
    );
  }
});

interface LogoutParams {
  isValidAccessToken: boolean;
}

export const updateHomeOwnerProfile = createAsyncThunk<
  LoginResponse,
  HomeOwnerProfile,
  { rejectValue: string }
>("auth/updateHomeOwnerProfile", async (profile, thunkAPI) => {
  const formData = new FormData();

  Object.keys(profile).forEach((key) => {
    const value = profile[key as keyof HomeOwnerProfile];
    if (value instanceof File) {
      formData.append(key, value, value.name);
    } else if (value != null) {
      formData.append(key, value);
    }
  });

  try {
    const response = await apiClient.put<LoginResponse>(
      `/home-owner`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "An error occurred while updating the profile",
    );
  }
});

export const forgotPassword = createAsyncThunk<
  ForgotPasswordResponse,
  ForgotPasswordPayload,
  {
    rejectValue: string;
  }
>("auth/forgotPassword", async (payload, thunkAPI) => {
  try {
    const response = await apiClient.post<ForgotPasswordResponse>(
      "/auth/forgot-password",
      payload,
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "An error occurred while sending the password reset email",
    );
  }
});

export const resetPasswordForgot = createAsyncThunk<
  ForgotResetPasswordResponse,
  ForgotResetPasswordPayload,
  { rejectValue: string }
>("auth/forgot-password/change-password", async (payload, thunkAPI) => {
  try {
    const response = await apiClient.post<ForgotResetPasswordResponse>(
      "/auth/forgot-password/change-password",
      payload,
    );
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "An error occurred while changing the password";

    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const logoutUser = createAsyncThunk<
  void,
  LogoutParams,
  { rejectValue: string } // Define the type of the reject value
>(
  "auth/logout",
  async ({ isValidAccessToken = true }: LogoutParams, thunkAPI) => {
    try {
      if (isValidAccessToken) {
        // Call logout API here
        await apiClient.post("/auth/logout");
      }

      return;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "An error occurred in logout user",
      );
    }
  },
);

// set access token and refresh token in store initially
const accessToken = getAccessToken();
const refreshToken = getRefreshToken();
const userInfo = getUserInfo();

const initialState: AuthState = {
  user: userInfo,
  tokens: {
    access_token: accessToken ? accessToken : "",
    refresh_token: refreshToken ? refreshToken : "",
  },
  loading: false,
  error: null,
} satisfies AuthState as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.user = action.payload.data.user;
          state.tokens = action.payload.data.tokens;
          setTokens(action.payload.data.tokens);
          setUserInfo(action.payload.data.user);
        },
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Opss something wrong..");
      });

    // auth forgot password
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        forgotPassword.fulfilled,
        (state, action: PayloadAction<ForgotPasswordResponse>) => {
          state.loading = false;
        },
      )
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Opss something wrong..");
      });

    // auth forgot password reset
    builder
      .addCase(resetPasswordForgot.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        resetPasswordForgot.fulfilled,
        (state, action: PayloadAction<ForgotResetPasswordResponse>) => {
          state.loading = false;
        },
      )
      .addCase(resetPasswordForgot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to reset password";
        toast.error(action.payload || "Opss something wrong..");
      });

    // verify email
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        verifyEmail.fulfilled,
        (state, action: PayloadAction<VerifyEmailResponse>) => {
          state.loading = false;
        },
      )
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Opss something wrong..");
      });

    // resend verification code
    builder
      .addCase(resendVerificationCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        resendVerificationCode.fulfilled,
        (state, action: PayloadAction<VerifyEmailResponse>) => {
          state.loading = false;
        },
      )
      .addCase(resendVerificationCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Opss something wrong..");
      });

    // update home owner profile
    builder
      .addCase(updateHomeOwnerProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateHomeOwnerProfile.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.user = action.payload.data.user;
          setUserInfo(action.payload.data.user);
        },
      )
      .addCase(updateHomeOwnerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Opss something wrong..");
      });

    // signup user
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        signUpUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.user = action.payload.data.user;
          state.tokens = action.payload.data.tokens;
          setTokens(action.payload.data.tokens);
          setUserInfo(action.payload.data.user);
        },
      )
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Opss something wrong..");
      });

    // update password
    builder
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updatePassword.fulfilled,
        (state, action: PayloadAction<PasswordUpdateResponse>) => {
          state.loading = false;
        },
      )
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Opss something wrong..");
      });

    // logout user
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.tokens = { access_token: "", refresh_token: "" };
        removeTokens();
        removeUserInfo();
        redirectToLogin();
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Opss something wrong..");
      });
  },
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
