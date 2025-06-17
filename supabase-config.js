// supabase-config.js
// SUBSTITUA pelos seus dados reais do Supabase:
const SUPABASE_URL = 'https://jnnjwlismsjddztitqnz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impubmp3bGlzbXNqZGR6dGl0cW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMDA3MjUsImV4cCI6MjA2NTY3NjcyNX0.1xaznMXUGhd6yAdcD4au_svHLwo6e-0UagK-SiP2R18';

// Inicializar Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('🟢 Supabase conectado!');
console.log('🔗 URL:', SUPABASE_URL);