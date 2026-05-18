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
  "1PeaR16EDy3xXTJDbPuP9GHJiX3F2Ubea","1firMVBvk_QAfMfQONWCbvr1oo0dtK53F", 
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
  
  const affordable = ["affordable", "অ্যাফোর্ডেবল", "সাশ্রয়", "কম দাম", "affordable card", "affodable", "এফোর্ডেবল", "affordable কালেকশন"];
  const premium = ["premium", "প্রিমিয়াম", "premium card", "প্রিমিয়াম কার্ড", "premium কালেকশন"];
  const price = ["দাম", "প্রাইস", "price", "অফার", "দাম ও অফার"];
  const delivery = ["ডেলিভারি", "কারখানা", "delivery", "অফিস", "ঠিকানা"];
  const selectBangla = ["বাংলা", "bangla", "বাংলা ফর্ম", "বাংলায়"];
  const selectEnglish = ["english", "ইংরেজি", "ইংরেজিতে", "english form"];
  const sale = [
    "অর্ডার কনফার্ম", "order confirm", "কনফার্ম করলাম", "নিব", "নেব", 
    "অর্ডার করব", "অর্ডার দিতে চাই", "confirm করলাম", "কনফার্ম", "অর্ডার কনফার্ম করুন"
  ];

  if (sale.some(w => t.includes(w))) return "sale";
  if (affordable.some(w => t.includes(w))) return "affordable";
  if (premium.some(w => t.includes(w))) return "premium";
  if (price.some(w => t.includes(w))) return "price";
  if (delivery.some(w => t.includes(w))) return "delivery";
  if (selectBangla.some(w => t.includes(w))) return "bangla_form";
  if (selectEnglish.some(w => t.includes(w))) return "english_form";
  return null;
}

// ── Core Navigation Buttons (Vertical Layout Menu) ────────
const CORE_QUICK_REPLIES = [
  { content_type: "text", title: "🌸 Affordable কালেকশন", payload: "TRIGGER_AFFORDABLE" },
  { content_type: "text", title: "✨ Premium কালেকশন", payload: "TRIGGER_PREMIUM" },
  { content_type: "text", title: "💰 দাম ও অফার লিস্ট", payload: "TRIGGER_PRICE" },
  { content_type: "text", title: "🚚 ডেলিভারি ও কারখানা", payload: "TRIGGER_DELIVERY" },
  { content_type: "text", title: "🛍️ অর্ডার কনফার্ম করুন", payload: "TRIGGER_SALE" }
];

// ── Messenger Custom Sender Function ───────────────────────
async function sendTextWithMenu(recipientId, text, customReplies = CORE_QUICK_REPLIES) {
  await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: {
        text: text,
        quick_replies: customReplies
      }
    })
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

// ── Gemini API Integration ────────────────────────────────
async function getGeminiReply(senderId, userMessage) {
  const history = getHistory(senderId);
  const contents = history.map(h => ({
    role: h.role === 'user' ? 'user' : 'model',
    parts: [{ text: h.content }]
  }));
  contents.push({ role: 'user', parts: [{ text: userMessage }] });

  const systemInstructionText = 
    `তুমি BOONDHON Printing House-এর AI Sales Agent "Brishti Apa"। কাস্টমার যেকোনো প্রশ্ন করুক না কেন, তুমি সবসময় অত্যন্ত মিষ্টি ও প্রফেশনাল ভাষায় উত্তর দেবে।\n\n` +
    `━━━━━ গুরুত্বপূর্ণ সেলস গাইডলাইন ━━━━━\n` +
    `১. কাস্টমারকে যেকোনো তথ্যের উত্তর দেওয়ার সময় ছোট ২-৪ লাইনে মিষ্টি করে মূল পয়েন্টটি বুঝিয়ে বলবে।\n` +
    `২. প্রাইস ও নেগোসিয়েশন কন্ডিশন:\n` +
    `   - ২০ পিস = ১,৫০০ টাকা (৭৫ টাকা/পিস)\n` +
    `   - ৫০ পিস: Premium = ৩,২৫০ টাকা | Affordable = ২,৭৫০ টাকা\n` +
    `   - ১০০ পিস: Premium = ৫,৫০০ টাকা | Affordable = ৪,৫০০ টাকা | Luxury = ৮,৫০০ টাকা\n` +
    `   - ২০০ পিস: Premium = ৯,০০০ টাকা | Affordable = ৭,০০০ টাকা\n` +
    `   - ২০০ পিস বা তার বেশি নিলে "FREE নিকাহনামা" অফার পাবে। ১০০ পিসে কোনো ফ্রি নিকাহনামা নেই।\n` +
    `   - কম পিস নিতে চাইলে সেটআপ কস্টের কথা বুঝিয়ে বলো যে ৫০ পিস নিলে পার পিস রেট অনেক কমে যাবে।\n` +
    `৩. অফিস ও কারখানা পলিসি:\n` +
    `   - প্রধান অফিস: মানিকগঞ্জ। কারখানা: ঢাকা ফকিরাপুল, लालবাগকেল্লা, বাংলাবাজার।\n` +
    `   - কাস্টমারকে মনে করিয়ে দেবে যে ডিজাইন অনুযায়ী কারখানা আলাদা হয়, তাই কুরিয়ার ছাড়া সরাসরি কারখানা থেকে নিজে এসে কালেক্ট করতে চাইলে অর্ডার চূড়ান্ত হওয়ার পর আমাদের টিম চূড়ান্ত কারখানা কনফার্ম করবে।`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: contents,
        systemInstruction: { parts: [{ text: systemInstructionText }] },
        generationConfig: { maxOutputTokens: 200, temperature: 0.7 }
      })
    });

    const data = await response.json();
    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }
    return 'জি ভাইয়া/আপু, আপনার সুন্দর সুন্দর বিয়ের কার্ডের ডিজাইন দেখা থেকে শুরু করে দাম ও ডেলিভারি পলিসি এক ক্লিকেই জানতে নিচের মেনু বাটনগুলো ব্যবহার করতে পারেন। 😊';
  } catch (err) {
    console.error('Gemini API Error:', err);
    return 'জি ভাইয়া/আপু, আপনার চ্যাট প্রসেস করতে সাহায্য করছি। নিচের বাটনগুলো চেপে আপনার পছন্দের অপশনটি বেছে নিন। 😊';
  }
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
      
      // ১. স্বাগতম ও ইমেজ লুপ ট্রিগার (Affordable)
      if (trigger === 'affordable') {
        const txt = `🌸 স্বাগতম ভাইয়া/আপু! আমাদের Affordable কালেকশনে মোট ${AFFORDABLE_IDS.length}টি চমৎকার ডিজাইন রয়েছে। ডিজাইনগুলো এক এক করে নিচে ফ্রেশ পিওর ইমেজ আকারে পাঠানো হচ্ছে, লোড হতে সামান্য কিছু সময় লাগতে পারে। একটু অপেক্ষা করুন... 👇`;
        await sendTextWithMenu(senderId, txt, CORE_QUICK_REPLIES);
        await sendAllImagesOneByOne(senderId, AFFORDABLE_IDS);
        continue;
      } 
      
      // ১. স্বাগতম ও ইমেজ লুপ ট্রিগার (Premium)
      if (trigger === 'premium') {
        const txt = `✨ স্বাগতম ভাইয়া/আপু! আমাদের Premium কালেকশনে মোট ${PREMIUM_IDS.length}টি এক্সক্লুসিভ ডিজাইন রয়েছে। সবগুলো ছবি নিচে পিওর ইমেজ আকারে সিরিয়ালি পাঠানো হচ্ছে, ছবিতে ক্লিক করলেই ফুল স্ক্রিন জুম করে দেখতে পাবেন। লোড হতে সামান্য সময় লাগতে পারে... 👇`;
        await sendTextWithMenu(senderId, txt, CORE_QUICK_REPLIES);
        await sendAllImagesOneByOne(senderId, PREMIUM_IDS);
        continue;
      }

      // ২. প্রাইস লিস্ট ও অফার ডিফেন্স
      if (trigger === 'price') {
        const priceText = 
          '💰 *BOONDHON বিয়ের কার্ডের প্রাইস লিস্ট:*\n\n' +
          '• *২০ পিস:* ১,৫০০ টাকা (ছোট অর্ডারে মেকিং ও প্রিন্টিং সেটআপ কস্ট বেশি পড়ে বিধায় ৭৫ টাকা/পিস আসে।)\n' +
          '• *৫০ পিস:* Premium = ৩,২৫০ টাকা | Affordable = ২,৭৫০ টাকা\n' +
          '• *১০০ পিস:* Premium = ৫,৫০০ টাকা | Affordable = ৪,৫০০ টাকা | Luxury = ৮,৫০০ টাকা\n' +
          '• *২০০ পিস:* Premium = ৯,০০০ টাকা | Affordable = ৭,০০০ টাকা\n\n' +
          '🎁 *বিশেষ অফার:* ২০০ পিস বা তার বেশি কার্ড অর্ডার করলে চমৎকার একটি আকদনামা/নিকাহনামা একদম *FREE* পেয়ে যাবেন! (১০০ পিসে কোনো ফ্রি নিকাহনামা নেই ভাইয়া/আপু)। এখনই কনফর্ম করলে ঈদের আগেই ডেলিভারি নিশ্চিত হবে!';
        
        await sendTextWithMenu(senderId, priceText, CORE_QUICK_REPLIES);
        continue;
      }

      // ৪. অফিস, কারখানা ও ডিজাইন শর্ত
      if (trigger === 'delivery') {
        const deliveryText = 
          '🚚 *ডেলিভারি, অফিস ও কারখানা পলিসি:*\n\n' +
          '📍 *আমাদের প্রধান অফিস:* মানিকগঞ্জ।\n' +
          '🏭 *আমাদের প্রিন্টিং কারখানা:* ঢাকা ফকিরাপুল, লালবাগকেল্লা, এবং বাংলাবাজার।\n\n' +
          '📦 *সংগ্রহ করার নিয়ম:* কুরিয়ার সার্ভিসের মাধ্যমে দেশের যেকোনো প্রান্ত থেকে আপনি ক্যাশ অন ডেলিভারিতে প্রোডাক্ট নিতে পারবেন। এছাড়া সরাসরি মানিকগঞ্জ অফিস অথবা ঢাকার কারখানা থেকেও নিজে এসে সংগ্রহ করা সম্ভব।\n\n' +
          '⚠️ *বিশেষ শর্ত:* আমাদের কার্ডের ক্যাটাগরি ও ডিজাইন অনুযায়ী প্রিন্টিং কারখানা আলাদা হয়ে থাকে। তাই আপনি সরাসরি এসে সংগ্রহ করতে চাইলে, অর্ডার চূড়ান্ত হওয়ার পর আমাদের কাস্টমার সাপোর্ট টিম আপনাকে শতভাগ কনফর্ম করে দেবে যে আপনার কার্ডটি কোন কারখানা থেকে সংগ্রহ করতে হবে।';
        
        await sendTextWithMenu(senderId, deliveryText, CORE_QUICK_REPLIES);
        continue;
      }

      // ৩. অর্ডার ও ভাষা সিলেকশন
      if (trigger === 'sale') {
        const orderRules = 
          '📋 *অর্ডার করার নিয়মাবলী:*\n\n' +
          '১. *অ্যাডভান্স পেমেন্ট:* অর্ডার কনফার্ম করতে টোটাল বিলের ৩০% এডভান্স পেমেন্ট করতে হবে। বিকাশ/নগদ/রকেট (পার্সোনাল): *01682588856*\n' +
          '২. *ডিজাইন প্রক্রিয়া:* পেমেন্টের পর আমাদের এক্সপার্ট ডিজাইনার আপনার দেওয়া তথ্য দিয়ে কার্ডের ডেমো ডিজাইন তৈরি করে ইনবক্সে দেখাবে। আপনি দেখে চূড়ান্ত করার পরই প্রিন্টিং শুরু হবে।\n' +
          '৩. *ডেলিভারি:* জেলা শহরে বাকি ৭০% টাকা ক্যাশ অন ডেলিভারিতে সুন্দরবন/ইউনিক কুরিয়ারে দেওয়া যাবে। সময় লাগবে ৫-৭ কর্মদিবস।\n\n' +
          '👇 অর্ডার প্রসেসটি এগিয়ে নিতে আপনার কার্ডের ভাষা সিলেক্ট করুন:';

        const langReplies = [
          { content_type: "text", title: "🇧🇩 বাংলায় ফর্ম দিন", payload: "SELECT_BANGLA" },
          { content_type: "text", title: "🇬🇧 English Form", payload: "SELECT_ENGLISH" }
        ];
        
        await sendTextWithMenu(senderId, orderRules, langReplies);
        continue;
      }

      // ফর্ম ডেলিভারি (বাংলা)
      if (trigger === 'bangla_form') {
        const banglaForm =
          'বর-\nনামঃ \nপিতাঃ\nমাতাঃ\nঠিকানাঃ\n\nকণে-\nনামঃ \nপিতাঃ\nমাতাঃ\nঠিকানাঃ\n\nগায়ে হলুদ-\nতারিখ (ইংরেজি ও বাংলা):\nরোজঃ | সময়ঃ | স্থানঃ\n\nশুভ বিবাহ-\nতারিখ (ইংরেজি ও বাংলা):\nরোজঃ | বরযাত্রা সময়ঃ | স্থানঃ\n\nবৌ-ভাত-\nতারিখ (ইংরেজি ও বাংলা):\nরোজঃ | সময়ঃ | স্থানঃ\n\nপ্রয়োজনে (ফোন নম্বর) / শুভেচ্ছান্তে-\n\n-------\nকার্ডটি ছেলের পক্ষ নাকি মেয়ের পক্ষ হতে?\n🚚 কুরিয়ার ইনফরমেশন (নাম, মোবাইল, ঠিকানা):\n\n_(নোট: কপি করে ফিলাপ করে পাঠিয়ে দিন)_';

        await sendTextWithMenu(senderId, banglaForm, CORE_QUICK_REPLIES);
        continue;
      }

      // ফর্ম ডেলিভারি (ইংরেজি)
      if (trigger === 'english_form') {
        const englishForm =
          'Groom Name:\nFather & Mother Name:\n\nBride Name:\nFather & Mother Name:\n\nProgramme (Holud / Wedding / Reception)\nDay:\nDate:\nTime:\nVenue:\n\n🚚 Courier Info (Name, Mobile, Address):\n\n_(Note: Copy, fill up and send back)_';

        await sendTextWithMenu(senderId, englishForm, CORE_QUICK_REPLIES);
        continue;
      }

      // সাধারণ চ্যাট কিউরিগুলোর জন্য জেমিনি রিপ্লাই জেনারেট করবে এবং নিচে ভার্টিকাল কোর মেনু অ্যাড করে দেবে
      const aiReply = await getGeminiReply(senderId, userText);
      addToHistory(senderId, 'user', userText);
      addToHistory(senderId, 'model', aiReply);

      await sendTextWithMenu(senderId, aiReply, CORE_QUICK_REPLIES);

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
app.listen(PORT, () => console.log('✅ BOONDHON Pro App-Style Bot Engine is Live!'));
