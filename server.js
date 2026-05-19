require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "BOONDHON_SECRET_2026";
const PAGE_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyCVEkrtXT9hkllGpbyGIekH8TLgzFJvZ_I";

// সাশ্রয়ী ও প্রিমিয়াম কার্ডের ড্রাইভ আইডি সমূহ (সংক্ষিপ্ত ও সুরক্ষিত রীড)
const AFFORDABLE_IDS = [
  "1J9_qfkIdIWL5Sc9O8EokvYlGfQWrf5TD","1cOCFSa1ap-Z54Ldf2AuoUKlEaQ5Ccql-","1dbYH2L4QykEUhYXGQPzQZObEuHFdwKsT",
  "1HJTtR-zhhg6v2ph7MikdMDWI-LWJgG0z","1PRlMp4F1xnQJPURON535pl7t08_thXVA","1UEAeYYB3Bt5vMYEL-a7AcV1aV21Z04si",
  "1-_qTV4gq0oKMdfMRxlTZL3yUO98ZGAoi","15yHXRk2mHI6-cKeooRqT20XeHubRRrPN","1Yrcqj5g0sZDrL3QaEkfEmKnF12BEs6ir",
  "1vXwJ68j7x5qfpZdHkMkqLn0tvpblGDpl","1GWw91oefwyYr9sHSQXjePTSX-KwPjy7I","1_tnTz7HWDf4CVJHORPlani7pjEcLdm7X",
  "1OMy_r94N_iUqvPW1t5fAGa4Sv3C_MIqF","1rXCxMziCgTImURvkahNp-AvneVljg-CW","1k_hzTbXOxxJg9rJ2OW-tnIkzLNYUqkOf"
];

const PREMIUM_IDS = [
  "182kOjBhoaqOTq7nr4ryI6re6fRuLITbH","1cTfbTDJDqBjsV-r7V1OjBZ-Z6tUAqwxj","1cA-MfI55Hh7ibreMQ4zPvt2i_LKxVHkR",
  "1fvtC5mT4slvV_kROIej7awAGmCRc7TUl","1rLVZUQ8lw6ilWM76xxARtbUreQ3JIkdi","15AQWI3wP2a57-3OxHZTCfSbskgvC5YvH",
  "1ahoubjUVdc9SJyi5n2rzZIsbugjCjHiz","1qlwwRe2Mr_gb8CZjkeG0-YxBSGmOHzZu","1oOdGtYFTz-xNmSLUO-VFS1YODqYZ74HJ",
  "1zBBLQOfuAhPXhyr6At3tJ5DlTZ_nXfLy","11GVK5OYU7bjf8YaHeNAAnAHPks3T1Jme","1Kat8i9M3usZX8iX2xUCcX08RVocX9kKB"
];

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
    { time: 45*60*1000, msg: "Hi ভাইয়া/আপু! 😊 কোনো ডিজাইন পছন্দ হয়েছে কি? কাস্টমাইজেশন বা কোনো তথ্যের প্রয়োজন লাগলে জানাবেন কিন্তু! ✨" },
    { time: 3*60*60*1000, msg: "আমাদের বিয়ের কার্ডের স্টক কিন্তু সীমিত 💖 আজই অর্ডার কনফার্ম করলে আপনার নাম দিয়ে দ্রুত ডেমো ডিজাইন পেয়ে যাবেন! 🥰" }
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

// 🎯 কাস্টমারের খাঁটি উদ্দেশ্য চেনার ফিল্টার (ইন্টেন্ট ফিল্টারিং)
function detectTrigger(text) {
  if (!text) return null;
  const t = text.toLowerCase().trim();
  if (["bangla_form", "english_form"].some(w => t === w)) return t; 
  if (["ডিজাইন", "কালেকশন", "কার্ড দেখাও", "design", "card"].some(w => t.includes(w))) {
    return (t.includes("premium") || t.includes("দামী")) ? "premium" : "affordable";
  }
  if (["affordable", "অ্যাফোর্ডেবল", "সাশ্রয়", "কম দাম"].some(w => t.includes(w))) return "affordable";
  if (["premium", "প্রিমিয়াম"].some(w => t.includes(w))) return "premium";
  if (["দাম কত", "প্রাইস", "কত টাকা", "price", "অফার"].some(w => t.includes(w))) return "price";
  if (["ডেলিভারি", "কারখানা", "delivery", "ঠিকানা", "পলিসি"].some(w => t.includes(w))) return "delivery";
  if (["অর্ডার করব", "অর্ডার দিতে চাই", "এখনই অর্ডার করুন", "sale", "order confirm"].some(w => t.includes(w))) return "sale";
  if (["দামী", "অনেক দাম", "expensive", "বেশি দাম", "ডিসকাউন্ট", "ছাড়"].some(w => t.includes(w))) return "price_objection";
  if (["stop_images", "না আর লাগবে না"].some(w => t.includes(w))) return "stop_images";
  if (["continue_images", "বাকিগুলো দাও"].some(w => t.includes(w))) return "continue_images";
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
  
  const maxImages = Math.min(startIndex + 5, ids.length);
  for (let i = startIndex; i < maxImages; i++) {
    if (!state.isSendingImages) { state.lastImageIndex = i; return; }
    try {
      await axios.post(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`, {
        recipient: { id: senderId }, message: { attachment: { type: 'image', payload: { url: driveUrl(ids[i]), is_reusable: true } } }
      });
    } catch (e) { console.error('Image push error:', e.message); }
    await new Promise(r => setTimeout(r, 1200));
  }
  
  state.lastImageIndex = maxImages;
  if (state.lastImageIndex < ids.length) {
    try {
      await axios.post(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_TOKEN}`, {
        recipient: { id: senderId }, message: { attachment: { type: "template", payload: { template_type: "button",
          text: "🌸 আরও কিছু এক্সক্লুসিভ ডিজাইন দেখতে চান ভাইয়া/আপু?",
          buttons: [
            { type: "postback", title: "👍 হ্যাঁ, বাকিগুলো দাও", payload: "continue_images" },
            { type: "postback", title: "🙅 না, আর লাগবে না", payload: "stop_images" }
          ]
        } } }
      });
    } catch (e) { console.error(e.message); }
  } else {
    state.isSendingImages = false;
    await sendMsg(senderId, "✨ আমাদের ক্যাটালগের সব ডিজাইন দেখানো শেষ ভাইয়া/আপু! কোনটি আপনার সবচেয়ে ভালো লেগেছে জানাবেন কিন্তু! 🥰");
  }
}

// 🧠 এডভান্সড জেমিনি সেলস রিপ্রেজেন্টেটিভ ইঞ্জিন
async function getGeminiReply(senderId, userMessage, imageBuffer = null) {
  const state = getUserState(senderId);
  
  const systemText =
    "তুমি BOONDHON Printing House-এর এক্সপার্ট প্রফেশনাল এবং অত্যন্ত অমায়িক ও মিষ্টিভাষী সেলস রিপ্রেজেন্টেティブ 'বৃষ্টি আপু'।\n" +
    "তোমার মূল লক্ষ্য: কাস্টমারের সাথে আগে আস্থার সম্পর্ক তৈরি করা। কোনো অবস্থাতেই প্রয়োজন ছাড়া ফালতু বাটন বা ফর্ম ছুঁড়ে মারবে না।\n" +
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
      if (trigger === 'price' || trigger === 'delivery') {
        const aiReply = await getGeminiReply(senderId, userText);
        await sendMsg(senderId, aiReply);
        scheduleFollowUps(senderId); continue;
      }
      if (trigger === 'price_objection') {
        state.priceObjectionCount += 1;
        const reply = await getGeminiReply(senderId, userText);
        if (state.priceObjectionCount >= 3 && !state.hasOfferedDiscount) {
          state.hasOfferedDiscount = true;
          await sendMsg(senderId, '🌸 শুধুমাত্র আপনার স্পেশাল রিকোয়েস্টে প্রতি পিসে ৫ টাকা ছাড়ের ব্যবস্থা করে দিতে পারব ভাইয়া/আপু! 🥰 অর্ডারটি কি তাহলে প্রсеস করব?');
        } else {
          await sendMsg(senderId, reply);
        }
        scheduleFollowUps(senderId); continue;
      }
      
      // 🛠️ ট্রাস্টেড ও গাইডেড অর্ডার সিস্টেম
      if (trigger === 'sale') {
        state.isSendingImages = false;
        const aiReply = await getGeminiReply(senderId, "আমি অর্ডার করতে চাই, আমাকে প্রসেস এবং কাস্টমাইজেশন বুঝিয়ে বলো।");
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
          '📝 *বিয়েষের কার্ডের বাংলা ফর্ম:* 🌸\n\n' +
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

    if (userText.includes('নামঃ') || userText.includes('Groom Name:')) {
      const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
      const telegramChatId = process.env.TELEGRAM_CHAT_ID;
      if (telegramBotToken && telegramChatId) {
        try {
          const alertMessage = `🚨 *নতুন অর্ডার ফর্ম সাবমিট হয়েছে!* \n\n👤 *কাস্টমার আইডি:* ${senderId}\n\n📝 *তথ্যসমূহ:* \n${userText}`;
          await axios.post(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, { chat_id: telegramChatId, text: alertMessage });
        } catch (err) { console.error('Telegram Error:', err.message); }
      }
      await sendMsg(senderId, "🎉 আলহামদুলিল্লাহ ভাইয়া/আপু! আপনার বিয়ের কার্ডের প্রয়োজনীয় ইনফো সফলভাবে আমাদের কাছে জমা হয়েছে। আমাদের প্রফেশনাল ডিজাইনার টিম দ্রুত আপনার তথ্যের ওপর ভিত্তি করে একটি দারুণ ডেমো ডিজাইন তৈরি করে আপনাকে ইনবক্সে দেখাবে। অসংখ্য ধন্যবাদ! 🌸");
      continue;
    }

    const aiReply = await getGeminiReply(senderId, userText);
    state.history.push({ role: 'user', content: userText });
    state.history.push({ role: 'model', content: aiReply });
    while (state.history.length > 10) state.history.shift();
    
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
