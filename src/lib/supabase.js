import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ovpnvajceffmmlxycqcm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92cG52YWpjZWZmbW1seHljcWNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NjExNjEsImV4cCI6MjA5MTAzNzE2MX0.7-UZ9CMgAW70pRlYNzl2TPL1IVkfrmjrMamVJsFivqM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
