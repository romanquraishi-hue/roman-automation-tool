<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Dashboard</title>

<script src="https://cdn.tailwindcss.com"></script>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<style>
body { background:#0d1117; color:white; }
</style>
</head>

<body class="p-4">

<h1 class="text-xl mb-4">📄 Certificate Dashboard</h1>

<input id="name" placeholder="Name" class="block mb-2 p-2 text-black">
<input id="content" placeholder="Content" class="block mb-2 p-2 text-black">
<input id="expiry" type="date" class="block mb-2 p-2 text-black">
<input type="file" id="fileInput" class="mb-3">

<button onclick="createDoc()" class="bg-yellow-500 px-4 py-2 rounded">
Create Certificate
</button>

<div id="files" class="mt-5 space-y-2"></div>

<script>
const supabaseUrl = "https://kqyofnstpuiwnpaftuhw.supabase.co";
const supabaseKey = "sb_publishable_J82ULaoZUMkn69nzu3tvAg_jiZc7X7n";

const client = supabase.createClient(supabaseUrl, supabaseKey);

// Create Certificate
async function createDoc(){

const name = document.getElementById("name").value;
const content = document.getElementById("content").value;
const expiry = document.getElementById("expiry").value;
const file = document.getElementById("fileInput").files[0];

if(!name || !content){
alert("Fill all fields");
return;
}

const docId = "TM-" + Math.floor(Math.random()*999999);
const serial = "SN-" + Date.now();

let photoUrl = "";

if(file){
const fileName = Date.now() + "_" + file.name;

const { error } = await client.storage
.from("documents")
.upload(fileName, file);

if(error){
alert(error.message);
return;
}

const { data } = client.storage
.from("documents")
.getPublicUrl(fileName);

photoUrl = data.publicUrl;
}

// Save into documents table ✅
const { error } = await client.from("documents").insert({
doc_id: docId,
name: name,
content: content,
expiry_date: expiry,
serial: serial,
photo_url: photoUrl,
status: "active"
});

if(error){
alert(error.message);
return;
}

alert("✅ Done!\nLink: doc.html?id=" + docId);

loadDocs();
}

// Load documents
async function loadDocs(){

const { data } = await client.from("documents").select("*");

let html = "";

data.forEach(d=>{
html += `
<div class="border p-2 rounded">
📄 ${d.name} (${d.doc_id})
<a href="doc.html?id=${d.doc_id}" class="text-yellow-400 ml-2">View</a>
</div>
`;
});

document.getElementById("files").innerHTML = html;
}

loadDocs();
</script>

</body>
</html>
