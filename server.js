require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "BOONDHON_SECRET_2026";
const PAGE_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyB4dAdo_U1k5mxZK1GVPDEnRLGuYJGXxTC";

const AFFORDABLE_IDS = ["1J9_qfkIdIWL5Sc9O8EokvYlGfQWrf5TD","1cOCFSa1ap-Z54Ldf2AuoUKlEaQ5Ccql-","1dbYH2L4QykEUhYXGQPzQZObEuHFdwKsT","1HJTtR-zhhg6v2ph7MikdMDWI-LWJgG0z","1PRlMp4F1xnQJPURON535pl7t08_thXVA","1UEAeYYB3Bt5vMYEL-a7AcV1aV21Z04si","1-_qTV4gq0oKMdfMRxlTZL3yUO98ZGAoi","15yHXRk2mHI6-cKeooRqT20XeHubRRrPN","1Yrcqj5g0sZDrL3QaEkfEmKnF12BEs6ir","1vXwJ68j7x5qfpZdHkMkqLn0tvpblGDpl","1GWw91oefwyYr9sHSQXjePTSX-KwPjy7I","1_tnTz7HWDf4CVJHORPlani7pjEcLdm7X","1OMy_r94N_iUqvPW1t5fAGa4Sv3C_MIqF","1rXCxMziCgTImURvkahNp-AvneVljg-CW","1k_hzTbXOxxJg9rJ2OW-tnIkzLNYUqkOf","1bgYpcqh4pVLDy8yfwrS40X5ejtCFxmFv","1tLW7C2gwOmlZzGXh3bw0o7xjAPKrudIA","1ZEGHQfvuKNv-J5ZZadHKGfVAe4cvQnGq","1WE3kfWsd-0nrptiQ0fWi3dsd4iEcdw3t","1kLilyZRrhgrRfHn4aiTEcUBOu5fNDegs","1Cf7jQxeb5pyXvnA6HzGg_dYk3ZBrJ9z5","11UIRwmetqLkMU5qThwv5Vc7GnuASrZSa","1eXUGJyYhnNBXZ7PFwDgXgY-ql8cYADsh","1weNuPU3fBvPMkbFAGPiMm_ttEETSuQ9A","1PyKeX16mmVGaqKuZCujRskmip1LyGEgo","1luY2hOgpjUjXr_lGJbCQTumxKZFZrmJ4","1XanrmX4aOoDmjxha6lr5bYzlkZHglsTZ","1BBFuVKgKRUJV2pubIWiXgZlT3582Vcup","1wvf3jJjpV1sPuiO_Vj509y0UJABxbnuB","1TkCMzyPmSk9m2bIrRUInOm6epp2TQnV1","1H5lEN0baeoMMWL693BIXVYjrtZVipooO","14UHCDYmLowJbPfS-7Ve2Nx-tKno1MJU0","1CsDarakKEaGyVe8JqT05pMff988RztJX","1IDHV2uPD4AHjhsk75GJSETp9qQdpqPB4","1VGLRJbDyatJqfX0VEr3yGkRJMI23yRiL","1v1Fb2d2CP-v4N7Z2qVIqywIyph673I5Y","1X5yEsU9S8oYeFMEc8bjEm4XecbrR6fWA","1BkNP_edXf6c3wIP5lALPG2sjSp1C3d3z","1qKDy730IKVUH3e7U3zgUK863ekoYNGVS","1OVG52rNA1Ud-pG6gA-RtyRZkhE85tgkK","1nKQgpTV5txr5SO-6MYL4wnMskhLvkJJn","1lmdXd0R5pgyJqXhgGwYzzerX4NXPpOyZ","1cDyh8T6RQ7cOMY_js8TxQYrDO8BPy4cS","1eBePCdCDIMMvu6rZd-feOqvI8jPX44PU","1EOVX2gwvUotLFdfO5gO0Px8MaJwon9dY","1yA0KGGFMfYUQ8-9hpotpxNhagSSdp7xD","1inPC5SKDpW5epcxa-fFgXp9C9jowISPO","1WDJrtj_A5gk6KfolOju3TzfyVUm5Gt40","1gDDPhlDVI5Fu-nBdUPsM964FiuHz0YoU","18hlxoUBDiBuV_nxiqfPffkmW5mGmxdZA","1g7WVBZC6EqVPjZGqwnyYpDU-ehayWqCf","1jdh-o3_3_4xJGQbumQ258HN0fuc9qkZo","19-H4R6pAVCbU-P9BvLInXkcY2OZ1bUzo","1aqEN_fGQfJOYP4T1EdZuRbc-UpXJPTNj","1TfPmZfUQ1VbIie-GPcG5eLoy1Uk9D5Xt","1w502s3qp0cnI4NEAyv9ybo-6qVhs5IT1","1NGoRC9vhfaTIjis1aW0k8LpaFZMzLCjA","12QvRB7HhShW19jXuhN3BF6OFmGQLg0kR","1pJ5hgS89OF5cBTWVM6kbm1E3cMt1hcrT","1ygWRDCDH-dr7sI8TKtjAZkQ23bCTaqoG","1u-3SZI9ymC7E18sROzUy3gSAAb45yqmW","1vo67fp6I8ZA3wOi9pTw6eUu3HJrvAfbB","1K0JWt7BnX1wDLZ7D7Db_cI5z-OazCANU","10vyUHH9txFfzy6gTUXFsx95hDzH1rNE1","13_b1RSIwud_d2LvFwTc337ls-MfEmXRX","109AXjs6FKNUVfBfcQySBW_sqOzkcbrjV","1WJu3rqnGe-aYs1FZymiGtV-SEP6W7i-m","1IWSDwW4uTrWlNWo14GfbHPn7Fq0g_nzL","1g800vKvxkKR_hUYKvv0-Gh1jNJrqnyaq","11Uy_p33yXsQiMW0qy7l1b1qWvzQXLOEe","1PeaR16EDy3xXTJDbPuP9GHJiX3F2Ubea","1firMVBvk_QAfMfQONWCbvr1oo0dtK53F","1RNSqAZ7kxJSQ3jwzRfreYejLGGeXCz2h","1r-JnbeHPGBO0Q9cceYh1bzSCLKBOJEN_","1TtkzWXQisd7UShIg46wdW6vmWYbpUjkk","1vj8zzSFy1H_c7fAGi_REfMR-R8IPwTfK","1Q_DJOcMXmZrR7P9szIw9LWQ5-dyRLO2y","1OQQQN87UMWlaTcPnzFf9zwRTxxIqRO5-","1Cw6AehAWgLFPCLedbh3LR1LMfCx2B4S3","10iZEj1UR_VCC0T2MLYhyT1hfO5zeoQFN","1pXnX_YraQ9SmZmttbcuaBJ6GfCbMxfL_","1ierJrCWZ0kiommCWoUzsVEFC2VoOKIRt","1zCjZp5fZ7ocwB33-bBCs93kaHJ0EOl5r"];

const PREMIUM_IDS = ["182kOjBhoaqOTq7nr4ryI6re6fRuLITbH","1cTfbTDJDqBjsV-r7V1OjBZ-Z6tUAqwxj","1cA-MfI55Hh7ibreMQ4zPvt2i_LKxVHkR","1fvtC5mT4slvV_kROIej7awAGmCRc7TUl","1rLVZUQ8lw6ilWM76xxARtbUreQ3JIkdi","15AQWI3wP2a57-3OxHZTCfSbskgvC5YvH","1ahoubjUVdc9SJyi5n2rzZIsbugjCjHiz","1qlwwRe2Mr_gb8CZjkeG0-YxBSGmOHzZu","1oOdGtYFTz-xNmSLUO-VFS1YODqYZ74HJ","1zBBLQOfuAaPXhyr6At3tJ5DlTZ_nXfLy","11GVK5OYU7bjf8YaHeNAAnAHPks3T1Jme","1Kat8i9M3usZX8iX2xUCcX08RVocX9kKB","1f327zMbxf9s_Z2WSYhA4cAIF_NBiveKW","1T_pxOh0mn36N882wUMyYSsXKoZE4w1XA","1OQqgPUW0j1C5Ggvh50oTnnw5VsgEQv5I","15FGsZ0xdZd7DYZb4awafD8ysH_8g-A9O","1KUI4gzdhT-1I_LpzCMCQL8Sgfy4dU_Im","1amD4c_CLTODq8nca3N_H40vPiYp53VTm","1j2a0DIwsKoXWomTJ9RuJm1RncFH3mbqg","1Cl0fyeCN4T4mUxt-mhEQe6z6ZzBXsQsK","1Tpq2cCmWEooN2SYUIEgq-elk6tRK_5tV","1wlnH6L9DQcYtHHRDtPmrLGz-u6bslOgl","1ZrP-OujlWQGLEln1u8YTa4e3kjQY0yzI","1U6HoCb65TnMZsfKmGQ9wujvvppKzD7HY","1pbevqRrVV2_aYSNSMF8q7jMqnDMGpAUn","1KTSwcHJmwu1XximtqvbgSnP4Zrskg8T_","1ZG7hoRZgcj5F_UMCidzJSI2yAYoiUAf6","1uMyZI2cVy_uABGNPNoe-pXul2pPPhC_U","1gITGc6TLsrSjYkdMhURcUUNQH1y1GFpc","1FTFe6klyuHyUBsOfLeN_QsZABlhF_I1U","1n9SD-SDFTJMuW-J_9g-Sg3Pi9u4Q8VqZ","1PiYBXyjmd0jMff_0j9miNPSKsH549oOJ","1emx-RKETN5UkoPSIM66I9V6z8g4O6eL0","1V9mGxsK3TFtLWGBnnfoQQ9tgnvmfOOKj","1zCSjLjQOnSeOechbnhxepJSKxbdE7MeI","1HarOxTDa8wdWYkAHdsYCUNp6-bdW-0aM","1zIdOBb-MSqAEHDPmc_cJluX8dtgx5fkk","1V1JnATj5BVIrnhdP7FleskNC0RElJ0NZ","1liH9X1gZehPc1nmNoPrBMysviH-_AC_0","1kS9lA4Rt0Ro1H4zWO_hNBzKPNvLkpb6G","1ML1TVAbIwOfV8g8V2jbFOnhupomDRuj5","15AnUgqE1IMBspLC7jCVveFXzNMVrvZUl","16pVMXGt2O5OW0GnEH0vK_J7beXJOVTFG","1x_Ykz9171lN4T5AJzBpbHlqvPyM-JuJ4","1qj1usLPAzfw8y74c-KKF6MfbE6F_txEJ","1oUNXIOVWfaYe_O1s0AZP7WZbz9PkJdER","1lKmVy2Xgs27j5IW6CzbzYYHzIPpPB7pF","10R18Piu79JTBPmWu7l1q_ht5yRddjZj_","1C3AXVh-mfTMtcAFhrL044TvwklDIKYNa","1fZQ7kc9OkcDLMntxUqUnUh-eVfGPqfIm","1Zb-AwPI5Ta8GaDX8T2QSMesenxFBEpNw","181vyiexE1YGUOav2BUEdLzWLn24qdvvm","1IUCMZwe292HN-OEcdnIbvWPuwGy6bgBG","1zyZ3QVHsOkTBADMm8jxJrk2ZIiiFE87F","1vtMWO4Ah45nvFExeMq82sfZc2JRsIiHc","1S0Oefe3t9iTNkhY_kjNojyHbb7uY4qHE","1rDFVMBfbrEt76kjiJLES3bnA_jmedsyI","119JxcFfIzDClqpTEC7ekWEMEPzH4_Hth","18roPGwQh8ImnrZ3ncIe8dt69JtUqrmwQ","147CRb0HLsfBA8aw9BNdO6dco7dQF6xNo","1oBnPqo8kAxNk4D3cgxlJAaZGqmP5F2Mb","1NVkZtKt1EHXcCA0c_latgAtBdckWGi6t","1EZIR0WmtoYLGcR-mUebaCHYYCL9NNykR","1zwQdkQRZVqXLvhRmHeuqNj3OtwFZ5xer","1p0cWNTy_cCV8_yrV3RuPp94stsaH8ZRm","1ntMdF0lJquZtJTYKc3t4WWGU-00DiYaM","1L1RhTUFgN2ziAWpKaRwlZipkjehPXnWZ","1jgARDI1JIjh_4qRUbvdpG1p0RBp4if7b","1TGZcnR1aYmln_E_UxgD_uInfREnRXf9T","1OKX94fxZ1BXqvDYY8SCQ22gR6Db2op2y","1J2_PY_Rk-x5ipzl_Ur5unrWCx2ZN7LvR","184YPeKcI8ilthW2VPvTcnJSTebj335-c","1-7lrprKPJQ-JuiNVi_bUdzHr_7S0NmNn","1ZAk92jKEyUhpO_faXYdbz5PPXkmo5YQN","1_9oor-2oJ4dHHOBkERAije6pvr8zAqPJ","1MX7rnQG2F0H8UX5ofGazO53knl7SUNE1","148EhK2GqvlP8Z-X-pK4Cp-Zb_sXqBLAu","1EuLjjvKMWIMkgbnK5PKOsKC5kHEG5H11"];

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

function scheduleFollowUps(senderId) {
  const state = getUserState(senderId);
  clearFollowUps(state);
  const intervals = [
    { time: 60*60*1000, msg: "Hi ভাইয়া/আপু! 😊 আপনার ওয়েডিং কার্ডের অর্ডারটি কি কনফার্ম করব? আমাদের স্টক সীমিত! 🛍️" },
    { time: 2*60*60*1000, msg: "কোনো ডিজাইন পছন্দ হয়েছে আপু/ভাইয়া? 💖 কাস্টমাইজেশন লাগলে জানাবেন! ✨" },
    { time: 6*60*60*1000, msg: "শুভ দিন! 🌸 আজই অর্ডার কনফার্ম করলে দ্রুত ডেলিভারি পাবেন! 🥰" },
    { time: 24*60*60*1000, msg: "আসসালামু আলাইকুম! 💌 যোগাযোগের জন্য ধন্যবাদ। কোনো হেল্প লাগলে জানাবেন! 🙏❤️" }
  ];
  intervals.forEach(step => {
    const timer = setTimeout(async () => {
      if (!getUserState(senderId).isSendingImages) await sendMainMenu(senderId, step.msg);
    }, step.time);
    state.followUpTimers.push(timer);
  });
}

async function sendTyping(recipientId) {
  try {
    await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient: { id: recipientId }, sender_action: "typing_on" })
    });
    await new Promise(r => setTimeout(r, 1500));
    await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient: { id: recipientId }, sender_action: "typing_off" })
    });
  } catch (e) { console.error('Typing error:', e); }
}

function detectTrigger(text) {
  if (!text) return null;
  const t = text.toLowerCase();
  if (["অর্ডার কনফার্ম","order confirm","কনফার্ম করলাম","নিব","নেব","অর্ডার করব","অর্ডার দিতে চাই","কনফার্ম","order krbo","order kivabe","এখনই অর্ডার করুন","sale"].some(w => t.includes(w))) return "sale";
  if (["দামী","অনেক দাম","রাখেন","নিব না","expensive","বেশি দাম","কম রাখেন","বাজেট নাই","ডিসকাউন্ট","ছাড় দেন"].some(w => t.includes(w))) return "price_objection";
  if (["stop_images","🙅"].some(w => t.includes(w))) return "stop_images";
  if (["continue_images","👍 হ্যাঁ"].some(w => t.includes(w))) return "continue_images";
  if (["affordable","অ্যাফোর্ডেবল","সাশ্রয়","কম দাম"].some(w => t.includes(w))) return "affordable";
  if (["premium","প্রিমিয়াম"].some(w => t.includes(w))) return "premium";
  if (["দাম","প্রাইস","price","কত টাকা","কত","অফার"].some(w => t.includes(w))) return "price";
  if (["ডেলিভারি","কারখানা","delivery","অফিস","ঠিকানা","পলিসি"].some(w => t.includes(w))) return "delivery";
  if (["বাংলা","bangla","বাংলা ফর্ম","🇧🇩","bangla_form"].some(w => t.includes(w))) return "bangla_form";
  if (["english","ইংরেজি","🇬🇧","english_form"].some(w => t.includes(w))) return "english_form";
  return null;
}

async function sendMsg(recipientId, text) {
  await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipient: { id: recipientId }, message: { text } })
  });
}

async function sendMainMenu(recipientId, mainText) {
  try {
    await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient: { id: recipientId }, message: { attachment: { type: "template", payload: { template_type: "button", text: mainText, buttons: [
        { type: "postback", title: "🌸 Affordable কার্ড", payload: "affordable" },
        { type: "postback", title: "✨ Premium কার্ড", payload: "premium" },
        { type: "postback", title: "💰 দাম ও অফার", payload: "price" }
      ] } } } })
    });
    await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient: { id: recipientId }, message: { attachment: { type: "template", payload: { template_type: "button", text: "👇 আরো অপশন:", buttons: [
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
    await new Promise(r => setTimeout(r, 900));
    if (!state.isSendingImages) { state.lastImageIndex = i + 1; return; }
  }
  state.isSendingImages = false;
  await sendMainMenu(senderId, "✨ সব ডিজাইন দেখানো শেষ! 🥰 কোনটি পছন্দ হয়েছে? অর্ডার কনফার্ম করব? 🛍️");
}

async function getGeminiReply(senderId, userMessage) {
  const state = getUserState(senderId);
  const contents = state.history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.content }] }));
  contents.push({ role: 'user', parts: [{ text: userMessage }] });
  const systemText =
    "তুমি BOONDHON Printing House-এর AI Sales Agent 'Brishti Apa'।\n" +
    "টোন: অত্যন্ত মিষ্টি, আন্তরিক ও সেলস ক্লোজিংমুখী। প্রচুর ইমোজি ব্যবহার করবে।\n" +
    "প্রাইস: ৫০পিস Affordable=২৭৫০, Premium=৩২৫০। ১০০পিস Affordable=৪৫০০, Premium=৫৫০০। ২০০পিস Affordable=৭০০০, Premium=৯০০০।\n" +
    "২০০+ পিসে FREE নিকাহনামা।\n" +
    "দাম আপত্তি: প্রথমবার quality বলো। ৩বার আপত্তিতে ৫ টাকা ডিসকাউন্ট।\n" +
    "২০ পিস সিক্রেট: জোর করলে বলবে ২০পিস=১৫০০ টাকা।\n" +
    "হটলাইন: 01701016826 (WhatsApp)।\n" +
    "কখনো AI বলবে না। বাংলায় কথা বলবে।\n" +
    "Customer যাই বলুক বুঝে reply দাও।";
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents, systemInstruction: { parts: [{ text: systemText }] }, generationConfig: { maxOutputTokens: 250, temperature: 0.7 } })
    });
    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'জি ভাইয়া/আপু! 🥰 কীভাবে সাহায্য করতে পারি?';
  } catch (err) {
    return 'জি প্রিয় ভাইয়া/আপু! 🥰 নিচের মেনু থেকে সিলেক্ট করুন। ✨';
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

    await sendTyping(senderId);
    const trigger = detectTrigger(userText);

    if (trigger) {
      state.isSendingImages = false;

      if (trigger === 'stop_images') {
        await sendMainMenu(senderId, "ঠিক আছে ভাইয়া/আপু! 🥰 অর্ডার ফাইনাল করব? 🛍️");
        scheduleFollowUps(senderId); continue;
      }
      if (trigger === 'continue_images') {
        await sendImagesStream(senderId, state.lastImageIndex); continue;
      }
      if (trigger === 'affordable') {
        state.imageType = 'affordable'; state.lastImageIndex = 0;
        await sendMsg(senderId, "🌸 Affordable কালেকশনের ডিজাইনগুলো পাঠানো হচ্ছে... 👇");
        await sendImagesStream(senderId, 0); continue;
      }
      if (trigger === 'premium') {
        state.imageType = 'premium'; state.lastImageIndex = 0;
        await sendMsg(senderId, "✨ Premium কালেকশনের ডিজাইনগুলো পাঠানো হচ্ছে... 👇");
        await sendImagesStream(senderId, 0); continue;
      }
      if (trigger === 'price') {
        await sendMainMenu(senderId,
          '💰 BOONDHON বিয়ের কার্ডের প্রাইস লিস্ট: 🌸\n\n' +
          '৫০ পিস: Premium=৩,২৫০৳ | Affordable=২,৭৫০৳\n' +
          '১০০ পিস: Premium=৫,৫০০৳ | Affordable=৪,৫০০৳\n' +
          '২০০ পিস: Premium=৯,০০০৳ | Affordable=৭,০০০৳\n\n' +
          '🎁 ২০০+ পিসে FREE নিকাহনামা! 🥰\n\n' +
          'কত পিস লাগবে? আজই অর্ডার করুন! ✨'
        );
        scheduleFollowUps(senderId); continue;
      }
      if (trigger === 'delivery') {
        await sendMainMenu(senderId,
          '🚚 ডেলিভারি ও পলিসি:\n\n' +
          '📍 অফিস: মানিকগঞ্জ\n' +
          '🏭 কারখানা: ফকিরাপুল, লালবাগকেল্লা, বাংলাবাজার, বাবুবাজার\n\n' +
          '📋 অর্ডারের নিয়ম:\n' +
          '১. মোট বিলের ৩০% অ্যাডভান্স\n' +
          '   বিকাশ/নগদ/রকেট: 01682588856\n' +
          '২. ডেমো ডিজাইন approve করার পর print\n' +
          '৩. জেলা শহরে ক্যাশ অন ডেলিভারি\n' +
          '৪. ৫-৭ কর্মদিবসে ডেলিভারি\n\n' +
          '⚠️ কারখানা থেকে নিলে আগে ঠিকানা নিশ্চিত করুন\n' +
          '📞 হটলাইন: 01701016826 (WhatsApp)\n' +
          '🗺️ https://maps.app.goo.gl/CnyRST5KxHjWDAtd9'
        );
        scheduleFollowUps(senderId); continue;
      }
      if (trigger === 'price_objection') {
        state.priceObjectionCount += 1;
        if (state.priceObjectionCount < 3 && !state.hasOfferedDiscount) {
          const reply = await getGeminiReply(senderId, userText);
          await sendMainMenu(senderId, reply);
        } else if (state.priceObjectionCount >= 3 && !state.hasOfferedDiscount) {
          state.hasOfferedDiscount = true;
          await sendMainMenu(senderId, '🌸 শুধুমাত্র আপনার জন্য স্পেশাল পারমিশন! 🥰\nপ্রতি পিসে ৫ টাকা ডিসকাউন্ট! 🥳\nএখনই অর্ডার করবেন? 🛍️');
        } else {
          await sendMainMenu(senderId, "আহারে! 😭 এর চেয়ে কম করলে আমাদের লস হবে। ধন্যবাদ! 🙏❤️");
        }
        scheduleFollowUps(senderId); continue;
      }
      if (trigger === 'sale') {
        try {
          await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipient: { id: senderId }, message: { attachment: { type: "template", payload: { template_type: "button",
              text: '🎉 অসাধারণ সিদ্ধান্ত ভাইয়া/আপু! 🌸\n\n📋 অর্ডারের নিয়ম:\n\n১. 💰 মোট বিলের ৩০% অ্যাডভান্স\n   বিকাশ/নগদ/রকেট: 01682588856\n\n২. 🎨 পেমেন্টের পর ডেমো ডিজাইন\n   approve করার পরই print শুরু\n\n৩. 🚚 ৫-৭ কর্মদিবসে ডেলিভারি\n   বাকি ৭০% ক্যাশ অন ডেলিভারি\n\n👇 কার্ডের ভাষা সিলেক্ট করুন:',
              buttons: [
                { type: "postback", title: "🇧🇩 বাংলায় ইনফো ফর্ম", payload: "bangla_form" },
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
          '📝 বিয়ের কার্ডের বাংলা ফর্ম: 🌸\n\n' +
          'বর-\nনামঃ\nপিতাঃ\nমাতাঃ\nঠিকানাঃ\n\n' +
          'কণে-\nনামঃ\nপিতাঃ\nমাতাঃ\nঠিকানাঃ\n\n' +
          'গায়ে হলুদ-\nতারিখ (ইংরেজি):\nতারিখ (বাংলা):\nরোজঃ\nসময়ঃ\nস্থানঃ\n\n' +
          'শুভ বিবাহ-\nতারিখ (ইংরেজি):\nতারিখ (বাংলা):\nরোজঃ\nলগ্ন (শুধু হিন্দুদের):\nবরযাত্রা/সময়ঃ\nস্থানঃ\n\n' +
          'বৌ-ভাত-\nতারিখ (ইংরেজি):\nতারিখ (বাংলা):\nরোজঃ\nসময়ঃ\nস্থানঃ\n\n' +
          'অভ্যর্থনায়-\n(ছোট বাচ্চাদের নাম):\n\n' +
          'প্রয়োজনে (ফোন):\nশুভেচ্ছান্তে নামঃ\n\n' +
          '-------\n' +
          'বর ও কণে পিতামাতার কততম সন্তান?\n' +
          'কার্ডটি ছেলের পক্ষ নাকি মেয়ের পক্ষ?\n\n' +
          '🚚 কুরিয়ার ইনফো (নাম, মোবাইল, ঠিকানা):\n\n' +
          'ফর্মটি কপি করে পূরণ করে পাঠান! 🥰'
        );
        scheduleFollowUps(senderId); continue;
      }
      if (trigger === 'english_form') {
        await sendMsg(senderId,
          '📝 Wedding Card English Form: ✨\n\n' +
          'Groom Name:\nFather Name:\nMother Name:\n\n' +
          'Bride Name:\nFather Name:\nMother Name:\n\n' +
          'Holud Sandya\nDay:\nDate:\nTime:\nVenue:\nAddress:\n\n' +
          'Wedding\nDay:\nDate:\nTime:\nVenue:\nAddress:\n\n' +
          'Reception\nDay:\nDate:\nTime:\nVenue:\nAddress:\n\n' +
          'With Best Regard - Name:\nRSVP Number:\n\n' +
          '🚚 Courier Info (Name, Mobile, Address):\n\n' +
          'Copy, fill up and send back! 🥰'
        );
        scheduleFollowUps(senderId); continue;
      }
    }

    if (state.isSendingImages) {
      state.isSendingImages = false;
      const aiReply = await getGeminiReply(senderId, userText);
      try {
        await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ recipient: { id: senderId }, message: { attachment: { type: "template", payload: { template_type: "button",
            text: `${aiReply}\n\n💖 বাকি ডিজাইনগুলো দেখবেন?`,
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
  } else { res.sendStatus(403); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('🚀 BOONDHON Bot Active!'));
