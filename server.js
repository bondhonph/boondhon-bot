require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "BOONDHON_SECRET_2026";
const PAGE_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyB4dAdo_U1k5mxZK1GVPDEnRLGuYJGXxTC";

// ── 🌸 Google Drive Image IDs ──
const AFFORDABLE_IDS = ["1J9_qfkIdIWL5Sc9O8EokvYlGfQWrf5TD","1cOCFSa1ap-Z54Ldf2AuoUKlEaQ5Ccql-","1dbYH2L4QykEUhYXGQPzQZObEuHFdwKsT","1HJTtR-zhhg6v2ph7MikdMDWI-LWJgG0z","1PRlMp4F1xnQJPURON535pl7t08_thXVA","1UEAeYYB3Bt5vMYEL-a7AcV1aV21Z04si","1-_qTV4gq0oKMdfMRxlTZL3yUO98ZGAoi","15yHXRk2mHI6-cKeooRqT20XeHubRRrPN","1Yrcqj5g0sZDrL3QaEkfEmKnF12BEs6ir","1vXwJ68j7x5qfpZdHkMkqLn0tvpblGDpl","1GWw91oefwyYr9sHSQXjePTSX-KwPjy7I","1_tnTz7HWDf4CVJHORPlani7pjEcLdm7X","1OMy_r94N_iUqvPW1t5fAGa4Sv3C_MIqF","1rXCxMziCgTImURvkahNp-AvneVljg-CW","1k_hzTbXOxxJg9rJ2OW-tnIkzLNYUqkOf","1bgYpcqh4pVLDy8yfwrS40X5ejtCFxmFv","1tLW7C2gwOmlZzGXh3bw0o7xjAPKrudIA","1ZEGHQfvuKNv-J5ZZadHKGfVAe4cvQnGq","1WE3kfWsd-0nrptiQ0fWi3dsd4iEcdw3t","1kLilyZRrhgrRfHn4aiTEcUBOu5fNDegs","1Cf7jQxeb5pyXvnA6HzGg_dYk3ZBrJ9z5","11UIRwmetqLkMU5qThwv5Vc7GnuASrZSa","1eXUGJyYhnNBXZ7PFwDgXgY-ql8cYADsh","1weNuPU3fBvPMkbFAGPiMm_ttEETSuQ9A","1PyKeX16mmVGaqKuZCujRskmip1LyGEgo","1luY2hOgpjUjXr_lGJbCQTumxKZFZrmJ4","1XanrmX4aOoDmjxha6lr5bYzlkZHglsTZ","1BBFuVKgKRUJV2pubIWiXgZlT3582Vcup","1wvf3jJjpV1sPuiO_Vj509y0UJABxbnuB","1TkCMzyPmSk9m2bIrRUInOm6epp2TQnV1","1H5lEN0baeoMMWL693BIXVYjrtZVipooO","14UHCDYmLowJbPfS-7Ve2Nx-tKno1MJU0","1CsDarakKEaGyVe8JqT05Mff988RztJX","1IDHV2uPD4AHjhsk75GJSETp9qQdpqPB4","1VGLRJbDyatJqfX0VEr3yGkRJMI23yRiL","1v1Fb2d2CP-v4N7Z2qVIqywIyph673I5Y","1X5yEsU9S8oYeFMEc8bjEm4XecbrR6fWA","1BkNP_edXf6c3wIP5lALPG2sjSp1C3d3z","1qKDy730IKVUH3e7U3zgUK863ekoYNGVS","1OVG52rNA1Ud-pG6gA-RtyRZkhE85tgkK","1nKQgpTV5txr5SO-6MYL4wnMskhLvkJJn","1lmdXd0R5pgyJqXhgGwYzzerX4NXPpOyZ","1cDyh8T6RQ7cOMY_js8TxQYrDO8BPy4cS","1eBePCdCDIMMvu6rZd-feOqvI8jPX44PU","1EOVX2gwvUotLFdfO5gO0Px8MaJwon9dY","1yA0KGGFMfYUQ8-9hpotpxNhagSSdp7xD","1inPC5SKDpW5epcxa-fFgXp9C9jowISPO","1WDJrtj_A5gk6KfolOju3TzfyVUm5Gt40","1gDDPhlDVI5Fu-nBdUPsM964FiuHz0YoU","18hlxoUBDiBuV_nxiqfPffkmW5mGmxdZA","1g7WVBZC6EqVPjZGqwnyYpDU-ehayWqCf","1jdh-o3_3_4xJGQbumQ258HN0fuc9qkZo","19-H4R6pAVCbU-P9BvLInXkcY2OZ1bUzo","1aqEN_fGQfJOYP4T1EdZuRbc-UpXJPTNj","1TfPmZfUQ1VbIie-GPcG5eLoy1Uk9D5Xt","1w502s3qp0cnI4NEAyv9ybo-6qVhs5IT1","1NGoRC9vhfaTIjis1aW0k8LpaFZMzLCjA","12QvRB7HhShW19jXuhN3BF6OFmGQLg0kR","1pJ5hgS89OF5cBTWVM6kbm1E3cMt1hcrT","1ygWRDCDH-dr7sI8TKtjAZkQ23bCTaqoG","1u-3SZI9ymC7E18sROzUy3gSAAb45yqmW","1vo67fp6I8ZA3wOi9Tw6eUu3HJrvAfbB","1K0JWt7BnX1wDLZ7D7Db_cI5z-OazCANU","10vyUHH9txFfzy6gTUXFsx95hDzH1rNE1","13_b1RSIwud_d2LvFwTc337ls-MfEmXRX","109AXjs6FKNUVfBfcQySBW_sqOzkcbrjV","1WJu3rqnGe-aYs1FZymiGtV-SEP6W7i-m","1IWSDwW4uTrWlNWo14GfbHPn7Fq0g_nzL","1g800vKvxkKR_hUYKvv0-Gh1jNJrqnyaq","11Uy_p33yXsQiMW0qy7l1b1qWvzQXLOEe","1PeaR16EDy3xXTJDbPuP9GHJiX3F2Ubea","1firMVBvk_QAfMfQONWCbvr1oo0dtK53F","1RNSqAZ7kxJSQ3jwzRfreYejLGGeXCz2h","1r-JnbeHPGBO0Q9cceYh1bzSCLKBOJEN_","1TtkzWXQisd7UShIg46wdW6vmWYbpUjkk","1vj8zzSFy1H_c7fAGi_REfMR-R8IPwTfK","1Q_DJOcMXmZrR7P9szIw9LWQ5-dyRLO2y","1OQQQN87UMWlaTcPnzFf9zwRTxxIqRO5-","1Cw6AehAWgLFPCLedbh3LR1LMfCx2B4S3","10iZEj1UR_VCC0T2MLYhyT1hfO5zeoQFN","1pXnX_YraQ9SmZmttbcuaBJ6GfCbMxfL_","1ierJrCWZ0kiommCWoUzsVEFC2VoOKIRt","1zCjZp5fZ7ocwB33-bBCs93kaHJ0EOl5r"];

const PREMIUM_IDS = ["182kOjBhoaqOTq7nr4ryI6re6fRuLITbH","1cTfbTDJDqBjsV-r7V1OjBZ-Z6tUAqwxj","1cA-MfI55Hh7ibreMQ4zPvt2i_LKxVHkR","1fvtC5mT4slvV_kROIej7awAGmCRc7TUl","1rLVZUQ8lw6ilWM76xxARtbUreQ3JIkdi","15AQWI3wP2a57-3OxHZTCfSbskgvC5YvH","1ahoubjUVdc9SJyi5n2rzZIsbugjCjHiz","1qlwwRe2Mr_gb8CZjkeG0-YxBSGmOHzZu","1oOdGtYFTz-xNmSLUO-VFS1YODqYZ74HJ","1zBBLQOfuAaPXhyr6At3tJ5DlTZ_nXfLy","11GVK5OYU7bjf8YaHeNAAnAHPks3T1Jme","1Kat8i9M3usZX8iX2xUCcX08RVocX9kKB","1f327zMbxf9s_Z2WSYhA4cAIF_NBiveKW","1T_pxOh0mn36N882wUMyYSsXKoZE4w1XA","1OQqgPUW0j1C5Ggvh50oTnnw5VsgEQv5I","15FGsZ0xdZd7DYZb4awafD8ysH_8g-A9O","1KUI4gzdhT-1I_LpzCMCQL8Sgfy4dU_Im","1amD4c_CLTODq8nca3N_H40vPiYp53VTm","1j2a0DIwsKoXWomTJ9RuJm1RncFH3mbqg","1Cl0fyeCN4T4mUxt-mhEQe6z6ZzBXsQsK","1Tpq2cCmWEooN2SYUIEgq-elk6tRK_5tV","1wlnH6L9DQcYtHHRDtPmrLGz-u6bslOgl","1ZrP-OujlWQGLEln1u8YTa4e3kjQY0yzI","1U6HoCb65TnMZsfKmGQ9wujvvppKzD7HY","1pbevqRrVV2_aYSNSMF8q7jMqnDMGpAUn","1KTSwcHJmwu1XximtqvbgSnP4Zrskg8T_","1ZG7hoRZgcj5F_UMCidzJSI2yAYoiUAf6","1uMyZI2cVy_uABGNPNoe-pXul2pPPhC_U","1gITGc6TLsrSjYkdMhURcUUNQH1y1GFpc","1FTFe6klyuHyUBsOfLeN_QsZABlhF_I1U","1n9SD-SDFTJMuW-J_9g-Sg3Pi9u4Q8VqZ","1PiYBXyjmd0jMff_0j9miNPSKsH549oOJ","1emx-RKETN5UkoPSIM66I9V6z8g4O6eL0","1V9mGxsK3TFtLWGBnnfoQQ9tgnvmfOOKj","1zCSjLjQOnSeOechbnhxepJSKxbdE7MeI","1HarOxTDa8wdWYkAHdsYCUNp6-bdW-0aM","1zIdOBb-MSqAEHDPmc_cJluX8dtgx5fkk","1V1JnATj5BVIrnhdP7FleskNC0RElJ0NZ","1liH9X1gZehPc1nmNoPrBMysviH-_AC_0","1kS9lA4Rt0Ro1H4zWO_hNBzKPNvLkpb6G","1ML1TVAbIwOfV8g8V2jbFOnhupomDRuj5","15AnUgqE1IMBspLC7jCVveFXzNMVrvZUl","16pVMXGt2O5OW0GnEH0vK_J7beXJOVTFG","1x_Ykz9171lN4T5AJzBpbHlqvPyM-JuJ4","1qj1usLPAzfw8y74c-KKF6MfbE6F_txEJ","1oUNXIOVWfaYe_O1s0AZP7WZbz9PkJdER","1lKmVy2Xgs27j5IW6CzbzYYHzIPpPB7pF","10R18Piu79JTBPmWu7l1q_ht5yRddjZj_","1C3AXVh-mfTMtcAFhrL044TvwklDIKYNa","1fZQ7kc9OkcDLMntUqUnUh-eVfGPqfIm","1Zb-AwPI5Ta8GaDX8T2QSMesenxFBEpNw","181vyiexE1YGUOav2BUEdLzWLn24qdvvm","1IUCMZwe292HN-OEcdnIbvWPuwGy6bgBG","1zyZ3QVHsOkTBADMm8jxJrk2ZIiiFE87F","1vtMWO4Ah45nvFExeMq82sfZc2JRsIiHc","1S0Oefe3t9iTNkhY_kjNojyHbb7uY4qHE","1rDFVMBfbrEt76kjiJLES3bnA_jmedsyI","119JxcFfIzDClqpTEC7ekWEMEPzH4_Hth","18roPGwQh8ImnrZ3ncIe8dt69JtUqrmwQ","147CRb0HLsfBA8aw9BNdO6dco7dQF6xNo","1oBnPqo8kAxNk4D3cgxlJAaZGqmP5F2Mb","1NVkZtKt1EHXcCA0c_latgAtBdckWGi6t","1EZIR0WmtoYLGcR-mUebaCHYYCL9NNykR","1zwQdkQRZVqXLvhRmHeuqNj3OtwFZ5xer","1p0cWNTy_cCV8_yrV3RuPp94stsaH8ZRm","1ntMdF0lJquZtJTYKc3t4WWGU-00DiYaM","1L1RhTUFgN2ziAWpKaRwlZipkjehPXnWZ","1jgARDI1JIjh_4qRUbvdpG1p0RBp4if7b","1TGZcnR1aYmln_E_UxgD_uInfREnRXf9T","1OKX94fxZ1BXqvDYY8SCQ22gR6Db2op2y","1J2_PY_Rk-x5ipzl_Ur5unrWCx2ZN7LvR","184YPeKcI8ilthW2VPvTcnJSTebj335-c","1-7lrprKPJQ-JuiNVi_bUdzHr_7S0NmNn","1ZAk92jKEyUhpO_faXYdbz5PPXkmo5YQN","1_9oor-2oJ4dHHOBkERAije6pvr8zAqPJ","1MX7rnQG2F0H8UX5ofGazO53knl7SUNE1","148EhK2GqvlP8Z-X-pK4Cp-Zb_sXqBLAu","1EuLjjvKMWIMkgbnK5PKOsKC5kG5H11"];

// ✅ FIXED: Correctly implemented template literal ($ added) & HTTPS direct URL for Google Drive
function driveUrl(id) {
  return `https://lh3.googleusercontent.com/d/${id}`;
}

const userStates = {};

function getUserState(senderId) {
  if (!userStates[senderId]) {
    userStates[senderId] = {
      history: [], isSendingImages: false, imageType: null,
      lastImageIndex: 0, followUpTimers: [], priceObjectionCount: 0, hasOfferedDiscount: false
    };
  }
  return userStates[senderId];
}

function clearFollowUps(state) {
  if (state.followUpTimers) { state.followUpTimers.forEach(t => clearTimeout(t)); state.followUpTimers = []; }
}

async function sendTypingIndicator(recipientId, action = "typing_on") {
  try {
    await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient: { id: recipientId }, sender_action: action })
    });
  } catch (e) { console.error('Typing indicator error:', e); }
}

async function sendMsg(recipientId, text, delayMs = 1500) {
  await sendTypingIndicator(recipientId, "typing_on");
  await new Promise(r => setTimeout(r, delayMs));
  await sendTypingIndicator(recipientId, "typing_off");
  
  await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipient: { id: recipientId }, message: { text } })
  });
}

// ── ⏳ Enhanced Smart Follow-Ups ──
function scheduleFollowUps(senderId) {
  const state = getUserState(senderId);
  clearFollowUps(state);
  const intervals = [
    { time: 60*60*1000, msg: "Hi ভাইয়া/আপু! 😊 আপনার ওয়েডিং কার্ডের অর্ডারটি কি কনফার্ম করব? আমাদের স্টক সীমিত, তাই দ্রুত জানালে ভালো হয়! 🛍️" },
    { time: 2*60*60*1000, msg: "কোনো ডিজাইন কি পছন্দ হয়েছে আপু/ভাইয়া? 💖 কোনো কাস্টমাইজেশন লাগলে আমাদের জানাতে পারেন কিন্তু! ✨" },
    { time: 6*60*60*1000, msg: "শুভ দিন! 🌸 বিয়ের কার্ডের অর্ডারটি আজই কনফার্ম করলে দ্রুত ডেলিভারি পেয়ে যেতেন। আপনার সিদ্ধান্তের অপেক্ষায় রইলাম! 🥰" },
    { time: 24*60*60*1000, msg: "আসসালামু আলাইকুম ভাইয়া/আপু। 💌 BOONDHON-এর সাথে যোগাযোগ করার জন্য আপনাকে অনেক ধন্যবাদ। কোনো হেল্প লাগলে জানাবেন, ভালো থাকবেন! 🙏❤️" }
  ];
  intervals.forEach(step => {
    const timer = setTimeout(async () => {
      if (!getUserState(senderId).isSendingImages) await sendMainMenu(senderId, step.msg);
    }, step.time);
    state.followUpTimers.push(timer);
  });
}

function detectTrigger(text) {
  if (!text) return null;
  const t = text.toLowerCase();
  if (["অর্ডার কনফার্ম","order confirm","কনফার্ম করলাম","নিব","নেব","অর্ডার করব","অর্ডার দিতে চাই","কনফার্ম","order krbo","order kivabe","এখনই অর্ডার করুন","sale"].some(w => t.includes(w))) return "sale";
  if (["দামী","অনেক দাম","রাখেন","নিব না","expensive","বেশি দাম","কম রাখেন","বাজেট নাই","ডিসকাউন্ট","ছাড় দেন"].some(w => t.includes(w))) return "price_objection";
  if (["না","লাগবে না","no","stop","আর দিও না","🙅"].some(w => t.includes(w))) return "stop_images";
  if (["হ্যাঁ","দাও","yes","বাকিগুলো","পাঠাও","👍"].some(w => t.includes(w))) return "continue_images";
  if (["affordable","অ্যাফোর্ডেবল","সাশ্রয়","কম দাম"].some(w => t.includes(w))) return "affordable";
  if (["premium","প্রিমিয়াম"].some(w => t.includes(w))) return "premium";
  if (["দাম","প্রাইস","price","কত টাকা","কত","অফার"].some(w => t.includes(w))) return "price";
  if (["ডেলিভারি","কারখানা","delivery","অফিস","ঠিকানা","পলিসি"].some(w => t.includes(w))) return "delivery";
  if (["বাংলা","bangla","বাংলা ফর্ম"].some(w => t.includes(w))) return "bangla_form";
  if (["english","ইংরেজি","english form"].some(w => t.includes(w))) return "english_form";
  return null;
}

async function sendMainMenu(recipientId, mainText) {
  try {
    if (mainText) {
      await sendMsg(recipientId, mainText, mainText.length > 200 ? 2500 : 1200);
    }
    
    await sendTypingIndicator(recipientId, "typing_on");
    await new Promise(r => setTimeout(r, 600));
    
    await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient: { id: recipientId }, message: { attachment: { type: "template", payload: { template_type: "button", text: "👇 নিচের অপশনগুলো সিলেক্ট করুন:", buttons: [
        { type: "postback", title: "🌸 Affordable কার্ড", payload: "affordable" },
        { type: "postback", title: "✨ Premium কার্ড", payload: "premium" },
        { type: "postback", title: "💰 দাম ও অফার", payload: "price" }
      ] } } } })
    });
    
    await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient: { id: recipientId }, message: { attachment: { type: "template", payload: { template_type: "button", text: "⚙️ অন্যান্য তথ্য:", buttons: [
        { type: "postback", title: "🚚 পলিসি ও ঠিকানা", payload: "delivery" },
        { type: "postback", title: "🛍️ এখনই অর্ডার করুন", payload: "sale" }
      ] } } } })
    });
  } catch (err) { console.error('Menu error:', err); }
}

async function sendImagesStream(senderId, startIndex = 0) {
  const state = getUserState(senderId);
  const ids = state.imageType === 'premium' ? PREMIUM_IDS : AFFORDABLE_IDS;
  state.isSendingImages = true;

  for (let i = startIndex; i < ids.length; i++) {
    if (!state.isSendingImages) { state.lastImageIndex = i; return; }
    try {
      await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipient: { id: senderId }, message: { attachment: { type: 'image', payload: { url: driveUrl(ids[i]), is_reusable: true } } } })
      });
    } catch (e) { console.error('Image error:', e); }
    await new Promise(r => setTimeout(r, 950));
    if (!state.isSendingImages) { state.lastImageIndex = i + 1; return; }
  }

  state.isSendingImages = false;
  await sendMainMenu(senderId, "✨ সব ডিজাইন দেখানো শেষ! 🥰 কোনটি পছন্দ হয়েছে? অর্ডার কনফার্ম করব? 🛍️");
}

async function getGeminiReply(senderId, userMessage) {
  const state = getUserState(senderId);
  const contents = state.history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.content }] }));
  contents.push({ role: 'user', parts: [{ text: userMessage }] });

  const systemText = "তুমি BOONDHON Printing House-এর AI Sales Agent 'Brishti Apa'। অত্যন্ত মিষ্টি ও আন্তরিক। প্রচুর সুন্দর সুন্দর ইমোজি (🌸, ✨, 💰, 🛍️, 🥰) ব্যবহার করবে। প্রাইস: ৫০ পিস Affordable=২৭৫০, Premium=৩২৫০। ১০০ পিস Affordable=৪৫০০, Premium=৫৫০০। ২০০ পিস Affordable=৭০০০, Premium=৯০০০। ২০০+ পিসে FREE ডিজিটাল আকদনামা/নিকাহনামা অফার প্রযোজ্য। দাম বেশি বললে কোয়ালিটি ও ফেইল প্রিন্টিং মেটেরিয়ালস বুঝিয়ে বলো, কমাবে না। যদি ১০০ পিস বা কম নিতে চায় তবে ২০০ পিস নেওয়ার অফার পুশ করো যে ২০০ পিস নিলে ১০০০ টাকা মূল্যের একটি নিকাহনামা একদম ফ্রি পাওয়া যাবে যাতে আদতে কাস্টমারের লাভ বেশি। নিজে থেকে কখনও ২০ পিসের কথা বলবে না, খুব জোর করলে কেবল বলবে ২০ পিস = ১৫০০ টাকা। কাস্টমার 'Eita koto tk', 'Price' বা 'order krbo kivsbe' লিখলে রেসপন্স করার পাশাপাশি নিচের বাটন সিলেক্ট করতে বলবে।";

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents, systemInstruction: { parts: [{ text: systemText }] }, generationConfig: { maxOutputTokens: 250, temperature: 0.7 } })
    });
    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'জি ভাইয়া/আপু! 🥰 কীভাবে সাহায্য করতে পারি বলুন?';
  } catch (err) {
    return 'জি প্রিয় ভাইয়া/আপু! 🥰 নিচের মেনু থেকে সিলেক্ট করুন। ✨';
  }
}

app.post('/webhook', async (req, res) => {
  res.sendStatus(200);
  const body = req.body;
  if (body.object !== 'page') return;

  for (const entry of body.entry) {
    if (!entry.messaging) continue;
    const event = entry.messaging[0];
    if (!event || event.message?.is_echo) continue;

    const senderId = event.sender.id;
    const state = getUserState(senderId);
    clearFollowUps(state);

    let userText = "";
    if (event.message?.text) userText = event.message.text;
    else if (event.postback?.payload) userText = event.postback.payload;
    if (!userText) continue;

    const trigger = detectTrigger(userText);

    if (trigger) {
      state.isSendingImages = false;

      if (trigger === 'stop_images') {
        await sendMainMenu(senderId, "ঠিক আছে ভাইয়া/আপু! 🥰 অন্য কিছু লাগলে জানাবেন। আমরা কি তাহলে এই ডিজাইনগুলোর মধ্যেই অর্ডার ফাইনাল করব? 🛍️");
        scheduleFollowUps(senderId);
        continue;
      }

      if (trigger === 'continue_images') {
        await sendImagesStream(senderId, state.lastImageIndex);
        continue;
      }

      if (trigger === 'affordable') {
        state.imageType = 'affordable';
        state.lastImageIndex = 0;
        await sendMsg(senderId, "🌸 আমাদের Affordable কালেকশনের চমৎকার প্রিমিয়াম ডিজাইনগুলো এক এক করে নিচে পাঠানো হচ্ছে। একটু লক্ষ্য করুন ভাইয়া/আপু... 👇", 1000);
        await sendImagesStream(senderId, 0);
        continue;
      }

      if (trigger === 'premium') {
        state.imageType = 'premium';
        state.lastImageIndex = 0;
        await sendMsg(senderId, "✨ আমাদের রাজকীয় Premium কালেকশনের এক্সক্লুসিভ ডিজাইনগুলো সিরিয়ালি পাঠানো হচ্ছে ভাইয়া/আপু... 👇", 1000);
        await sendImagesStream(senderId, 0);
        continue;
      }

      if (trigger === 'price') {
        await sendMainMenu(senderId,
          '💰 *BOONDHON বিয়ের কার্ডের আকর্ষণীয় প্রাইস লিস্ট:* 🌸\n\n' +
          '• *৫০ পিস:* Premium = ৩,২৫০ টাকা 👑 | Affordable = ২,৭৫০ টাকা ✨\n' +
          '• *১০০ পিস:* Premium = ৫,৫০০ টাকা 👑 | Affordable = ৪,৫০০ টাকা ✨\n' +
          '• *২০০ পিস:* Premium = ৯,০০০ টাকা 👑 | Affordable = ৭,০০০ টাকা ✨\n\n' +
          '🎁 *ধামাকা অফার:* 🌟 ২০০ পিস বা তার বেশি কার্ড অর্ডার করলেই পাচ্ছেন একটি চমৎকার ডিজিটাল আকদনামা/নিকাহনামা একদম *FREE*! 🥰\n\n' +
          '🛍️ ভাইয়া/আপু, আপনার কত পিস কার্ড প্রয়োজন? আজই অর্ডার কনফার্ম করলে দ্রুত কাজ শুরু করতে পারব! ✨'
        );
        scheduleFollowUps(senderId);
        continue;
      }

      if (trigger === 'delivery') {
        await sendMainMenu(senderId,
          '🚚 *ডেলিভারি, office ও কারখানা পলিসি:* 🏭\n\n' +
          '📍 *আমাদের প্রধান অফিস:* Manikganj\n' +
          '🏭 *আমাদের প্রিন্টিং কারখানা:* ঢাকা ফকিরাপুল, লালবাগকেল্লা, বাংলাবাজার ও বাবু বাজার।\n\n' +
          '📦 *সংগ্রহ করার নিয়ম:* কুরিয়ার সার্ভিসের মাধ্যমে দেশের যেকোনো প্রান্ত থেকে আপনি ক্যাশ অন ডেলিভারিতে প্রোডাক্ট নিতে পারবেন। এছাড়া সরাসরি মানিকগঞ্জ অফিস অথবা ঢাকার কারখানা থেকেও নিজে এসে সংগ্রহ করা সম্ভব। 🥰\n\n' +
          '⚠️ *বিশেষ শর্ত:* আমাদের কার্ডের ক্যাটাগরি ও ডিজাইন অনুযায়ী প্রিন্টিং কারখানা আলাদা হয়ে থাকে। তাই সরাসরি এসে সংগ্রহ করতে চাইলে, অর্ডার চূড়ান্ত হওয়ার পর আমাদের কাস্টমার সাপোর্ট টিম আপনাকে নির্দিষ্ট ফ্যাক্টরির লোকেশন কনফর্ম করে দেবে। তাই কারখানা থেকে ডেলিভারি নিলে অবশ্যই আগে ঠিকানা জেনে নিতে হবে।\n\n' +
          '📞 *আমাদের হটলাইন:* 01701016826 (WhatsApp-ও সেম)\n' +
          '🌐 অর্ডার অনলাইনে বা অফিসে এসে সরাসরি বুক করতে হবে। ✨'
        );
        scheduleFollowUps(senderId);
        continue;
      }

      if (trigger === 'price_objection') {
        state.priceObjectionCount += 1;
        if (state.priceObjectionCount < 3 && !state.hasOfferedDiscount) {
          const reply = await getGeminiReply(senderId, userText);
          await sendMainMenu(senderId, reply);
        } else if (state.priceObjectionCount >= 3 && !state.hasOfferedDiscount) {
          state.hasOfferedDiscount = true;
          await sendMainMenu(senderId,
            '🌸 ভাইয়া/আপু, আপনার বিয়ের সুন্দর মুহূর্তটিকে আনন্দময় করতে আমাদের ম্যানেজমেন্ট থেকে একটি অত্যন্ত স্পেশাল পারমিশন নিলাম! 🥰\n\n' +
            'আপনার বাজেটকে সম্মান জানিয়ে শুধুমাত্র আপনার অর্ডারটির জন্য প্রতি পিস কার্ডে **৫ টাকা করে স্পেশাল ডিসকাউন্ট** দেওয়া যাবে! 🥳\n\n' +
            '💰 আমাদের হাই-কোয়ালিটি প্রিমিয়াম কার্ডের এই ওয়ান-টাইম স্পেশাল প্রাইসে অর্ডারটি কি তাহলে এখন কনফার্ম করে দেব ভাইয়া/আপু? 🛍️'
          );
        } else {
          await sendMainMenu(senderId, "আহারে ভাইয়া/আপু! 😭 আমাদের মেটেরিয়ালস ও প্রিন্টিং কোয়ালিটি ১০০% এক্সক্লুসিভ হওয়ায় এর চেয়ে কম করলে আমাদের একদম লস হয়ে যাবে। BOONDHON-এর সাথে যোগাযোগ করার জন্য আপনাকে অনেক অনেক ধন্যবাদ! ভালো থাকবেন। 🙏❤️");
        }
        scheduleFollowUps(senderId);
        continue;
      }

      if (trigger === 'sale') {
        try {
          await sendTypingIndicator(senderId, "typing_on");
          await new Promise(r => setTimeout(r, 1000));
          await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipient: { id: senderId }, message: { attachment: { type: "template", payload: { template_type: "button",
              text: '📋 *অर्डर করার নিয়মাবলী:* 🌸\n\n' +
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
                    '> এছাড়া সরাসরি আমাদের অফিস বা কারখানা থেকে সংগ্রহ করতে পারবেন।\n\n' +
                    '৪. *ডেলিভারি সময়:*\n' +
                    '> কার্ড ডেলিভারি পেতে ৫ থেকে ৭ কর্মদিবস সময় লাগবে।\n\n' +
                    '👇 অর্ডার প্রসেসটি ঝটপট এগিয়ে নিতে আপনার কার্ডের কাঙ্ক্ষিত ভাষা সিলেক্ট করুন: ✨',
              buttons: [
                { type: "postback", title: "🇧🇩 বাংলায় ইনফো ফর্ম", payload: "bangla_form" },
                { type: "postback", title: "🇬🇧 English Form", payload: "english_form" }
              ]
            } } } })
          });
          scheduleFollowUps(senderId);
        } catch (e) { console.error(e); }
        continue;
      }

      if (trigger === 'bangla_form') {
        await sendMsg(senderId,
          '📝 *বিয়ের কার্ডের বাংলা ফর্ম:* 🌸\n\n' +
          'বর-\nনামঃ \nপিতাঃ\nমাতাঃ\nঠিকানাঃ\n\n' +
          'কণে-\nনামঃ \nপিতাঃ\nমাতাঃ\nঠিকানাঃ\n\n' +
          'গায়ে হলুদ-\nতারিখ (ইংরেজি সন):\nতারিখ (বাংলা সন):\nরোজঃ\nসময়ঃ\nস্থানঃ\n\n' +
          'শুভ বিবাহ-\nতারিখ (ইংরেজি সন):\nতারিখ (বাংলা সন):\nরোজঃ\nলগ্ন (শুধু মাত্র Hindus দের জন্য):\nবরযাত্রা/সময়ঃ\nস্থানঃ\n\n' +
          'বৌ-ভাত-\nতারিখ (ইংরেজি সন):\nতারিখ (বাংলা সন):\nরোজঃ\nসময়ঃ\nস্থানঃ\n\n' +
          'অভ্যর্থনায়-\n(ছোট বাচ্চাদের নাম):\n\n' +
          'প্রয়োজনে-\n(ফোন নম্বর):\n\n' +
          'শুভেচ্ছান্তে-\nনামঃ\n\n' +
          '-------\n' +
          '❓ বর এবং কণে পিতা মাতার কত তম সন্তান?\n\n' +
          '❓ কার্ডটি ছেলের পক্ষ হতে নাকি মেয়ের পক্ষ হতে?\n\n' +
          '🚚 কুরিয়ার ইনফরমেশন (নাম, মোবাইল, ঠিকানা):\n\n' +
          '_(নোট: ফর্মটি কপি করে সুন্দর করে ফিলাপ করে ঝটপট পাঠিয়ে দিন ভাইয়া/আপু! 🥰)_', 2000
        );
        scheduleFollowUps(senderId);
        continue;
      }

      if (trigger === 'english_form') {
        await sendMsg(senderId,
          '📝 *Wedding Card English Form:* ✨\n\n' +
          'Groom Name:\nFather Name:\nMother Name:\n\n' +
          'Bride Name:\nFather Name:\nMother Name:\n\n' +
          '━━━━ Programme ━━━━\n' +
          '• Holud Sandya\nDay: | Date: | Time:\nVenue: | Address:\n\n' +
          '• Wedding\nDay: | Date: | Time:\nVenue: | Address:\n\n' +
          '• Reception\nDay: | Date: | Time:\nVenue: | Address:\n\n' +
          'With Best Regards:\nName:\n\n' +
          'RSVP Number:\n\n' +
          '🚚 Courier Info (Name, Mobile, Address):\n\n' +
          '_(Note: Please copy, fill up and send it back to lock your order now! 🥰)_', 2000
        );
        scheduleFollowUps(senderId);
        continue;
      }
    }

    if (state.isSendingImages) {
      state.isSendingImages = false;
      const aiReply = await getGeminiReply(senderId, userText);
      try {
        await sendMsg(senderId, aiReply, 1500);
        await sendTypingIndicator(senderId, "typing_on");
        await new Promise(r => setTimeout(r, 600));
        await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ recipient: { id: senderId }, message: { attachment: { type: "template", payload: { template_type: "button",
            text: `💖 ভাইয়া/আপু, বাকি কার্ডের ডিজাইনগুলো কি এখন পাঠাব?`,
            buttons: [
              { type: "postback", title: "👍 হ্যাঁ, বাকিগুলো দাও", payload: "continue_images" },
              { type: "postback", title: "🙅 না, আর লাগবে না", payload: "stop_images" }
            ]
          } } } })
        });
      } catch (e) { console.error(e); }
      continue;
    }

    const aiReply = await getGeminiReply(senderId, userText);
    state.history.push({ role: 'user', content: userText });
    state.history.push({ role: 'model', content: aiReply });
    while (state.history.length > 10) state.history.shift();
    
    await sendMainMenu(senderId, aiReply);
    scheduleFollowUps(senderId);
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
app.listen(PORT, () => console.log('🚀 BOONDHON AI Sales Engine Fully Active & Optimized!'));
