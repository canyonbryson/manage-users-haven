
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tthrtujfzyuwmwvswnpv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0aHJ0dWpmenl1d213dnN3bnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5Nzc0NTcsImV4cCI6MjA1MjU1MzQ1N30.BH5xSNb3ysv63Y77U94KX_FmTUrGLa0kj3dMznHF6rw";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
