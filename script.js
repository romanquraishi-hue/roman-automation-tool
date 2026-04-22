// ১. সুপাবেস কানেকশন সেটআপ (আপনার দেওয়া তথ্য অনুযায়ী)
const supabaseUrl = 'https://kqyofnstpuiwnpaftuhw.supabase.co';
const supabaseKey = 'sb_publishable_J82ULaoZUMkn69nzu3tvAg_jiZc7X7n';

// লাইব্রেরি চালু করা
const { createClient } = supabase;
const _supabase = createClient(supabaseUrl, supabaseKey);

// ২. লগইন ফর্মের কাজ শুরু
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // পেজটি যেন রিলোড না হয়
    
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // ডাটাবেস থেকে তথ্য খোঁজা হচ্ছে
    const { data, error } = await _supabase
        .from('romanquraishi') // আপনার টেবিলের নাম
        .select('*')
        .eq('username', user)
        .eq('password', pass)
        .single();

    if (data) {
        alert('আসসালামু আলাইকুম ' + user + ', স্বাগতম আপনার ড্যাশবোর্ডে!');
        // সফলভাবে লগইন হলে ভবিষ্যতে আমরা এখানে ড্যাশবোর্ড পেজের লিঙ্ক দেব
    } else {
        alert('ভুল! ইউজারনেম বা পাসওয়ার্ড দিলে আমরা সবাই মিলনের নানিরে পুন্দামু।');
    }
});
