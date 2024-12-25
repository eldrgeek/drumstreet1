export type DrumStore = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  created_at: string;
  user_id: string;
  description?: string;
  phone?: string;
  website?: string;
};

export type Profile = {
  id: string;
  username: string;
  avatar_url?: string;
  created_at: string;
};