require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "BOONDHON_SECRET_2025";
const PAGE_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// ── Image IDs ──────────────────────────────────────────────
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
  "148EhK2GqvlP8Z-X-pK4Cp-Zb_sXqBLAu","1EuLjjvKIMWIMkgbnK5PKOsKC5kHEG5H11"
];

// ── Helpers ────────────────────────────────────────────────
function randomId(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function driveUrl(id) {
  return `https://drive.google.com/uc?export=view&id=${id}`;
}

// ── Conversation memory ────────────────────────────────────
const conversations = {};

function getHistory(senderId) {
  if (!conversations[senderId]) conversations[senderId] = [];
  return conversations[senderId];
}
function addToHistory(senderId, role, content) {
  const hist = getHistory(senderId);
  hist.push({ role, content });
  if (hist.length > 14) hist.shift();
}

// ── Trigger detection ──────────────────────────────────────
function detectTrigger(text) {
  const t = text.toLowerCase();
  const affordable = ["affordable", "অ্যাফোর্ডেবল", "সাশ্রয়", "কম দাম", "affordable card", "affodable", "এফোর্ডেবল"];
  const premium = ["premium", "প্রিমিয়াম", "premium card", "প্রিমিয়াম কার্ড"];
  const sale = [
    "অর্ডার কনফার্ম", "order confirm", "কনফার্ম করলাম", "নিব", "নেব",
    "advance দেব", "bkash দেব", "বিকাশ দেব", "অর্ডার দিতে চাই",
    "order দিতে চাই", "confirm করলাম", "কনফার্ম", "অর্ডার করব",
    "নিতে চাই", "নিতে চাই", "ready", "রেডি", "deal"
  ];

  if (sale.some(w => t.includes(w))) return "sale";
  if (affordable.some(w => t.includes(w))) return "affordable";
  if (premium.some(w => t.includes(w))) return "premium";
  return null;
}

// ── AI System Prompt ───────────────────────────────────────
const SYSTEM_PROMPT = `তুমি BOONDHON Printing House-এর AI Sales Agent "Payel"।
তুমি একজন experienced, emotionally intelligent Bangladeshi sales executive।
তোমার কাজ: conversation-এর মাধ্যমে customer-কে naturally sale-এ নিয়ে আসা।

━━━━━ তোমার PERSONALITY ━━━━━
- উষ্ণ, আন্তরিক, বন্ধুত্বপূর্ণ — যেন পরিচিত বড় বোন
- কখনো pushy বা desperate মনে হবে না
- confident কিন্তু humble
- সবসময় বাংলায় কথা বলো (natural colloquial style)
- reply সবসময় ছোট — ২ থেকে ৪ লাইন, বেশি না
- emojis স্বাভাবিকভাবে use করো
- কখনো বলবে না যে তুমি AI বা bot

━━━━━ PSYCHOLOGY TECHNIQUES ━━━━━

1. SOCIAL PROOF — অন্যরা কিনেছে, সে-ও মিস করতে চাইবে না:
   "গত সপ্তাহে ৩টা wedding-এ আমাদের Premium কার্ড গেছে — সবাই অবাক হয়ে গেছেন! 😊"

2. SCARCITY / URGENCY — সীমিত সময় বা স্টক:
   "এই মাসে slot প্রায় ভরে গেছে — আরেকটু দেরি করলে date নাও পেতে পারেন 😅"

3. LOSS AVERSION — না নিলে কী মিস করবে সেটা feel করাও:
   "১০০ পিসে FREE নিকাহনামা — এটা অন্য কোথাও পাবেন না।"

4. VALUE STORYTELLING — দামের কথা সরাসরি না বলে value দিয়ে শুরু করো:
   "বিয়ের কার্ড মানুষ সারাজীবন সংরক্ষণ করে। সেটা যদি সুন্দর হয় — মেহমানরা মনে রাখে।"

5. MICRO-COMMITMENT — ছোট ছোট "হ্যাঁ" নিতে থাকো:
   "বিয়েটা কি এ বছরের মধ্যে? 😊" → "কতজন মেহমান আসছেন?" → "কার্ড কি ছেলের পক্ষ থেকে?"

6. EMPATHY FIRST — আগে সমস্যা বোঝো, তারপর solution:
   "বাজেট টাইট, বুঝলাম! কিন্তু আমাদের Affordable কার্ড দেখলে অবাক হবেন — quality-তে কোনো compromise নেই।"

7. ANCHOR PRICING — বড় দাম আগে বলো, তারপর ছোট:
   "Premium ৯,০০০ টাকা হলে Affordable মাত্র ৭,০০০ — প্রায় ২,০০০ টাকা বাঁচছেন!"

━━━━━ PRICE LIST (সঠিক) ━━━━━
৫০ পিস:  Affordable=২,৭৫০ ৳ | Premium=৩,২৫০ ৳
১০০ পিস: Affordable=৪,৫০০ ৳ | Premium=৫,৫০০ ৳ (FREE নিকাহনামা 🎁)
২০০ পিস: Affordable=৭,০০০ ৳ | Premium=৯,০০০ ৳ (FREE নিকাহনামা 🎁)
Advance মাত্র ৩০% → bKash/Nagad: 01682588856
Delivery: ৫-৭ কার্যদিবস, সারা বাংলাদেশ Cash on Delivery

━━━━━ CARD TYPE TRIGGER ━━━━━
Customer "Affordable" বললে → reply-এ বলো: "এই মুহূর্তে আপনাকে একটি নমুনা পাঠাচ্ছি 💚"
Customer "Premium" বললে → reply-এ বলো: "এই মুহূর্তে আপনাকে একটি নমুনা পাঠাচ্ছি ✨"
Order confirm হলে → warmly congratulate করো এবং বলো টিম contact করবে

━━━━━ CONVERSATION FLOW ━━━━━
১. Warm greeting → জানো বিয়ে কবে
২. কত পিস লাগবে → price বলো with value
৩. Image দেখাও → "আরও দেখতে চাইলে বলুন"
৪. Objection handle করো empathy দিয়ে
৫. Order info নাও → close করো naturally`;

// ── Groq AI call ───────────────────────────────────────────
async function getAIReply(senderId, userMessage) {
  const history = getHistory(senderId);

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history,
        { role: 'user', content: userMessage }
      ],
      max_tokens: 350,
      temperature: 0.85,
    }),
  });

  const data = await response.json();
  return data?.choices?.[0]?.message?.content || 'দুঃখিত, একটু সমস্যা হচ্ছে 😊';
}

// ── Meta API helpers ───────────────────────────────────────
async function sendText(recipientId, text) {
  await fetch(
    `https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: { text }
      })
    }
  );
}

async function sendImage(recipientId, imageUrl) {
  await fetch(
    `https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`,
    {
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
    }
  );
}

async function sendQuickReplies(recipientId, text, buttons) {
  await fetch(
    `https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: {
          text,
          quick_replies: buttons.map(b => ({
            content_type: 'text',
            title: b,
            payload: b.toUpperCase().replace(/\s+/g, '_')
          }))
        }
      })
    }
  );
}

// ── Webhook ────────────────────────────────────────────────
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post('/webhook', async (req, res) => {
  res.sendStatus(200);

  const body = req.body;
  if (body.object !== 'page') return;

  for (const entry of body.entry) {
    const event = entry.messaging[0];
    if (!event || !event.message || event.message.is_echo) continue;

    const senderId = event.sender.id;
    const userText = event.message.text;
    if (!userText) continue;

    try {
      const history = getHistory(senderId);

      // প্রথম message → welcome + quick replies
      if (history.length === 0) {
        await sendQuickReplies(
          senderId,
          'আসসালামু আলাইকুম! 😊\nBOONDHON Printing House-এ স্বাগতম! 🌸\n\nবিয়ের কার্ড দেখতে চান? আমাদের collection:',
          ['💚 Affordable Card', '✨ Premium Card', '💰 Price List']
        );
        addToHistory(senderId, 'user', userText);
        addToHistory(senderId, 'assistant', 'Welcome message sent with quick replies.');
        continue;
      }

      // trigger detect
      const trigger = detectTrigger(userText);

      // AI reply
      const aiReply = await getAIReply(senderId, userText);
      addToHistory(senderId, 'user', userText);
      addToHistory(senderId, 'assistant', aiReply);

      // text পাঠাও
      await sendText(senderId, aiReply);

      // user trigger → image + follow-up
      if (trigger === 'affordable') {
        await sendImage(senderId, driveUrl(randomId(AFFORDABLE_IDS)));
        await sendText(senderId, '💚 এটি আমাদের Affordable collection-এর একটি নমুনা।\nআরও দেখতে চাইলে শুধু বলুন! 😊');
      } else if (trigger === 'premium') {
        await sendImage(senderId, driveUrl(randomId(PREMIUM_IDS)));
        await sendText(senderId, '✨ এটি আমাদের Premium collection-এর একটি নমুনা।\nআরও দেখতে চাইলে শুধু বলুন! 😊');
      } else if (trigger === 'sale') {
        await sendText(senderId,
          '🎉 অভিনন্দন! আপনার সিদ্ধান্তটা সঠিক! 💍\n\n' +
          '📞 আমাদের টিম ১৫-৩০ মিনিটের মধ্যে যোগাযোগ করবে।\n\n' +
          '💳 Advance (মোটের ৩০%) পাঠান:\n' +
          'bKash/Nagad (Personal): 01682588856\n\n' +
          'ধন্যবাদ BOONDHON বেছে নেওয়ার জন্য! 🌸'
        );
      }

      // AI reply-তেও trigger check
      const aiTrigger = detectTrigger(aiReply);
      if (!trigger) {
        if (aiTrigger === 'affordable') {
          await sendImage(senderId, driveUrl(randomId(AFFORDABLE_IDS)));
        } else if (aiTrigger === 'premium') {
          await sendImage(senderId, driveUrl(randomId(PREMIUM_IDS)));
        }
      }

    } catch (err) {
      console.error('Error:', err);
      await sendText(senderId, 'দুঃখিত, একটু সমস্যা হচ্ছে। একটু পরে আবার চেষ্টা করুন 😊');
    }
  }
});

app.get('/', (req, res) => res.send('🤖 BOONDHON Bot Running!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('✅ BOONDHON Bot Server Started on port ' + PORT));
