/*
  # Initial Schema for TOF Drum Store Finder

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - matches auth.users id
      - `username` (text)
      - `avatar_url` (text, optional)
      - `created_at` (timestamp)
    
    - `drum_stores`
      - `id` (uuid, primary key)
      - `name` (text)
      - `address` (text)
      - `latitude` (float8)
      - `longitude` (float8)
      - `description` (text, optional)
      - `phone` (text, optional)
      - `website` (text, optional)
      - `user_id` (uuid) - references auth.users
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users,
  username text NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read any profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create drum_stores table
CREATE TABLE drum_stores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  latitude float8 NOT NULL,
  longitude float8 NOT NULL,
  description text,
  phone text,
  website text,
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE drum_stores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read drum stores"
  ON drum_stores
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create drum stores"
  ON drum_stores
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own drum stores"
  ON drum_stores
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);