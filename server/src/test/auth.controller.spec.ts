import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { UserService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let userService: UserService;
  let authService: AuthService;

  beforeEach(() => {
    userService = {
      createUser: vi.fn(),
    } as any;

    authService = {
      login: vi.fn(),
    } as any;

    authController = new AuthController(userService, authService);
  });

  describe('login', () => {
    it('should return access token and user data', () => {
      const mockUser = { id: 1, name: 'John' };
      const mockToken = 'token123';
      (authService.login as any).mockReturnValue({ access_token: mockToken, user: mockUser });

      const req = { user: mockUser };
      const result = authController.login(req);

      expect(result).toEqual({
        timestamp: expect.any(String),
        data: { accessToken: mockToken, user: mockUser },
        message: '',
      });
      expect(authService.login).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('register', () => {
    it('should create a new user and return success message', async () => {
      const newUser = { name: 'Jane', email: 'jane@example.com', password: 'pass' };
      (userService.createUser as any).mockResolvedValue(undefined);

      const result = await authController.register(newUser);

      expect(userService.createUser).toHaveBeenCalledWith(newUser);
      expect(result).toEqual({
        data: null,
        message: 'User registered successfully',
        timestamp: expect.any(String),
      });
    });
  });
});
