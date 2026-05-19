require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "BOONDHON_SECRET_2026";
const PAGE_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyCVEkrtXT9hkllGpbyGIekH8TLgzFJvZ_I";

// ড্রাইভ ইমেজ আইডি সমূহ
const AFFORDABLE_IDS = ["1J9_qfkIdIWL5Sc9O8EokvYlGfQWrf5TD","1cOCFSa1ap-Z54Ldf2AuoUKlEaQ5Ccql-","1dbYH2L4QykEUhYXGQPzQZObEuHFdwKsT","1HJTtR-zhhg6v2ph7MikdMDWI-LWJgG0z","1PRlMp4F1xnQJPURON535pl7t08_thXVA","1UEAeYYB3Bt5vMYEL-a7AcV1aV21Z04si","1-_qTV4gq0oKMdfMRxlTZL3yUO98ZGAoi","15yHXRk2mHI6-cKeooRqT20XeHubRRrPN","1Yrcqj5g0sZDrL3QaEkfEmKnF12BEs6ir","1vXwJ68j7x5qfpZdHkMkqLn0tvpblGDpl","1GWw91oefwyYr9sHSQXjePTSX-KwPjy7I","1_tnTz7HWDf4CVJHORPlani7pjEcLdm7X","1OMy_r94N_iUqvPW1t5fAGa4Sv3C_MIqF","1rXCxMziCgTImURvkahNp-AvneVljg-CW","1k_hzTbXOxxJg9rJ2OW-tnIkzLNYUqkOf","1bgYpcqh4pVLDy8yfwrS40X5ejtCFxmFv","1tLW7C2gwOmlZzGXh3bw0o7xjAPKrudIA","1ZEGHQfvuKNv-J5ZZadHKGfVAe4cvQnGq","1WE3kfWsd-0nrptiQ0fWi3dsd4iEcdw3t","1kLilyZRrhgrRfHn4aiTEcUBOu5fNDegs","1Cf7jQxeb5pyXvnA6HzGg_dYk3ZBrJ9z5","11UIRwmetqLkMU5qThwv5Vc7GnuASrZSa","1eXUGJyYhnNBXZ7PFwDgXgY-ql8cYADsh","1weNuPU3fBvPMkbFAGPiMm_ttEETSuQ9A","1PyKeX16mmVGaqKuZCujRskmip1LyGEgo","1luY2hOgpjUjXr_lGJbCQTumxKZFZrmJ4","1XanrmX4aOoDmjxha6lr5bYzlkZHglsTZ","1BBFuVKgKRUJV2pubIWiXgZlT3582Vcup","1wvf3jJjpV1sPuiO_Vj509y0UJABxbnuB","1TkCMzyPmSk9m2bIrRUInOm6epp2TQnV1","1H5lEN0baeoMMWL693BIXVYjrtZVipooO","14UHCDYmLowJbPfS-7Ve2Nx-tKno1MJU0","1CsDarakKEaGyVe8JqT05Mff988RztJX","1IDHV2uPD4AHjhsk75GJSETp9qQdpqPB4","1VGLRJbDyatJqfX0VEr3yGkRJMI23yRiL","1v1Fb2d2CP-v4N7Z2qVIqywIyph673I5Y","1X5yEsU9S8oYeFMEc8bjEm4XecbrR6fWA","1BkNP_edXf6c3wIP5lALPG2sjSp1C3z","1qKDy730IKVUH3e7U3zgUK863ekoYNGVS","1OVG52rNA1Ud-pG6gA-RtyRZkhE85tgkK","1nKQgpTV5txr5SO-6MYL4wnMskhLvkJJn","1lmdXd0R5pgyJqXhgGwYzzerX4NXPpOyZ","1cDyh8T6RQ7cOMY_js8TxQYrDO8BPy4cS","1eBePCdCDIMMvu6rZd-feOqvI8jPX44PU","1EOVX2gwvUotLFdfO5gO0Px8MaJwon9dY","1yA0KGGFMfYUQ8-9hpotpxNhagSSdp7xD","1inPC5SKDpW5epcxa-fFgXp9C9jowISPO","1WDJrtj_A5gk6KfolOju3TzfyVUm5Gt40","1gDDPhlDVI5Fu-nBdUPsM964FiuHz0YoU","18hlxoUBDiBuV_nxiqfPffkmW5mGmxdZA","1g7WVBZC6EqVPjZGqwnyYpDU-ehayWqCf","1jdh-o3_3_4xJGQbumQ258HN0fuc9qkZo","19-H4R6pAVCbU-P9BvLInXkcY2OZ1bUzo","1aqEN_fGQfJOYP4T1EdZuRbc-UpXJPTNj","1TfPmZfUQ1VbIie-GPcG5eLoy1Uk9D5Xt","1w502s3qp0cnI4NEAyv9ybo-6qVhs5IT1","1NGoRC9vhfaTIjis1aW0k8LpaFZMzLCjA","12QvRB7HhShW19jXuhN3BF6OFmGQLg0kR","1pJ5hgS89OF5cBTWVM6kbm1E3cMt1hcrT","1ygWRDCDH-dr7sI8TKtjAZkQ23bCTaqoG","1u-3SZI9ymC7E18sROzUy3gSAAb45yqmW","1vo67fp6I8ZA3wOi9Tw6eUu3HJrvAfbB","1K0JWt7BnX1wDLZ7D7Db_cI5z-OazCANU","10vyUHH9txFfzy6gTUXFsx95hDzH1rNE1","13_b1RSIwud_d2LvFwTc337ls-MfEmXRX","109AXjs6FKNUVfBfcQySBW_sqOzkcbrjV","1WJu3rqnGe-aYs1FZymiGtV-SEP6W7i-m","1IWSDwW4uTrWlNWo14GfbHPn7Fq0g_nzL","1g800vKvxkKR_hUYKvv0-Gh1jNJrqnyaq","11Uy_p33yXsQiMW0qy7l1b1qWvzQXLOEe","1PeaR16EDy3xXTJDbPuP9GHJiX3F2Ubea","1firMVBvk_QAfMfQONWCbvr1oo0dtK53F","1RNSqAZ7kxJSQ3jwzRfreYejLGGeXCz2h","1r-JnbeHPGBO0Q9cceYh1bzSCLKBOJEN_","1TtkzWXQisd7UShIg46wdW6vmWYbpUjkk","1vj8zzSFy1H_c7fAGi_REfMR-R8IPwTfK","1Q_DJOcMXmZrR7P9szIw9LWQ5-dyRLO2y","1OQQQN87UMWlaTcPnzFf9zwRTxxIqRO5-","1Cw6AehAWgLFPCLedbh3LR1LMfCx2B4S3","10iZEj1UR_VCC0T2MLYhyT1hfO5zeoQFN","1pXnX_YraQ9SmZmttbcuaBJ6GfCbMxfL_","1ierJrCWZ0kiommCWoUzsVEFC2VoOKIRt","1zCjZp5fZ7ocwB33-bBCs93kaHJ0EOl5r"];
const PREMIUM_IDS = ["182kOjBhoaqOTq7nr4ryI6re6fRuLITbH","1cTfbTDJDqBjsV-r7V1OjBZ-Z6tUAqwxj","1cA-MfI55Hh7ibreMQ4zPvt2i_LKxVHkR","1fvtC5mT4slvV_kROIej7awAGmCRc7TUl","1rLVZUQ8lw6ilWM76xxARtbUreQ3JIkdi","15AQWI3wP2a57-3OxHZTCfSbskgvC5YvH","1ahoubjUVdc9SJyi5n2rzZIsbugjCjHiz","1qlwwRe2Mr_gb8CZjkeG0-YxBSGmOHzZu","1oOdGtYFTz-xNmSLUO-VFS1YODqYZ74HJ","1zBBLQOfuAaPXhyr6At3tJ5DlTZ_nXfLy","11GVK5OYU7bjf8YaHeNAAnAHPks3T1Jme","1Kat8i9M3usZX8iX2xUCcX08RVocX9kKB","1f327zMbxf9s_Z2WSYhA4cAIF_NBiveKW","1T_pxOh0mn36N882wUMyYSsXKoZE4w1XA","1OQqgPUW0j1C5Ggvh50oTnnw5VsgEQv5I","15FGsZ0xdZd7DYZb4awafD8ysH_8g-A9O","1KUI4gzdhT-1I_LpzCMCQL8Sgfy4dU_Im","1amD4c_CLTODq8nca3N_H40vPiYp53VTm","1j2a0DIwsKoXWomTJ9RuJm1RncFH3mbqg","1Cl0fyeCN4T4mUxt-mhEQe6z6ZzBXsQsK","1Tpq2cCmWEooN2SYUIEgq-elk6tRK_5tV","1wlnH6L9DQcYtHHRDtPmrLGz-u6bslOgl","1ZrP-OujlWQGLEln1u8YTa4e3kjQY0yzI","1U6HoCb65TnMZsfKmGQ9wujvvppKzD7HY","1pbevqRrVV2_aYSNSMF8q7jMqnDMGpAUn","1KTSwcHJmwu1XximtqvbgSnP4Zrskg8T_","1ZG7hoRZgcj5F_UMCidzJSI2yAYoiUAf6","1uMyZI2cVy_uABGNPNoe-pXul2pPPhC_U","1gITGc6TLsrSjYkdMhURcUUNQH1y1GFpc","1FTFe6klyuHyUBsOfLeN_QsZABlhF_I1U","1n9SD-SDFTJMuW-J_9g-Sg3Pi9u4Q8VqZ","1PiYBXyjmd0jMff_0j9miNPSKsH549oOJ","1emx-RKETN5UkoPSIM66I9V6z8g4O6eL0","1V9mGxsK3TFtLWGBnnfoQQ9tgnvmfOOKj","1zCSjLjQOnSeOechbnhxepJSKxbdE7MeI","1HarOxTDa8wdWYkAHdsYCUNp6-bdW-0aM","1zIdOBb-MSqAEHDPmc_cJluX8dtgx5fkk","1V1JnATj5BVIrnhdP7FleskNC0RElJ0NZ","1liH9X1gZehPc1nmNoPrBMysviH-_AC_0","1kS9lA4Rt0Ro1H4zWO_hNBzKPNvLkpb6G","1ML1TVAbIwOfV8g8V2jbFOnhupomDRuj5","15AnUgqE1IMBspLC7jCVveFXzNMVrvZUl","16pVMXGt2O5OW0GnEH0vK_J7beXJOVTFG","1x_Ykz9171lN4T5AJzBpbHlqvPyM-JuJ4","1qj1usLPAzfw8y74c-KKF6MfbE6F_txEJ","1oUNXIOVWfaYe_O1s0AZP7WZbz9PkJdER","1lKmVy2Xgs27j5IW6CzbzYYHzIPpPB7pF","10R18Piu79JTBPmWu7l1q_ht5yRddjZj_","1C3AXVh-mfTMtcAFhrL044TvwklDIKYNa","1fZQ7kc9OkcDLMntUqUnUh-eVfGPqfIm","1Zb-AwPI5Ta8GaDX8T2QSMesenxFBEpNw","181vyiexE1YGUOav2BUEdLzWLn24qdvvm","1IUCMZwe292HN-OEcdnIbvWPuwGy6bgBG","1zyZ3QVHsOkTBADMm8jxJrk2ZIiiFE87F","1vtMWO4Ah45nvFExeMq82sfZc2JRsIiHc","1S0Oefe3t9iTNkhY_kjNojyHbb7uY4qHE","1rDFVMBfbrEt76kjiJLES3bnA_jmedsyI","119JxcFfIzDClqpTEC7ekWEMEPzH4_Hth","18roPGwQh8ImnrZ3ncIe8dt69JtUqrmwQ","147CRb0HLsfBA8aw9BNdO6dco7dQF6xNo","1oBnPqo8kAxNk4D3cgxlJAaZGqmP5F2Mb","1NVkZtKt1EHXcCA0c_latgAtBdckWGi6t","1EZIR0WmtoYLGcR-mUebaCHYYCL9NNykR","1zwQdkQRZVqXLvhRmHeuqNj3OtwFZ5xer","1p0cWNTy_cCV8_yrV3RuPp94stsaH8ZRm","1ntMdF0lJquZtJTYKc3t4WWGU-00DiYaM","1L1RhTUFgN2ziAWpKaRwlZipkjehPXnWZ","1jgARDI1JIjh_4qRUbvdpG1p0RBp4if7b","1TGZcnR1aYmln_E_UxgD_uInfREnRXf9T","1OKX94fxZ1BXqvDYY8SCQ22gR6Db2op2y","1J2_PY_Rk-x5ipzl_Ur5unrWCx2ZN7LvR","184YPeKcI8ilthW2VPvTcnJSTebj335-c","1-7lrprKPJQ-JuiNVi_bUdzHr_7S0NmNn","1ZAk92jKEyUhpO_faXYdbz5PPXkmo5YQN","1_9oor-2oJ4dHHOBkERAije6pvr8zAqPJ","1MX7rnQG2F0H8UX5ofGazO53knl7SUNE1","148EhK2GqvlP8Z-X-pK4Cp-Zb_sXqBLAu","1EuLjjvKMWIMkgbnK5PKOsKC5kG5H11"];

function driveUrl(id) {
  return `http://googleusercontent.com/profile/picture/${id}`;
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
    { time: 45*60*1000, msg: "Hi ভাইয়া/আপু! 😊 কোনো ডিজাইন পছন্দ হয়েছে কি? কাস্টমাইজেশন লাগলে জানাবেন! ✨" },
    { time: 3*60*60*1000, msg: "আমাদের বিয়ের কার্ডের স্টক কিন্তু সীমিত 💖 আজই অর্ডার কনফার্ম করলে দ্রুত ডেমো ডিজাইন পেয়ে যাবেন! 🥰" }
  ];
  intervals.forEach(step => {
    const timer = setTimeout(async () => {
      if (!getUserState(senderId).isSendingImages) await sendMsg(senderId, step.msg);
    }, step.time);
    state.followUpTimers.push(timer);
  });
}

async function sendTyping(recipientId, action = "typing_on") {
  try {
    await axios.post(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`, {
      recipient: { id: recipientId }, sender_action: action
    });
  } catch (e) { console.error('Typing error:', e.message); }
}

// 🎯 স্ট্রং ইন্টেন্ট ডিটেকশন (শুধু আসলেই বাটন চাইলে বাটন ট্রিগার হবে)
function detectTrigger(text) {
  if (!text) return null;
  const t = text.toLowerCase().trim();
  if (["bdfill","enfill","bangla_form","english_form"].some(w => t === w)) return t; 
  if (["ডিজাইন দেখাও","কালেকশন দেখাও","কার্ড দেখাও","design dekhaw","card dekhaw"].some(w => t.includes(w))) {
    return t.includes("premium") || t.includes("দামী") ? "premium" : "affordable";
  }
  if (["affordable","অ্যাফোর্ডেবল","সাশ্রয়","কম দামের"].some(w => t === "affordable" || t.includes(w))) return "affordable";
  if (["premium","প্রিমিয়াম"].some(w => t === "premium" || t.includes(w))) return "premium";
  if (["দাম কত","প্রাইস লিস্ট","কত টাকা","price list","দাম ও অফার"].some(w => t.includes(w))) return "price";
  if (["ডেলিভারি","কারখানা","delivery","ঠিকানা","পলিসি"].some(w => t.includes(w))) return "delivery";
  if (["অর্ডার করব","অর্ডার দিতে চাই","এখনই অর্ডার করুন","sale","order confirm"].some(w => t.includes(w))) return "sale";
  if (["দামী","অনেক দাম","expensive","বেশি দাম","ডিসকাউন্ট","ছাড়"].some(w => t.includes(w))) return "price_objection";
  if (["stop_images","না আর লাগবে না"].some(w => t.includes(w))) return "stop_images";
  if (["continue_images","বাকিগুলো দাও"].some(w => t.includes(w))) return "continue_images";
  return null;
}

async function sendMsg(recipientId, text) {
  await sendTyping(recipientId, "typing_on");
  await new Promise(r => setTimeout(r, 1000));
  await sendTyping(recipientId, "typing_off");
  try {
    await axios.post(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`, {
      recipient: { id: recipientId }, message: { text }
    });
  } catch (e) { console.error('sendMsg Error:', e.message); }
}

async function sendImagesStream(senderId, startIndex = 0) {
  const state = getUserState(senderId);
  const ids = state.imageType === 'premium' ? PREMIUM_IDS : AFFORDABLE_IDS;
  state.isSendingImages = true;
  for (let i = startIndex; i < Math.min(startIndex + 5, ids.length); i++) {
    if (!state.isSendingImages) { state.lastImageIndex = i; return; }
    try {
      await axios.post(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`, {
        recipient: { id: senderId }, message: { attachment: { type: 'image', payload: { url: driveUrl(ids[i]), is_reusable: true } } }
      });
    } catch (e) { console.error('Image push error:', e.message); }
    await new Promise(r => setTimeout(r, 1200));
  }
  state.lastImageIndex = startIndex + 5;
  if (state.lastImageIndex < ids.length) {
    try {
      await axios.post(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`, {
        recipient: { id: senderId }, message: { attachment: { type: "template", payload: { template_type: "button",
          text: "🌸 আরও কিছু চমৎকার ডিজাইন দেখতে চান ভাইয়া/আপু?",
          buttons: [
            { type: "postback", title: "👍 হ্যাঁ, বাকিগুলো দাও", payload: "continue_images" },
            { type: "postback", title: "🙅 না, আর লাগবে না", payload: "stop_images" }
          ]
        } } }
      });
    } catch (e) { console.error(e.message); }
  } else {
    state.isSendingImages = false;
    await sendMsg(senderId, "✨ আমাদের সব ডিজাইন দেখানো শেষ ভাইয়া/আপু! কোনটি আপনার মনের মতো লেগেছে জানাবেন কিন্তু! 🥰");
  }
}

// 🧠 এডভান্সড জেমিনি ইঞ্জিন (কনভার্সেশনাল ট্রাস্ট বিল্ডার + ভিশন রীডার)
async function getGeminiReply(senderId, userMessage, imageBuffer = null) {
  const state = getUserState(senderId);
  
  const systemText =
    "তুমি BOONDHON Printing House-এর এক্সপার্ট প্রফেশনাল এবং অত্যন্ত অমায়িক ও মিষ্টিভাষী সেলস রিপ্রেজেন্টেটিভ 'বৃষ্টি আপু'।\n" +
    "তোমার মূল লক্ষ্য: কাস্টমারের সাথে আগে আস্থার সম্পর্ক তৈরি করা। ফালতু বাটন বা ফর্ম ছুঁড়ে মারবে না।\n" +
    "কাস্টমার কোনো ছবি বা স্ক্রিনশট পাঠালে গভীর মনোযোগ দিয়ে দেখবে। যদি সেটি বিয়ের কার্ডের স্ক্রিনশট হয়, তবে বিনয়ের সাথে চিনে দাম এবং কোয়ালিটি নিয়ে কথা বলবে।\n" +
    "প্রাইস লিস্ট:\n" +
    "- Affordable কালেকশন: ৫০ পিস = ২৭৫০৳ | ১০০ পিস = ৪৫০০৳ | ২০০ পিস = ৭০০০৳\n" +
    "- Premium কালেকশন: ৫০ পিস = ৩২৫০৳ | ১০০ পিস = ৫৫০০৳ | ২০০ পিস = ৯০০০৳\n" +
    "উপহার: ২০০+ পিস কার্ড অর্ডার করলে একটি রাজকীয় 'নিকাহনামা' সম্পূর্ণ ফ্রি।\n\n" +
    "অর্ডার প্রসেস গাইডলাইন (ট্রাস্ট জেতার জন্য গুরুত্বপূর্ণ):\n" +
    "১. কাস্টমারকে বুঝাবে যে আগে ফুল পেমেন্ট করতে হবে না। মাত্র ৩০% অ্যাডভান্স করে অর্ডার কনফার্ম করতে হয়।\n" +
    "২. অ্যাডভান্স পাওয়ার পর আমাদের প্রফেশনাল ডিজাইনার কাস্টমারের দেওয়া বর-কনের নাম, বিয়ের তারিখ দিয়ে একটি 'ডিজিটাল ডেমো ডিজাইন' তৈরি করে ইনবক্সে দেখাবে।\n" +
    "৩. কাস্টমার ডেমো দেখে বানান এবং ডিজাইন ১০০% চেক করে 'অ্যাপ্রুভ' বা ওকে করার পরেই কেবল ফাইনাল প্রিন্ট হবে। এর আগে ভুল হওয়ার কোনো সুযোগ নেই।\n" +
    "৪. প্রিন্ট শেষ হলে ৫-৭ কর্মদিবসে জেলা শহরগুলোতে ক্যাশ অন ডেলিভারিতে কুরিয়ার করা হবে (বাকি ৭০% টাকা ডেলিভারি নেওয়ার সময় দেবে)।\n\n" +
    "টোন: কোনো কৃত্রিম রোবোটিক ভাব রাখা যাবে না। মানুষের মতো মিষ্টি করে ইমোজি দিয়ে গুছিয়ে বাংলায় চ্যাট করবে।";

  try {
    let payload = {
      systemInstruction: { parts: [{ text: systemText }] },
      generationConfig: { maxOutputTokens: 350, temperature: 0.6 }
    };

    if (imageBuffer) {
      payload.contents = [{
        role: "user",
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: imageBuffer.toString("base64") } },
          { text: userMessage || "এই ইমেজটি দেখ এবং কাস্টমারকে রেসপন্স করো।" }
        ]
      }];
    } else {
      const contents = state.history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.content }] }));
      contents.push({ role: 'user', parts: [{ text: userMessage }] });
      payload.contents = contents;
    }

    const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, payload);
    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'জি ভাইয়া/আপু! 🥰 আমি আছি আপনার সাথে। কীভাবে সাহায্য করতে পারি বলুন?';
  } catch (err) {
    console.error('Gemini error:', err.message);
    return 'জি প্রিয় ভাইয়া/আপু! 🥰 আপনার বিয়ের কার্ডের যেকোনো সুন্দর আইডিয়া বা প্রশ্ন আমার সাথে শেয়ার করতে পারেন।';
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
    let imageBuffer = null;

    // কাস্টমার কোনো ইমেজ/স্ক্রিনশট পাঠিয়েছে কিনা চেক
    if (event.message?.attachments) {
      const imgAttachment = event.message.attachments.find(att => att.type === 'image');
      if (imgAttachment?.payload?.url) {
        try {
          const imgRes = await axios.get(imgAttachment.payload.url, { responseType: 'arraybuffer' });
          imageBuffer = Buffer.from(imgRes.data, 'binary');
          userText = event.message?.text || "এই কার্ডের দাম কত বা এটা কোন ক্যাটাগরির?";
        } catch (e) { console.error('Image download error:', e.message); }
      }
    }

    if (!userText && event.message?.text) userText = event.message.text;
    if (!userText && event.postback?.payload) userText = event.postback.payload;
    if (!userText) continue;

    // যদি ইমেজ থাকে, সরাসরি প্রফেশনাল ভিশন দিয়ে রিপ্লাই করবে, কোনো অটোমেটিক বাটন ছুঁড়বে না
    if (imageBuffer) {
      const aiImageReply = await getGeminiReply(senderId, userText, imageBuffer);
      await sendMsg(senderId, aiImageReply);
      scheduleFollowUps(senderId);
      continue;
    }

    const trigger = detectTrigger(userText);

    if (trigger) {
      if (trigger === 'stop_images') {
        state.isSendingImages = false;
        const aiReply = await getGeminiReply(senderId, userText);
        await sendMsg(senderId, aiReply);
        scheduleFollowUps(senderId); continue;
      }
      if (trigger === 'continue_images') {
        await sendImagesStream(senderId, state.lastImageIndex); continue;
      }
      if (trigger === 'affordable') {
        state.imageType = 'affordable'; state.lastImageIndex = 0;
        await sendImagesStream(senderId, 0); continue;
      }
      if (trigger === 'premium') {
        state.imageType = 'premium'; state.lastImageIndex = 0;
        await sendImagesStream(senderId, 0); continue;
      }
      if (trigger === 'price') {
        const aiReply = await getGeminiReply(senderId, userText);
        await sendMsg(senderId, aiReply);
        scheduleFollowUps(senderId); continue;
      }
      if (trigger === 'delivery') {
        const aiReply = await getGeminiReply(senderId, userText);
        await sendMsg(senderId, aiReply);
        scheduleFollowUps(senderId); continue;
      }
      if (trigger === 'price_objection') {
        state.priceObjectionCount += 1;
        const reply = await getGeminiReply(senderId, userText);
        if (state.priceObjectionCount >= 3 && !state.hasOfferedDiscount) {
          state.hasOfferedDiscount = true;
          await sendMsg(senderId, '🌸 শুধুমাত্র আপনার স্পেশাল রিকোয়েস্টে প্রতি পিসে ৫ টাকা ছাড়ের ব্যবস্থা করে দিতে পারব ভাইয়া/আপু! 🥰 অর্ডারটি কি তাহলে প্রসেস করব?');
        } else {
          await sendMsg(senderId, reply);
        }
        scheduleFollowUps(senderId); continue;
      }
      
      // 🛠️ "এখনই অর্ডার করুন" এর নিখুঁত ও ট্রাস্টেড গাইডেন্স সিস্টেম
      if (trigger === 'sale') {
        state.isSendingImages = false;
        const aiReply = await getGeminiReply(senderId, "আমি অর্ডার প্রসেস এবং কাস্টমাইজেশন সম্পর্কে জানতে চাই ও অর্ডার করতে চাই।");
        
        try {
          await axios.post(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`, {
            recipient: { id: senderId }, message: { attachment: { type: "template", payload: { template_type: "button",
              text: `${aiReply}\n\n👇 আপনার কার্ডের প্রিন্টিং এর ভাষা সিলেক্ট করুন:`,
              buttons: [
                { type: "postback", title: "🇧🇩 বাংলায় তথ্য ফরম", payload: "bangla_form" },
                { type: "postback", title: "🇬🇧 English Info Form", payload: "english_form" }
              ]
            } } }
          });
          scheduleFollowUps(senderId);
        } catch (e) { console.error(e.message); }
        continue;
      }
      
      if (trigger === 'bangla_form') {
        await sendMsg(senderId, "নিচের ফর্মটি সম্পূর্ণ কপি (Copy) করে খালি ঘরগুলো আপনার বিয়ের সঠিক তথ্য দিয়ে পূরণ করে আমাদের পাঠিয়ে দিন ভাইয়া/আপু! 🥰👇");
        await sendMsg(senderId,
          '📝 *বিয়নের কার্ডের বাংলা ফর্ম:* 🌸\n\n' +
          'বর-\nনামঃ\nপিতাঃ\nমাতাঃ\nঠিকানাঃ\n\n' +
          'কণে-\nনামঃ\nপিতাঃ\nমাতাঃ\nঠিকানাঃ\n\n' +
          'গায়ে হলুদ-\nতারিখ (ইংরেজি):\nতারিখ (বাংলা):\nরোজঃ\nসময়ঃ\nস্থানঃ\n\n' +
          'শুভ বিবাহ-\nতারিখ (ইংরেজি):\nতারিখ (বাংলা):\nরোজঃ\nসময়ঃ\nস্থানঃ\n\n' +
          'বৌ-ভাত-\nতারিখ (ইংরেজি):\nতারিখ (বাংলা):\nরোজঃ\nসময়ঃ\nস্থানঃ\n\n' +
          'প্রয়োজনে (মোবাইল নম্বর):\nশুভেচ্ছান্তে নামঃ\n\n' +
          '-------\n' +
          'কার্ডটি কি ছেলের পক্ষ নাকি মেয়ের পক্ষ?:\n' +
          'মোট কত পিস কার্ড প্রিন্ট হবে?:\n\n' +
          '🚚 ডেলিভারি ঠিকানা (নাম, মোবাইল, জেলা):'
        );
        scheduleFollowUps(senderId); continue;
      }
      if (trigger === 'english_form') {
        await sendMsg(senderId, "Please copy the form below, fill it out with your wedding details, and send it back to us! 🥰👇");
        await sendMsg(senderId,
          '📝 *Wedding Card English Form:* ✨\n\n' +
          'Groom Name:\nFather:\nMother:\n\n' +
          'Bride Name:\nFather:\nMother:\n\n' +
          'Holud Sandya (Date & Venue):\n\n' +
          'Wedding (Date & Venue):\n\n' +
          'Reception (Date & Venue):\n\n' +
          'Best Regards / RSVP Name & Number:\n\n' +
          'Total Quantity Needed:\n' +
          'Card Side (Groom or Bride side?):\n\n' +
          '🚚 Shipping Details (Name, Phone, Address):'
        );
        scheduleFollowUps(senderId); continue;
      }
    }

    // সাধারণ কথাবার্তায় নো বাটন—অনলি রিয়েল হিউম্যান-লাইক চ্যাট
    const aiReply = await getGeminiReply(senderId, userText);
    state.history.push({ role: 'user', content: userText });
    state.history.push({ role: 'model', content: aiReply });
    while (state.history.length > 10) state.history.shift();
    
    // ফর্ম সাবমিট অ্যালার্ট সিস্টেম
    if (userText.includes('নামঃ') || userText.includes('Groom Name:')) {
      const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
      const telegramChatId = process.env.TELEGRAM_CHAT_ID;
      if (telegramBotToken && telegramChatId) {
        try {
          const alertMessage = `🚨 *নতুন অর্ডার ফর্ম সাবমিট হয়েছে!* \n\n👤 *কাস্টমার আইডি:* ${senderId}\n\n📝 *তথ্যসমূহ:* \n${userText}`;
          await axios.post(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
            chat_id: telegramChatId, text: alertMessage
          });
        } catch (err) { console.error('Telegram Error:', err.message); }
      }
      await sendMsg(senderId, "🎉 আলহামদুলিল্লাহ ভাইয়া/আপু! আপনার বিয়ের কার্ডের প্রয়োজনীয় ইনফো সফলভাবে আমাদের কাছে জমা হয়েছে। আমাদের প্রফেশনাল ডিজাইনার টিম দ্রুত আপনার তথ্যের ওপর ভিত্তি করে একটি দারুণ ডেমো ডিজাইন তৈরি করে আপনাকে ইনবক্সে দেখাবে। অসংখ্য ধন্যবাদ! 🌸");
      continue;
    }

    await sendMsg(senderId, aiReply);
    scheduleFollowUps(senderId);
  }
});

app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === VERIFY_TOKEN) {
    res.status(200).send(req.query['hub.challenge']);
  } else { res.sendStatus(403); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('🚀 BOONDHON Expert AI Engine is Live & Trust-Optimized!'));
