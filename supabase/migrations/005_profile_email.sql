-- Add email column to profiles so username login can resolve the email
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text;

-- Backfill from auth.users for existing rows
UPDATE public.profiles p
SET email = u.email
FROM auth.users u
WHERE u.id = p.id AND p.email IS NULL;

-- Update the trigger to also store email on new signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;
  RETURN NEW;
END;
$$;
