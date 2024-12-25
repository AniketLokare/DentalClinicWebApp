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
  jwtToken: string;
  refreshToken: string;
  LoggedInState: boolean;
  username: string;
  role: string;
}

type CreateLoginResponse = LoginResponse;