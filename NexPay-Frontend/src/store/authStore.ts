type User = {
  id: string;
  full_name: string;
  phone_number: string;
};

class AuthStore {
  user: User | null = null;

  setUser(user: User) {
    this.user = user;
  }

  clearUser() {
    this.user = null;
  }
}

export const authStore = new AuthStore();
