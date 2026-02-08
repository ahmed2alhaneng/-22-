
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is used exactly as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
أنت مساعد ذكي لمكتب "كلاسيك فون" (Classic Phone) لصيانة الهواتف في ديالى - بعقوبة - حي المعلمين.
تخصص المكتب: 
1. تخطي حسابات iCloud (الآيكلود).
2. صيانة الهواتف وتبديل الشاشات الوكالة.
3. تبديل أيسيات الشحن (Charging IC).
4. خبرة أكثر من 3 سنوات في المجال.

بيانات الاتصال:
- الهاتف: 07700583840
- البريد الإلكتروني: ahmed2iraq60@gmail.com
- الموقع: ديالى، بعقوبة، حي المعلمين.

مهمتك:
- الرد على استفسارات العملاء حول مشاكل هواتفهم.
- شرح الخدمات التي يقدمها المكتب باحترافية.
- التأكيد على أن المكتب يستخدم قطع غيار أصلية (وكالة).
- تشجيع العملاء على زيارة المكتب للصيانة.
- كن ودوداً واستخدم لغة عربية مهنية وسهلة (لهجة عراقية مهذبة أو فصحى بسيطة).
`;

export async function getAiResponse(userPrompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "عذراً، واجهت مشكلة في الاتصال. يرجى المحاولة لاحقاً أو الاتصال بنا مباشرة على 07700583840.";
  }
}
