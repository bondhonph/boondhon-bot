require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "BOONDHON_SECRET_2025";
const PAGE_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 

// ── Google Drive Image IDs (Por por alada media block hoye jabe) ──
const AFFORDABLE_IDS = [
  "1J9_qfkIdIWL5Sc9O8EokvYlGfQWrf5TD","1cOCFSa1ap-Z54Ldf2AuoUKlEaQ5Ccql-",
  "1dbYH2L4QykEUhYXGQPzQZObEuHFdwKsT","1HJTtR-zhhg6v2ph7MikdMDWI-LWJgG0z",
  "1PRlMp4F1xnQJPURON535pl7t08_thXVA","1UEAeYYB3Bt5vMYEL-a7AcV1aV21Z04si",
  "1-_qTV4gq0oKMdfMRxlTZL3yUO98ZGAoi","15yHXRk2mHI6-cKeooRqT20XeHubRRrPN",
  "1Yrcqj5g0sZDrL3QaEkfEmKnF12BEs6ir","1vXwJ68j7x5qfpZdHkMkqLn0tvpblGDpl",
  "1GWw91oefwyYr9sHSQXjePTSX-KwPjy7I","1_tnTz7HWDf4CVJHORPlani7pjEcLdm7X",
  "1OMy_r94N_iUqvPW1t5fAGa4Sv3C_MIqF","1rXCxMziCgTImURvkahNp-AvneVljg-CW",
  "1k_hzTbXOxxJg9rJ2OW-tnIkzLNYUqkOf","1bgYpcqh4pVLDy8yfwrS40X5ejtCFxmFv"
]; 

const PREMIUM_IDS = [
  "182kOjBhoaqOTq7nr4ryI6re6fRuLITbH","1cTfbTDJDqBjsV-r7V1OjBZ-Z6tUAqwxj",
  "1cA-MfI55Hh7ibreMQ4zPvt2i_LKxVHkR","1fvtC5mT4slvV_kROIej7awAGmCRc7TUl",
  "1rLVZUQ8lw6ilWM76xxARtbUreQ3JIkdi","15AQWI3wP2a57-3OxHZTCfSbskgvC5YvH",
  "1ahoubjUVdc9SJyi5n2rzZIsbugjCjHiz","1qlwwRe2Mr_gb8CZjkeG0-YxBSGmOHzZu",
  "1oOdGtYFTz-xNmSLUO-VFS1YODqYZ74HJ","1zBBLQOfuAaPXhyr6At3tJ5DlTZ_nXfLy"
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

  // BOONDHON Sales Agent System Instructions
  const systemInstructionText = 
    `তুমি BOONDHON Printing House-এর AI Sales Agent "Brishti Apa"। তোমার পার্সোনালিটি হবে অত্যন্ত প্রফেশনাল, আন্তরিক এবং সেলস-ওরিয়েন্টেড।\n\n` +
    `━━━━━ গুরুত্বপূর্ণ নির্দেশনাবলী ও প্রাইস লিস্ট ━━━━━\n` +
    `১. সবসময় বাংলায় স্বাভাবিক, মিষ্টি ও কাস্টমার-বান্ধব ভাষায় কথা বলবে (ছোট ২-৪ লাইন)।\n` +
    `২. কাস্টমার দাম জানতে চাইলে নিচের সঠিক প্রাইস লিস্ট ফলো করবে:\n` +
    `   - ২০ পিস = ১,৫০০ টাকা (৭৫ টাকা/পিস)\n` +
    `   - ৫০ পিস: Premium = ৩,২৫০ টাকা | Affordable = ২,৭৫০ টাকা\n` +
    `   - ১০০ পিস: Premium = ৫,৫০০ টাকা | Affordable = ৪,৫০০ টাকা | Luxury = ৮,৫০০ টাকা\n` +
    `   - ২০০ পিস: Premium = ৯,০০০ টাকা (৪৫ টাকা/পিস) | Affordable = ७,০০০ টাকা (৩৫ টাকা/পিস)\n\n` +
    `৩. অফার কন্ডিশন (খুব গুরুত্বপূর্ণ):\n` +
    `   - ১০০ পিসে কোনো ফ্রি নিকাহনামা নেই। কাস্টমারকে বলবে ২০০ পিস বা তার বেশি নিলে "FREE নিকাহনামা" অফারটি প্রযোজ্য হবে।\n` +
    `   - যদি কেউ ১০০ পিস নেয়, তাকে বলবে: "🎁 ভাইয়া/আপু, ২০০ পিস নিলে কিন্তু চমৎকার একটি নিকাহনামা একদম ফ্রি পাবেন! আর প্রতি পিসের দামও অনেক কমে যাবে।"\n` +
    `   - এখনই কনফর্ম করলে ঈদের আগেই ডেলিভারি পাবে—এই অফার পুশ করবে।\n\n` +
    `৪. অবজেকশন হ্যান্ডেলিং (নেগোসিয়েশন):\n` +
    `   - কাস্টমার দাম বেশি বললে বলবে: "ভাই/আপু, দাম কম হলে কোয়ালিটিও কম হয়। আমাদের কার্ড হাতে নিলেই কোয়ালিটির পার্থক্যটা বুঝবেন। আর আমাদের প্রাইস এলাকার মধ্যে সবচেয়ে কম।"\n` +
    `   - কেউ যদি খুব কম পিস (যেমন ২০ পিস) নিতে চায়, তাকে বোঝাবে: "আপু/ভাই, ছোট অর্ডারে প্রিন্টিং সেটআপ কস্ট বেশি পড়ে। ২০ পিস নিলে ৭৫ টাকা করে পড়ে, কিন্তু ৫০ পিস নিলে মাত্র ৫৫ টাকা পড়বে! আপনার প্রতি পিসে ২০ টাকা বাঁচবে। ৫০ পিস কনফর্ম করবেন?"\n\n` +
    `৫. অফিস, কারখানা ও কালেকশন পলিসি:\n` +
    `   - আমাদের প্রধান অফিস: মানিকগঞ্জ।\n` +
    `   - আমাদের কারখানা: ঢাকা ফকিরাপুল, লালবাগকেল্লা, বাংলাবাজার।\n` +
    `   - অর্ডার অনলাইনে অথবা মানিকগঞ্জ অফিস থেকে সরাসরি এসে দেওয়া যাবে।\n` +
    `   - প্রোডাক্ট ৩টি উপায়ে নেওয়া যাবে: কুরিয়ার সার্ভিস, আমাদের অফিস অথবা কারখানা থেকে নিজে এসে।\n` +
    `   - কাস্টমারকে অবশ্যই মনে করিয়ে দেবে যে: "আমাদের কার্ডের ডিজাইন অনুযায়ী প্রিন্টিং কারখানা আলাদা হয়। তাই আপনি কোন ডিজাইন নিচ্ছেন, তার ওপর ভিত্তি করে আমাদের টিম আগে আপনাকে কনফার্ম করবে কোন কারখানা থেকে সংগ্রহ করতে হবে।"\n\n` +
    `৬. কাস্টমাইজেশন: জি, আমরাই লিখে দিই। নাম, তারিখ, ভেন্যু—সব কাস্টমাইজ করে দেওয়া হয়।\n` +
    `৭. কাস্টমার যদি অর্ডার করতে চায়, তাকে জানাবে যে প্রথমে নিয়মাবলী পাঠানো হচ্ছে এবং কার্ডের ভাষা (বাংলা নাকি ইংরেজি) জানতে চাওয়া হচ্ছে।`;

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
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'একটু সমস্যা হচ্ছে ভাইয়া 😊';
  } catch (err) {
    console.error('Gemini API Error:', err);
    return 'আমি আন্তরিকভাবে দুঃখিত, একটু সমস্যা হচ্ছে। আবার বলবেন? 😊';
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

// Netlify layout-er moto ekter niche arekta pure high-res image pathanor function
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
    await new Promise(resolve => setTimeout(resolve, 400));
  }
}

// Quick Reply Buttons Function for Language Selection
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
      const aiReply = await getGeminiReply(senderId, userText);
      
      addToHistory(senderId, 'user', userText);
      addToHistory(senderId, 'model', aiReply);

      // ১. প্রথমে জেমিনির এআই জেনারেটেড রেসপন্স টেক্সট যাবে
      await sendText(senderId, aiReply);

      // ২. লজিক্যাল ট্রিগার হ্যান্ডেলিং
      if (trigger === 'affordable') {
        await sendText(senderId, '💚 নিচে আমাদের Affordable কালেকশনের ডিজাইনগুলো দেওয়া হলো, ছবিতে চাপ দিলে বড় করে দেখতে পাবেন:');
        await sendAllImagesOneByOne(senderId, AFFORDABLE_IDS);
      } else if (trigger === 'premium') {
        await sendText(senderId, '✨ নিচে আমাদের Premium কালেকশনের ডিজাইনগুলো দেওয়া হলো, ছবিতে চাপ দিলে বড় করে দেখতে পাবেন:');
        await sendAllImagesOneByOne(senderId, PREMIUM_IDS);
      } else if (trigger === 'sale') {
        
        // ৩. অর্ডার করার নিয়মাবলী (টেক্সট ব্লক ১)
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
          '> এছাড়া সরাসরি আমাদের অফিস বা কারখানা থেকে সংগ্রহ করতে পারবেন।\n\n' +
          '৪. *ডেলিভারি সময়:*\n' +
          '> কার্ড ডেলিভারি পেতে ৫ থেকে ৭ কর্মদিবস সময় লাগবে।';
        
        await sendText(senderId, orderRules);
        
        // ৪. নিয়মাবলী দেওয়ার পর ভাষা সিলেক্ট করার কুইক রিপ্লাই বাটন পাঠানো হবে
        await sendLanguageSelection(senderId);

      } else if (trigger === 'bangla_form') {
        // ৫. কাস্টমার বাংলা ফর্ম চাইলে (লং প্রেস করে কপি করার জন্য সম্পূর্ণ আলাদা মেসেজ)
        const banglaForm =
          'বর-\n' +
          'নামঃ \n' +
          'পিতাঃ\n' +
          'মাতাঃ\n' +
          'ঠিকানাঃ\n\n' +
          'কণে-\n' +
          'নামঃ \n' +
          'পিতাঃ\n' +
          'মাতাঃ\n' +
          'ঠিকানাঃ\n\n' +
          'গায়ে হলুদ-\n' +
          'তারিখ (ইংরেজি সন):\n' +
          'তারিখ (বাংলা সন):\n' +
          'রোজঃ\n' +
          'সময়ঃ\n' +
          'স্থানঃ\n\n' +
          'शुभ বিবাহ-\n' +
          'তারিখ (ইংরেজি সন):\n' +
          'তারিখ (বাংলা সন):\n' +
          'রোজঃ\n' +
          'লগ্ন (শুধু মাত্র হিন্দুদের জন্য):\n' +
          'বরযাত্রা/সময়ঃ\n' +
          'স্থানঃ\n\n' +
          'বৌ-ভাত-\n' +
          'তারিখ (ইংরেজি সন):\n' +
          'তারিখ (বাংলা সন):\n' +
          'রোজঃ\n' +
          'সময়ঃ\n' +
          'স্থানঃ\n\n' +
          'অভ্যর্থনায়-\n' +
          '(ছোট বাচ্চাদের নাম):\n\n' +
          'প্রয়োজনে-\n' +
          '(ফোন নম্বর):\n\n' +
          'শুভেচ্ছান্তে-\n' +
          'নামঃ\n\n' +
          '-------\n' +
          'বর এবং কণে পিতা মাতার কত তম সন্তান?\n\n\n' +
          'কার্ডটি ছেলের পক্ষ হতে নাকি মেয়ের পক্ষ হতে?\n\n\n' +
          '-------\n' +
          'কুরিয়ার ইনফরমেশন-\n' +
          'যে রিসিভ করবে তার নামঃ\n' +
          'মোবাইল নম্বরঃ\n' +
          'বিস্তারিত ঠিকানাঃ\n\n' +
          '💡 _(নোট: সব তথ্য অ্যাড না করলেও চলবে, যেগুলো প্রয়োজন নেই সেগুলো ফাঁকা রেখে ফর্মটি ফিলাপ করে পাঠিয়ে দিতে পারেন)_';

        await sendText(senderId, banglaForm);

      } else if (trigger === 'english_form') {
        // ৬. কাস্টমার ইংলিশ ফর্ম চাইলে (লং প্রেস করে কপি করার জন্য সম্পূর্ণ আলাদা মেসেজ)
        const englishForm =
          'Groom Name:\n' +
          'Father Name:\n' +
          'Mother Name:\n\n' +
          'Bride Name:\n' +
          'Father Name:\n' +
          'Mother Name:\n\n' +
          'Programme\n\n' +
          'Holud Sandya\n' +
          'Day:\n' +
          'Date:\n' +
          'Time:\n' +
          'Venue:\n' +
          'Address:\n\n' +
          'Wedding\n' +
          'Day:\n' +
          'Date:\n' +
          'Time:\n' +
          'Venue:\n' +
          'Address:\n\n' +
          'Reception\n' +
          'Day:\n' +
          'Date:\n' +
          'Time:\n' +
          'Venue:\n' +
          'Address:\n\n' +
          'With Best Regard:\n' +
          'Name:\n\n' +
          'RSV\n' +
          'Number:\n\n' +
          '🚚 Courier Information-\n' +
          'Receiver Name:\n' +
          'Mobile Number:\n' +
          'Detailed Address:\n\n' +
          '💡 _(Note: You can skip any fields that are not required for your card layout)_';

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
app.listen(PORT, () => console.log('✅ BOONDHON Pro Gemini Bot Engine is Fully Active!'));
