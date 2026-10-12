# EdTech Study

**English** · [العربية](#العربية)

Offline Android study app for Educational Technology students: PDF library, flashcards & quizzes, Pomodoro timer, deadlines and GPA calculator. The interface is available in Arabic and English.

## Features
- **Four academic levels**: filter courses by Level 1 to Level 4 in the Library and Study tabs. Set a course's level when adding it, or later with the ✏️ button on the course page. The sample courses are spread across levels for demo purposes only.
- **Library**: courses, notes (add / edit / delete), PDF files stored inside the app, and search across notes, files and cards.
- **Flashcards & quizzes**: spaced-review flashcards and multiple-choice quizzes with explanations and best score.
- **Pomodoro timer**: adjustable durations, daily stats, vibration and sound when a session ends, screen stays on while running.
- **Deadlines & GPA**: deadlines with a days-left counter, plus a semester and cumulative GPA calculator.
- **Arabic + English** (RTL/LTR) with light and dark themes.
- **Fully offline**: the app does not request the internet permission, and all data stays on the phone.

## Run and build the APK
1. Install the latest **Android Studio**.
2. `File > Open` and select the project folder, then wait for Gradle Sync (the first sync needs internet to download dependencies). Accept Gradle 8.7 if asked.
3. To test: connect your phone with USB debugging enabled, or start an emulator, then press ▶ Run.
4. To build an APK: `Build > Build Bundle(s) / APK(s) > Build APK(s)`. The file is created in `app/build/outputs/apk/debug/`.
5. Copy the APK to your phone and install it (allow installing from unknown sources). To share it with classmates, use `Build > Generate Signed Bundle / APK`.

## Adding your study material
- **From inside the app** (easiest): Library → choose a course → PDF files → Add PDF. You can pick several files at once; they are copied into the app's storage and work offline.
- **Bundled in the APK**: put PDFs in `app/src/main/assets/www/library/` and list them in `window.BUNDLED` inside `app/src/main/assets/www/data.js`.
- **Notes, flashcards and quiz questions**: add them in the app (Study → Manage cards & questions), or edit `window.SEED` in `data.js` before the first launch.
- The built-in content is a short sample for demo purposes; review it and adjust it to your faculty's curriculum.

## Notes
- PDFs open in the phone's PDF reader app (for example Google Drive's PDF viewer).
- The GPA scale is the `GRADES` list at the top of `app.js`; edit it to match your faculty's regulations.
- Data is stored inside the app. Clearing the app's data in Android settings deletes it.

## Project structure
- `app/src/main/java/.../MainActivity.kt`: WebView plus a bridge for opening and importing PDFs and for vibration.
- `app/src/main/assets/www/`: the interface (`index.html`, `style.css`, `app.js`, `data.js`).

---

<a id="العربية"></a>

# EdTech Study — تطبيق مذاكرة لطلاب تكنولوجيا التعليم

[English](#edtech-study) · **العربية**

تطبيق أندرويد للمذاكرة بدون نت لطلاب تكنولوجيا التعليم: مكتبة PDF وملخصات، فلاش كاردز واختبارات، مؤقت Pomodoro، مواعيد تسليم وحاسبة GPA. الواجهة بالعربي والإنجليزي.

## المميزات
- **المستويات الأربعة**: فلتر (المستوى الأول ← الرابع) في المكتبة والمذاكرة، وتحدد مستوى كل مادة من ✏️ داخل صفحة المادة أو عند إضافتها. توزيع المواد النموذجية على المستويات للتجربة فقط.
- **المكتبة**: المواد، ملخصات (إضافة/تعديل/حذف)، ملفات PDF محفوظة داخل التطبيق، وبحث شامل.
- **فلاش كاردز واختبارات**: كروت بنظام مراجعة متدرّج، واختبارات اختيار من متعدد مع الشرح وأفضل نتيجة.
- **مؤقت Pomodoro**: مدد قابلة للتعديل، إحصائيات اليوم، اهتزاز وصوت عند الانتهاء، وإبقاء الشاشة مفتوحة أثناء الجلسة.
- **المواعيد و GPA**: مواعيد تسليم مع عدّاد الأيام، وحاسبة معدل فصلي وتراكمي.
- **عربي + English** (RTL/LTR) ووضع فاتح/داكن.
- **بدون نت**: لا يطلب صلاحية الإنترنت إطلاقاً، وكل البيانات محفوظة على الموبايل.

## التشغيل وبناء الـ APK
1. ثبّت **Android Studio** (آخر إصدار).
2. `File > Open` واختر مجلد المشروع، وانتظر Gradle Sync (أول مرة محتاجة نت لتحميل المكتبات). لو طلب Gradle 8.7 وافق.
3. للتجربة: وصّل موبايلك (USB debugging) أو شغّل Emulator، واضغط ▶ Run.
4. لملف APK: `Build > Build Bundle(s) / APK(s) > Build APK(s)` ويظهر في `app/build/outputs/apk/debug/`.
5. انقل الـ APK للموبايل وثبّته (فعّل "التثبيت من مصادر غير معروفة"). ولو هتنشره للزملاء استخدم `Build > Generate Signed Bundle / APK`.

## إضافة المصادر
- **من داخل التطبيق** (الأسهل): المكتبة ← اختر المادة ← ملفات PDF ← إضافة PDF، وتقدر تختار أكتر من ملف. الملفات بتتنسخ لتخزين التطبيق وتشتغل بدون نت.
- **ملفات مضمّنة في الـ APK**: ضع الـ PDF في `app/src/main/assets/www/library/` وسجّلها في `app/src/main/assets/www/data.js` داخل `window.BUNDLED`.
- **الملخصات والكروت والأسئلة**: من التطبيق (المذاكرة ← إدارة الكروت والأسئلة)، أو عدّل `window.SEED` في `data.js` قبل أول تشغيل.
- المحتوى الموجود حالياً نماذج مختصرة للتجربة؛ راجعها وعدّلها حسب منهج كليتك.

## ملاحظات
- فتح الـ PDF بيتم عبر تطبيق قراءة PDF على الموبايل (Google Drive PDF Viewer أو غيره).
- سلم الـ GPA في أول `app.js` (`GRADES`) وعدّله حسب لائحة كليتك.
- البيانات مخزنة في التطبيق؛ مسح بيانات التطبيق من إعدادات الأندرويد بيمسحها، فخد بالك.

## هيكل المشروع
- `app/src/main/java/.../MainActivity.kt`: WebView + جسر لفتح PDF واستيراده والاهتزاز.
- `app/src/main/assets/www/`: الواجهة (`index.html`, `style.css`, `app.js`, `data.js`).
