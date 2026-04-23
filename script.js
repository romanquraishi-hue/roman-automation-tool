// Supabase setup
const supabaseUrl = 'https://kqyofnstpuiwnpaftuhw.supabase.co';
const supabaseKey = 'sb_publishable_J82ULaoZUMkn69nzu3tvAg_jiZc7X7n';

const { createClient } = supabase;
const _supabase = createClient(supabaseUrl, supabaseKey);

// Login system
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    const { data, error } = await _supabase
        .from('users') // ✅ correct table name
        .select('*')
        .eq('username', user)
        .eq('password', pass)
        .maybeSingle(); // ✅ safe

    if (error) {
        alert('Error: ' + error.message);
        return;
    }

    if (data) {
        alert('আসসালামু আলাইকুম ' + user + ', স্বাগতম আপনার ড্যাশবোর্ডে!');
        
        // 👉 redirect
        window.location.href = "dashboard.html";
    } else {
        alert('ভুল! ইউজারনেম বা পাসওয়ার্ড সঠিক নয় ❌');
    }
});
