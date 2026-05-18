require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "BOONDHON_SECRET_2025";
const PAGE_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const GEMINI_API_KEY = "AIzaSyB4dAdo_U1k5mxZK1GVPDEnRLGuYJGXxTC";

// ── Google Drive Image IDs (BOONDHON Full Collection) ──
const AFFORDABLE_IDS = [ 
  "1J9_qfkIdIWL5Sc9O8EokvYlGfQWrf5TD","1cOCFSa1ap-Z54Ldf2AuoUKlEaQ5Ccql-", 
  "1dbYH2L4QykEUhYXGQPzQZObEuHFdwKsT","1HJTtR-zhhg6v2ph7MikdMDWI-LWJgG0z", 
  "1PRlMp4F1xnQJPURON535pl7t08_thXVA","1UEAeYYB3Bt5vMYEL-a7AcV1aV21Z04si", 
  "1-_qTV4gq0oKMdfMRxlTZL3yUO98ZGAoi","15yHXRk2mHI6-cKeooRqT20XeHubRRrPN", 
  "1Yrcqj5g0sZDrL3QaEkfEmKnF12BEs6ir","1vXwJ68j7x5qfpZdHkMkqLn0tvpblGDpl", 
  "1GWw91oefwyYr9sHSQXjePTSX-KwPjy7I","1_tnTz7HWDf4CVJHORPlani7pjEcLdm7X", 
  "1OMy_r94N_iUqvPW1t5fAGa4Sv3C_MIqF","1rXCxMziCgTImURvkahNp-AvneVljg-CW", 
  "1k_hzTbXOxxJg9rJ2OW-tnIkzLNYUqkOf","1bgYpcqh4pVLDy8yfwrS40X5ejtCFxmFv", 
  "1tLW7C2gwOmlZzGXh3bw0o7xjAPKrudIA","1ZEGHQfvuKNv-J5ZZadHKGfVAe4cvQnGq", 
  "1WE3kfWsd-0nrptiQ0fWi3dsd4iEcdw3t","1kLilyZRrhgrRfHn4aiTEcUBOu5fNDegs", 
  "1Cf7jQxeb5pyXvnA6HzGg_dYk3ZBrJ9z5","11UIRwmetqLkMU5qThwv5Vc7GnuASrZSa", 
  "1eXUGJyYhnNBXZ7PFwDgXgY-ql8cYADsh","1weNuPU3fBvPMkbFAGPiMm_ttEETSuQ9A", 
  "1PyKeX16mmVGaqKuZCujRskmip1LyGEgo","1luY2hOgpjUjXr_lGJbCQTumxKZFZrmJ4", 
  "1XanrmX4aOoDmjxha6lr5bYzlkZHglsTZ","1BBFuVKgKRUJV2pubIWiXgZlT3582Vcup", 
  "1wvf3jJjpV1sPuiO_Vj509y0UJABxbnuB","1TkCMzyPmSk9m2bIrRUInOm6epp2TQnV1", 
  "1H5lEN0baeoMMWL693BIXVYjrtZVipooO","14UHCDYmLowJbPfS-7Ve2Nx-tKno1MJU0", 
  "1CsDarakKEaGyVe8JqT05pMff988RztJX","1IDHV2uPD4AHjhsk75GJSETp9qQdpqPB4", 
  "1VGLRJbDyatJqfX0VEr3yGkRJMI23yRiL","1v1Fb2d2CP-v4N7Z2qVIqywIyph673I5Y", 
  "1X5yEsU9S8oYeFMEc8bjEm4XecbrR6fWA","1BkNP_edXf6c3wIP5lALPG2sjSp1C3d3z", 
  "1qKDy730IKVUH3e7U3zgUK863ekoYNGVS","1OVG52rNA1Ud-pG6gA-RtyRZkhE85tgkK", 
  "1nKQgpTV5txr5SO-6MYL4wnMskhLvkJJn","1lmdXd0R5pgyJqXhgGwYzzerX4NXPpOyZ", 
  "1cDyh8T6RQ7cOMY_js8TxQYrDO8BPy4cS","1eBePCdCDIMMvu6rZd-feOqvI8jPX44PU", 
  "1EOVX2gwvUotLFdfO5gO0Px8MaJwon9dY","1yA0KGGFMfYUQ8-9hpotpxNhagSSdp7xD", 
  "1inPC5SKDpW5epcxa-fFgXp9C9jowISPO","1WDJrtj_A5gk6KfolOju3TzfyVUm5Gt40", 
  "1gDDPhlDVI5Fu-nBdUPsM964FiuHz0YoU","18hlxoUBDiBuV_nxiqfPffkmW5mGmxdZA", 
  "1g7WVBZC6EqVPjZGqwnyYpDU-ehayWqCf","1jdh-o3_3_4xJGQbumQ258HN0fuc9qkZo", 
  "19-H4R6pAVCbU-P9BvLInXkcY2OZ1bUzo","1aqEN_fGQfJOYP4T1EdZuRbc-UpXJPTNj", 
  "1TfPmZfUQ1VbIie-GPcG5eLoy1Uk9D5Xt","1w502s3qp0cnI4NEAyv9ybo-6qVhs5IT1", 
  "1NGoRC9vhfaTIjis1aW0k8LpaFZMzLCjA","12QvRB7HhShW19jXuhN3BF6OFmGQLg0kR", 
  "1pJ5hgS89OF5cBTWVM6kbm1E3cMt1hcrT","1ygWRDCDH-dr7sI8TKtjAZkQ23bCTaqoG", 
  "1u-3SZI9ymC7E18sROzUy3gSAAb45yqmW","1vo67fp6I8ZA3wOi9pTw6eUu3HJrvAfbB", 
  "1K0JWt7BnX1wDLZ7D7Db_cI5z-OazCANU","10vyUHH9txFfzy6gTUXFsx95hDzH1rNE1", 
  "13_b1RSIwud_d2LvFwTc337ls-MfEmXRX","109AXjs6FKNUVfBfcQySBW_sqOzkcbrjV", 
  "1WJu3rqnGe-aYs1FZymiGtV-SEP6W7i-m","1IWSDwW4uTrWlNWo14GfbHPn7Fq0g_nzL", 
  "1g800vKvxkKR_hUYKvv0-Gh1jNJrqnyaq","11Uy_p33yXsQiMW0qy7l1b1qWvzQXLOEe", 
  " PeaR16EDy3xXTJDbPuP9GHJiX3F2Ubea","1firMVBvk_QAfMfQONWCbvr1oo0dtK53F", 
  "1RNSqAZ7kxJSQ3jwzRfreYejLGGeXCz2h","1r-JnbeHPGBO0Q9cceYh1bzSCLKBOJEN_", 
  "1TtkzWXQisd7UShIg46wdW6vmWYbpUjkk","1vj8zzSFy1H_c7fAGi_REfMR-R8IPwTfK", 
  "1Q_DJOcMXmZrR7P9szIw9LWQ5-dyRLO2y","1OQQQN87UMWlaTcPnzFf9zwRTxxIqRO5-", 
  "1Cw6AehAWgLFPCLedbh3LR1LMfCx2B4S3","10iZEj1UR_VCC0T2MLYhyT1hfO5zeoQFN", 
  "1pXnX_YraQ9SmZmttbcuaBJ6GfCbMxfL_","1ierJrCWZ0kiommCWoUzsVEFC2VoOKIRt", 
  "1zCjZp5fZ7ocwB33-bBCs93kaHJ0EOl5r" 
]; 

const PREMIUM_IDS = [ 
  "182kOjBhoaqOTq7nr4ryI6re6fRuLITbH","1cTfbTDJDqBjsV-r7V1OjBZ-Z6tUAqwxj", 
  "1cA-MfI55Hh7ibreMQ4zPvt2i_LKxVHkR","1fvtC5mT4slvV_kROIej7awAGmCRc7TUl", 
  "1rLVZUQ8lw6ilWM76xxARtbUreQ3JIkdi","15AQWI3wP2a57-3OxHZTCfSbskgvC5YvH", 
  "1ahoubjUVdc9SJyi5n2rzZIsbugjCjHiz","1qlwwRe2Mr_gb8CZjkeG0-YxBSGmOHzZu", 
  "1oOdGtYFTz-xNmSLUO-VFS1YODqYZ74HJ","1zBBLQOfuAaPXhyr6At3tJ5DlTZ_nXfLy", 
  "11GVK5OYU7bjf8YaHeNAAnAHPks3T1Jme","1Kat8i9M3usZX8iX2xUCcX08RVocX9kKB", 
  "1f327zMbxf9s_Z2WSYhA4cAIF_NBiveKW","1T_pxOh0mn36N882wUMyYSsXKoZE4w1XA", 
  "1OQqgPUW0j1C5Ggvh50oTnnw5VsgEQv5I","15FGsZ0xdZd7DYZb4awafD8ysH_8g-A9O", 
  "1KUI4gzdhT-1I_LpzCMCQL8Sgfy4dU_Im","1amD4c_CLTODq8nca3N_H40vPiYp53VTm", 
  "1j2a0DIwsKoXWomTJ9RuJm1RncFH3mbqg","1Cl0fyeCN4T4mUxt-mhEQe6z6ZzBXsQsK", 
  "1Tpq2cCmWEooN2SYUIEgq-elk6tRK_5tV","1wlnH6L9DQcYtHHRDtPmrLGz-u6bslOgl", 
  "1ZrP-OujlWQGLEln1u8YTa4e3kjQY0yzI","1U6HoCb65TnMZsfKmGQ9wujvvppKzD7HY", 
  "1pbevqRrVV2_aYSNSMF8q7jMqnDMGpAUn","1KTSwcHJmwu1XximtqvbgSnP4Zrskg8T_", 
  "1ZG7hoRZgcj5F_UMCidzJSI2yAYoiUAf6","1uMyZI2cVy_uABGNPNoe-pXul2pPPhC_U", 
  "1gITGc6TLsrSjYkdMhURcUUNQH1y1GFpc","1FTFe6klyuHyUBsOfLeN_QsZABlhF_I1U", 
  "1n9SD-SDFTJMuW-J_9g-Sg3Pi9u4Q8VqZ","1PiYBXyjmd0jMff_0j9miNPSKsH549oOJ", 
  "1emx-RKETN5UkoPSIM66I9V6z8g4O6eL0","1V9mGxsK3TFtLWGBnnfoQQ9tgnvmfOOKj", 
  "1zCSjLjQOnSeOechbnhxepJSKxbdE7MeI","1HarOxTDa8wdWYkAHdsYCUNp6-bdW-0aM", 
  "1zIdOBb-MSqAEHDPmc_cJluX8dtgx5fkk","1V1JnATj5BVIrnhdP7FleskNC0RElJ0NZ", 
  "1liH9X1gZehPc1nmNoPrBMysviH-_AC_0","1kS9lA4Rt0Ro1H4zWO_hNBzKPNvLkpb6G", 
  "1ML1TVAbIwOfV8g8V2jbFOnhupomDRuj5","15AnUgqE1IMBspLC7jCVveFXzNMVrvZUl", 
  "16pVMXGt2O5OW0GnEH0vK_J7beXJOVTFG","1x_Ykz9171lN4T5AJzBpbHlqvPyM-JuJ4", 
  "1qj1usLPAzfw8y74c-KKF6MfbE6F_txEJ","1oUNXIOVWfaYe_O1s0AZP7WZbz9PkJdER", 
  "1lKmVy2Xgs27j5IW6CzbzYYHzIPpPB7pF","10R18Piu79JTBPmWu7l1q_ht5yRddjZj_", 
  "1C3AXVh-mfTMtcAFhrL044TvwklDIKYNa","1fZQ7kc9OkcDLMntxUqUnUh-eVfGPqfIm", 
  "1Zb-AwPI5Ta8GaDX8T2QSMesenxFBEpNw","181vyiexE1YGUOav2BUEdLzWLn24qdvvm", 
  "1IUCMZwe292HN-OEcdnIbvWPuwGy6bgBG","1zyZ3QVHsOkTBADMm8jxJrk2ZIiiFE87F", 
  "1vtMWO4Ah45nvFExeMq82sfZc2JRsIiHc","1S0Oefe3t9iTNkhY_kjNojyHbb7uY4qHE", 
  "1rDFVMBfbrEt76kjiJLES3bnA_jmedsyI","119JxcFfIzDClqpTEC7ekWEMEPzH4_Hth", 
  "18roPGwQh8ImnrZ3ncIe8dt69JtUqrmwQ","147CRb0HLsfBA8aw9BNdO6dco7dQF6xNo", 
  "1oBnPqo8kAxNk4D3cgxlJAaZGqmP5F2Mb","1NVkZtKt1EHXcCA0c_latgAtBdckWGi6t", 
  "1EZIR0WmtoYLGcR-mUebaCHYYCL9NNykR","1zwQdkQRZVqXLvhRmHeuqNj3OtwFZ5xer", 
  "1p0cWNTy_cCV8_yrV3RuPp94stsaH8ZRm","1ntMdF0lJquZtJTYKc3t4WWGU-00DiYaM", 
  "1L1RhTUFgN2ziAWpKaRwlZipkjehPXnWZ","1jgARDI1JIjh_4qRUbvdpG1p0RBp4if7b", 
  "1TGZcnR1aYmln_E_UxgD_uInfREnRXf9T","1OKX94fxZ1BXqvDYY8SCQ22gR6Db2op2y", 
  "1J2_PY_Rk-x5ipzl_Ur5unrWCx2ZN7LvR","184YPeKcI8ilthW2VPvTcnJSTebj335-c", 
  "1-7lrprKPJQ-JuiNVi_bUdzHr_7S0NmNn","1ZAk92jKEyUhpO_faXYdbz5PPXkmo5YQN", 
  "1_9oor-2oJ4dHHOBkERAije6pvr8zAqPJ","1MX7rnQG2F0H8UX5ofGazO53knl7SUNE1", 
  "148EhK2GqvlP8Z-X-pK4Cp-Zb_sXqBLAu","1EuLjjvKMWIMkgbnK5PKOsKC5kHEG5H11" 
];

function driveUrl(id) {
  return `https://drive.google.com/uc?export=view&id=${id}`;
}

// ── Conversation Memory ────────────────────────────────────
const conversations = {};
function getHistory(senderId) {
  if (!conversations[senderId]) conversations[senderId] = [];
  return conversations[senderId];
}
function addToHistory(senderId, role, content) {
  const hist = getHistory(senderId);
  hist.push({ role, content });
  if (hist.length > 10) hist.shift();
}

// ── Trigger Detection ──────────────────────────────────────
function detectTrigger(text) {
  if (!text) return null;
  const t = text.toLowerCase();
  
  const affordable = ["affordable", "অ্যাফোর্ডেবল", "সাশ্রয়", "কম দাম", "affordable card", "affodable", "এফোর্ডেবল"];
  const premium = ["premium", "প্রিমিয়াম", "premium card", "প্রিমিয়াম কার্ড"];
  const selectBangla = ["বাংলা", "bangla", "বাংলা ফর্ম", "বাংলায়"];
  const selectEnglish = ["english", "ইংরেজি", "ইংরেজিতে", "english form"];
  const sale = [
    "অর্ডার কনফার্ম", "order confirm", "কনফার্ম করলাম", "নিব", "নেব", 
    "বিকাশ দেব", "অর্ডার করব", "অর্ডার দিতে চাই", "confirm করলাম", "কনফার্ম"
  ];

  if (sale.some(w => t.includes(w))) return "sale";
  if (affordable.some(w => t.includes(w))) return "affordable";
  if (premium.some(w => t.includes(w))) return "premium";
  if (selectBangla.some(w => t.includes(w))) return "bangla_form";
  if (selectEnglish.some(w => t.includes(w))) return "english_form";
  return null;
}

// ── Gemini API Integration ────────────────────────────────
async function getGeminiReply(senderId, userMessage) {
  const history = getHistory(senderId);
  const contents = history.map(h => ({
    role: h.role === 'user' ? 'user' : 'model',
    parts: [{ text: h.content }]
  }));
  contents.push({ role: 'user', parts: [{ text: userMessage }] });

  const systemInstructionText = 
    `তুমি BOONDHON Printing House-এর AI Sales Agent "Brishti Apa"। কাস্টমার তোমাকে যেকোনো প্রশ্ন (দাম, কোয়ালিটি, কাস্টমাইজেশন বা বাইরের যেকোনো জিজ্ঞাসা) করতে পারে, তোমাকে সবসময় অত্যন্ত প্রফেশনাল, মিষ্টি ও চতুরতার সাথে সেলস ওরিয়েন্টেড উত্তর দিতে হবে।\n\n` +
    `━━━━━ গুরুত্বপূর্ণ গাইডলাইন ও ৪টি মূল শর্ত ━━━━━\n` +
    `১. ভাষা ও টোন: সবসময় বাংলায় অত্যন্ত মিষ্টি, আন্তরিক ও কাস্টমার-বান্ধব ভাষায় ছোট ছোট (২-৪ লাইন) কথা বলবে।\n\n` +
    `২. প্রাইস লিস্ট ও অফার ডিফেন্স (নেগোসিয়েশন):\n` +
    `   - ২০ পিস = ১,৫০০ টাকা (৭৫ টাকা/পিস)\n` +
    `   - ৫০ পিস: Premium = ৩,২৫০ টাকা | Affordable = ২,৭৫০ টাকা\n` +
    `   - ১০০ পিস: Premium = ৫,৫০০ টাকা | Affordable = ৪,৫০০ টাকা | Luxury = ৮,৫০০ টাকা\n` +
    `   - ২০০ পিস: Premium = ৯,০০০ টাকা (৪৫ টাকা/পিস) | Affordable = ৭,০০০ টাকা (৩৫ টাকা/পিস)\n` +
    `   - অফার ডিফেন্স: কাস্টমারকে পরিষ্কার বলবে ২০০ পিস বা তার বেশি অর্ডার করলেই কেবল "FREE নিকাহনামা" অফারটি পাওয়া যাবে। ১০০ পিসে কোনো ফ্রি নিকাহনামা নেই।\n` +
    `   - কম পিসের বুদ্ধি: কেউ কম পিস (যেমন ২০ পিস) চাইলে বোঝাবে: "আপু/ভাইয়া, ছোট অর্ডারে প্রিন্টিং সেটআপ কস্ট বেশি পড়ে বিধায় পার পিস রেট একটু বেশি আসে। কিন্তু আপনি যদি ৫০ পিস নেন, তবে পার পিস অনেক কম পড়বে এবং আপনার অনেক টাকা সাশ্রয় হবে!"\n` +
    `   - দাম বেশির যুক্তি: কাস্টমার দাম বেশি বললে বলবে: "ভাইয়া/আপু, বাজারে কম দামের অনেক নরমাল কার্ড পাবেন, কিন্তু আমাদের কার্ডের পেপার কোয়ালিটি, গোল্ডেন ফয়েল এবং ফিনিশিং একদম প্রিমিয়াম। কার্ড হাতে নিলেই রাজকীয় লুকটা বুঝতে পারবেন।"\n\n` +
    `৩. অফিস, কারখানা ও ডিজাইন শর্ত:\n` +
    `   - প্রধান অফিস: মানিকগঞ্জ।\n` +
    `   - কারখানা: ঢাকা ফকিরাপুল, লালবাগকেল্লা, বাংলাবাজার।\n` +
    `   - বিশেষ শর্ত: কাস্টমারকে অবশ্যই মনে করিয়ে দেবে যে, কার্ডের নির্দিষ্ট ডিজাইনের উপর ভিত্তি করে আমাদের প্রিন্টিং কারখানা আলাদা হয়। তাই কোন কারখানা থেকে প্রোডাক্ট কালেক্ট করতে হবে, তা অর্ডার কনফার্ম হওয়ার পর আমাদের টিম চূড়ান্তভাবে জানিয়ে দেবে।\n\n` +
    `৪. অর্ডার প্রসেস: কাস্টমার অর্ডার করতে চাইলে তাকে জানাবে যে নিয়মাবলী পাঠানো হচ্ছে এবং কার্ডের ভাষা (বাংলা নাকি ইংরেজি) জানতে চাওয়া হচ্ছে।`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: contents,
        systemInstruction: { parts: [{ text: systemInstructionText }] },
        generationConfig: { maxOutputTokens: 250, temperature: 0.7 }
      })
    });

    const data = await response.json();
    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      return 'জি ভাইয়া/আপু, আমাদের বিয়ের কার্ডের সুন্দর সুন্দর কালেকশন দেখতে চাইলে "Affordable" বা "Premium" লিখে জানাতে পারেন। অর্ডার করতে চাইলে লিখুন "অর্ডার কনফার্ম"। 😊';
    }
  } catch (err) {
    console.error('Gemini API Error:', err);
    return 'জি ভাইয়া/আপু, আপনার মেসেজটি বুঝতে একটু সমস্যা হয়েছে। আমাদের কালেকশন দেখতে বা অর্ডার প্রসেস করতে দয়া করে আরেকবার বলবেন কি? 😊';
  }
}

// ── Messenger Sender Functions ─────────────────────────────
async function sendText(recipientId, text) {
  await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipient: { id: recipientId }, message: { text } })
  });
}

async function sendAllImagesOneByOne(recipientId, idArray) {
  for (const id of idArray) {
    const imageUrl = driveUrl(id);
    await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: {
          attachment: {
            type: 'image',
            payload: { url: imageUrl, is_reusable: true }
          }
        }
      })
    });
    await new Promise(resolve => setTimeout(resolve, 450)); 
  }
}

async function sendLanguageSelection(recipientId) {
  await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: {
        text: "ভাইয়া/আপু, আপনার কার্ডের ভেতরের লেখাগুলো কি বাংলায় প্রিন্ট হবে নাকি ইংরেজিতে (English)? নিচের বাটনে চাপ দিয়ে সিলেক্ট করুন, আমি ফর্মটি দিয়ে দিচ্ছি: 👇",
        quick_replies: [
          { content_type: "text", title: "বাংলায়", payload: "SELECT_BANGLA" },
          { content_type: "text", title: "English", payload: "SELECT_ENGLISH" }
        ]
      }
    })
  });
}

// ── Webhook Endpoint ───────────────────────────────────────
app.post('/webhook', async (req, res) => {
  res.sendStatus(200);
  const body = req.body;
  if (body.object !== 'page') return;

  for (const entry of body.entry) {
    if (!entry.messaging) continue;
    const event = entry.messaging[0];
    if (!event || event.message?.is_echo) continue;

    const senderId = event.sender.id;
    let userText = event.message?.text || event.postback?.payload?.replace(/_/g, ' ');
    if (!userText) continue;

    try {
      const trigger = detectTrigger(userText);
      
      // কাস্টমার যদি ইমেজ কালেকশন দেখতে চায় - তবে ইমেজ লোড হওয়ার আগেই ইন্ট্রো পাঠানো হবে
      if (trigger === 'affordable') {
        const welcomeAffordable = `🌸 স্বাগতম ভাইয়া/আপু! আমাদের Affordable কালেকশনে মোট ${AFFORDABLE_IDS.length}টি চমৎকার ডিজাইন রয়েছে। ডিজাইনগুলো লোড হতে একটু সময় লাগতে পারে, দয়া করে একটু অপেক্ষা করুন। আমি এক এক করে সবগুলো ছবি নিচে ফ্রেশ ইমেজ আকারে পাঠাচ্ছি, যাতে আপনি ক্লিক করলেই ফুল স্ক্রিন জুম করে দেখতে পারেন: 👇`;
        await sendText(senderId, welcomeAffordable);
        await sendAllImagesOneByOne(senderId, AFFORDABLE_IDS);
        addToHistory(senderId, 'user', userText);
        addToHistory(senderId, 'model', welcomeAffordable);
        continue;
      } 
      
      if (trigger === 'premium') {
        const welcomePremium = `✨ স্বাগতম ভাইয়া/আপু! আমাদের Premium কালেকশনে মোট ${PREMIUM_IDS.length}টি প্রিমিয়াম ও এক্সক্লুসিভ ডিজাইন রয়েছে। সবগুলো ছবি এক এক করে নিচে ফ্রেশ পিওর ইমেজ আকারে পাঠানো হচ্ছে, লোড হতে সামান্য কিছু সময় লাগতে পারে। ছবিতে ক্লিক করলেই ফুল স্ক্রিন জুম করে দেখতে পাবেন: 👇`;
        await sendText(senderId, welcomePremium);
        await sendAllImagesOneByOne(senderId, PREMIUM_IDS);
        addToHistory(senderId, 'user', userText);
        addToHistory(senderId, 'model', welcomePremium);
        continue;
      }

      // সাধারণ চ্যাট এবং অন্যান্য ট্র্রিগারের জন্য জেমিনির এআই রেসপন্স
      const aiReply = await getGeminiReply(senderId, userText);
      addToHistory(senderId, 'user', userText);
      addToHistory(senderId, 'model', aiReply);

      await sendText(senderId, aiReply);

      if (trigger === 'sale') {
        const orderRules = 
          '📋 *অর্ডার করার নিয়মাবলী:*\n\n' +
          '১. *অ্যাডভান্স পেমেন্ট:*\n' +
          '> অর্ডার কনফার্ম করতে হবে মোট মূল্যের ৩০% এডভান্স পেমেন্ট।\n' +
          '> পেমেন্ট করতে পারবেন নিম্নলিখিত মাধ্যমে: বিকাশ, নগদ, রকেট (পার্সোনাল) নম্বর: *01682588856*\n\n' +
          '২. *ডিজাইন প্রক্রিয়া:*\n' +
          '> আমাদের ডিজাইনার আপনার তথ্য দিয়ে কার্ডের ডিজাইন তৈরি করে আপনাকে পাঠাবে।\n' +
          '> আপনি ডিজাইন চূড়ান্ত করার পর আমরা প্রিন্ট প্রক্রিয়া শুরু করব।\n\n' +
          '৩. *ডেলিভারি এবং পেমেন্ট:*\n' +
          '> প্রিন্ট শেষে কার্ড রেডি করে জেলা শহরে ক্যাশ অন ডেলিভারি-এর মাধ্যমে পাঠানো হবে।\n' +
          '> কুরিয়ার ডেলিভারি গ্রহণের সময় বাকি ৭০% পেমেন্ট করতে হবে।\n' +
          '> জেলা শহরের বাইরে ক্যাশ অন ডেলিভারি উপলব্ধ নয়।\n' +
          '> এছাড়া সরাসরি আমাদের মানিকগঞ্জ অফিস বা ঢাকার (ফকিরাপুল, লালবাগকেল্লা, বাংলাবাজার) কারখানা থেকে নিজে এসে সংগ্রহ করতে পারবেন। (নোট: আপনার সিলেক্ট করা ডিজাইন অনুযায়ী আমাদের টিম কনফর্ম করবে কোন কারখানা থেকে সংগ্রহ করতে হবে)।\n\n' +
          '৪. *ডেলিভারি সময়:*\n' +
          '> কার্ড ডেলিভারি পেতে ৫ থেকে ৭ কর্মদিবস সময় লাগবে।';
        
        await sendText(senderId, orderRules);
        await sendLanguageSelection(senderId);

      } else if (trigger === 'bangla_form') {
        const banglaForm =
          'বর-\nনামঃ \nপিতাঃ\nমাতাঃ\nঠিকানাঃ\n\nকণে-\nনামঃ \nপিতাঃ\nমাতাঃ\nঠিকানাঃ\n\nগায়ে হলুদ-\nতারিখ (ইংরেজি সন):\nতারিখ (বাংলা সন):\nরোজঃ\nসময়ঃ\nস্থানঃ\n\nশুভ বিবাহ-\nতারিখ (ইংরেজি সন):\nতারিখ (বাংলা সন):\nরোজঃ\nলগ্ন (শুধু মাত্র হিন্দুদের জন্য):\nবরযাত্রা/সময়ঃ\nস্থানঃ\n\nবৌ-ভাত-\nতারিখ (ইংরেজি সন):\nতারিখ (বাংলা সন):\nরোজঃ\nসময়ঃ\nস্থানঃ\n\nঅভ্যর্থনায়-\n(ছোট বাচ্চাদের নাম):\n\nপ্রয়োজনে-\n(ফোন নম্বর):\n\nশুভেচ্ছান্তে-\nনামঃ\n\n-------\nবর এবং কণে পিতা মাতার কত তম সন্তান?\n\n\nকার্ডটি ছেলের পক্ষ হতে নাকি মেয়ের পক্ষ হতে?\n\n-------\nকুরিয়ার ইনফরমেশন-\nযে রিসিভ করবে তার নামঃ\nমোবাইল নম্বরঃ\nবিস্তারিত ঠিকানাঃ\n\n💡 _(নোট: সব তথ্য অ্যাড না করলেও চলবে, যেগুলো প্রয়োজন নেই সেগুলো ফাঁকা রেখে ফর্মটি ফিলাপ করে পাঠিয়ে দিতে পারেন)_';

        await sendText(senderId, banglaForm);

      } else if (trigger === 'english_form') {
        const englishForm =
          'Groom Name:\nFather Name:\nMother Name:\n\nBride Name:\nFather Name:\nMother Name:\n\nProgramme\n\nHolud Sandya\nDay:\nDate:\nTime:\nVenue:\nAddress:\n\nWedding\nDay:\nDate:\nTime:\nVenue:\nAddress:\n\nReception\nDay:\nDate:\nTime:\nVenue:\nAddress:\n\nWith Best Regard:\nName:\n\nRSV\nNumber:\n\n🚚 Courier Information-\nReceiver Name:\nMobile Number:\nDetailed Address:\n\n💡 _(Note: You can skip any fields that are not required for your card layout)_';

        await sendText(senderId, englishForm);
      }

    } catch (err) {
      console.error('Webhook Main Error:', err);
    }
  }
});

app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === VERIFY_TOKEN) {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.sendStatus(403);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('✅ BOONDHON Ultimate Gemini Bot Engine is Fully Active!'));
