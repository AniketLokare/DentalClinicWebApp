interface Login {
  username: string;
  password: string;
}

type CreateLoginPayload = Login;

interface RefreshToken {
  refreshToken: string;
}

type CreateRefreshTokenPayload = RefreshToken;

interface LoginResponse {
  username: string;
  accessToken: string;
  refreshToken: string;
  LoggedInState: boolean;
}

type CreateLoginResponse = LoginResponse;