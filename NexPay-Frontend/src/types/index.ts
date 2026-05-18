export type User = {
  id: string;
  full_name: string;
  phone_number: string;
  country_code: string;
  role: "STAFF" | "USER" | "COMPANY";
  address: string | null;
  profile_image: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type AdminUser = {
  id: string;
  full_name: string;
  country_code?: string;
  phone_number: string;
  role: "STAFF" | "USER" | "COMPANY";
  created_at: string;
  updated_at: string;
  address: string | null;
  is_active: boolean;
};

export type AdminUsersResponse = {
  users: AdminUser[];
};

export type UpdateAdminUserPayload = {
  full_name?: string;
  phone_number?: string;
  country_code?: string;
  address?: string;
  is_active?: boolean;
};

export type UpdateAdminUserResponse = {
  user: AdminUser;
};

export type AdminUserDetailsResponse = {
  user: {
    id: string;
    full_name: string;
    country_code: string;
    phone_number: string;
    role: "STAFF" | "USER" | "COMPANY";
    created_at: string;
    updated_at: string;
    address: string | null;
    is_active: boolean;

    wallets: {
      id: string;
      created_at: string;
      wallet_balances: {
        currency: "USD" | "EUR" | "LBP";
        available_balance: number;
        pending_balance: number;
      }[];
    };
  };
};

export type WalletBalance = {
  currency: "USD" | "EUR" | "LBP";
  available_balance: number;
  pending_balance: number;
};

export type WalletResponse = {
  wallet_id: string;
  balances: WalletBalance[];
};

export type TransferUser = {
  full_name: string;
  phone_number: string;
};

export type Transfer = {
  id: string;
  amount: number;
  currency: "USD" | "EUR" | "LBP";
  status: "PENDING" | "COMPLETED" | "FAILED";
  created_at: string;
  description: string;

  sender: TransferUser;
  receiver: TransferUser;

  direction?: "SEND" | "RECEIVED";
};

export type TransfersResponse = {
  page: number;
  limit: number;
  data: Transfer[];
};

export type CreateTransferDTO = {
  amount: number;
  rceipient_phone_number: string;
  currency: "USD" | "EUR" | "LBP";
  description?: string;
};

export type Topup = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
};

export type TopupsResponse = {
  page: number;
  limit: number;
  data: Topup[];
};

export type CancelTopupResponse = {
  message: string;
  topup: Topup;
};

export type Conversion = {
  id: string;
  from_currency: string;
  to_currency: string;
  amount_from: number;
  amount_to: number;
  converted_amount: number;
  status: "PENDING" | "COMPLETED" | "FAILED";
  rate_used: number;
  created_at: string;
};

export type ConversionsResponse = {
  page: number;
  limit: number;
  data: Conversion[];
};

export type Notification = {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  is_success: boolean;
  reference_type?: string;
  reference_id?: string;
  created_at: string;
};

export type NotificationsResponse = {
  page: number;
  limit: number;
  data: Notification[];
};

export type UnreadCountResponse = {
  count: number;
};

export type NotificationPreference = {
  receive_enabled: boolean;
  send_enabled: boolean;
  deposit_enabled: boolean;
};

export type NotificationPreferenceResponse = {
  data: NotificationPreference;
};

export type ExchangeRateResponse = {
  from_currency: "USD" | "EUR" | "LBP";
  to_currency: "USD" | "EUR" | "LBP";
  exchange_rate: string;
};

export type GetExchangeRatesResponse = {
  data: ExchangeRateResponse[];
};

export type UpdateExchangeRatePayload = {
  from: "USD" | "EUR" | "LBP";
  to: "USD" | "EUR" | "LBP";
  rate: number;
};

export type UpdateExchangeRateResponse = {
  message: string;
};

export type CreateConversionDTO = {
  from_currency: "USD" | "EUR" | "LBP";
  to_currency: "USD" | "EUR" | "LBP";
  amount: number;
};

export type ConversionResponse = {
  message: string;
  data: Conversion;
};

export type AdminDashboardStats = {
  total_users: number;
  total_transfers: number;
  total_deposits: number;
};

export interface Announcement {
  id: string;
  admin_id: string;
  admin_name: string;
  title: string;
  message: string;
  created_at: string;
}

export interface GetAnnouncementsResponse {
  page: number;
  limit: number;
  data: Announcement[];
}

export interface CreateAnnouncementPayload {
  title: string;
  message: string;
}

export interface CreateAnnouncementResponse {
  message: string;
  count: number;
}

export type AdminTopUp = {
  id: string;
  user_id: string;
  full_name: string;
  phone_number: string;
  amount: number;
  currency: "USD" | "EUR" | "LBP";
  status: "PENDING" | "COMPLETED" | "FAILED";
  created_at: string;
};

export type AdminTopUpsResponse = AdminTopUp[];

export type UpdateAdminCredentialsPayload = {
  user_id: string;
  new_phone_number?: string;
  new_password?: string;
};

export type UpdateAdminCredentialsResponse = {
  message: string;
};

export type AIChatMessage = {
  id: string;
  user_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
};

export type SendAIMessagePayload = {
  question: string;
};

export type AIChatResponse = {
  answer: string;
};

export type AIChatVoiceResponse = {
  transcription: string;
  answer: string;
};

export type GetAIChatHistoryParams = {
  page?: number;
  limit?: number;
};

export type AIChatHistoryResponse = {
  history: AIChatMessage[];
};
