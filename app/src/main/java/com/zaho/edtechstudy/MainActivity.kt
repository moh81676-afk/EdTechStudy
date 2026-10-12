package com.zaho.edtechstudy

import android.annotation.SuppressLint
import android.content.ActivityNotFoundException
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.VibrationEffect
import android.os.Vibrator
import android.provider.OpenableColumns
import android.view.WindowManager
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.widget.Toast
import androidx.activity.OnBackPressedCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.FileProvider
import org.json.JSONArray
import org.json.JSONObject
import java.io.File

class MainActivity : AppCompatActivity() {

    private lateinit var web: WebView
    private var pendingCourse: String = ""

    private val libraryDir: File
        get() = File(filesDir, "library").also { if (!it.exists()) it.mkdirs() }

    private val picker = registerForActivityResult(
        ActivityResultContracts.OpenMultipleDocuments()
    ) { uris: List<Uri>? ->
        if (uris.isNullOrEmpty()) return@registerForActivityResult
        val course = pendingCourse
        Thread {
            val items = JSONArray()
            uris.forEachIndexed { index, uri ->
                try {
                    var displayName = "document.pdf"
                    var size = 0L
                    contentResolver.query(uri, null, null, null, null)?.use { c ->
                        if (c.moveToFirst()) {
                            val n = c.getColumnIndex(OpenableColumns.DISPLAY_NAME)
                            val s = c.getColumnIndex(OpenableColumns.SIZE)
                            if (n >= 0) displayName = c.getString(n) ?: displayName
                            if (s >= 0) size = c.getLong(s)
                        }
                    }
                    val stored = "${System.currentTimeMillis()}_$index.pdf"
                    val out = File(libraryDir, stored)
                    contentResolver.openInputStream(uri)?.use { input ->
                        out.outputStream().use { input.copyTo(it) }
                    }
                    items.put(
                        JSONObject()
                            .put("file", stored)
                            .put("name", displayName.removeSuffix(".pdf").removeSuffix(".PDF"))
                            .put("size", if (size > 0) size else out.length())
                    )
                } catch (e: Exception) {
                    // تجاهل الملف الذي فشل نسخه وأكمل الباقي
                }
            }
            val payload = JSONObject().put("course", course).put("items", items).toString()
            runOnUiThread {
                web.evaluateJavascript(
                    "window.onPdfPicked && window.onPdfPicked(${JSONObject.quote(payload)})",
                    null
                )
            }
        }.start()
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        web = WebView(this)
        setContentView(web)

        web.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = true
            allowContentAccess = false
            setSupportZoom(false)
            builtInZoomControls = false
            textZoom = 100
        }
        web.addJavascriptInterface(Bridge(), "Android")
        web.loadUrl("file:///android_asset/www/index.html")

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                web.evaluateJavascript("window.handleBack ? window.handleBack() : false") { r ->
                    if (r != "true") {
                        isEnabled = false
                        onBackPressedDispatcher.onBackPressed()
                    }
                }
            }
        })
    }

    override fun onPause() {
        super.onPause()
        web.onPause()
    }

    override fun onResume() {
        super.onResume()
        web.onResume()
    }

    private fun viewPdf(file: File) {
        if (!file.exists()) {
            Toast.makeText(this, "File not found / الملف غير موجود", Toast.LENGTH_SHORT).show()
            return
        }
        val uri = FileProvider.getUriForFile(this, "$packageName.fileprovider", file)
        val intent = Intent(Intent.ACTION_VIEW).apply {
            setDataAndType(uri, "application/pdf")
            addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        }
        try {
            startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            Toast.makeText(
                this,
                "Install a PDF reader / ثبّت تطبيق لقراءة PDF",
                Toast.LENGTH_LONG
            ).show()
        }
    }

    inner class Bridge {
        @JavascriptInterface
        fun pickPdf(courseId: String) {
            pendingCourse = courseId
            runOnUiThread { picker.launch(arrayOf("application/pdf")) }
        }

        @JavascriptInterface
        fun openUser(file: String) {
            val f = File(libraryDir, File(file).name)
            runOnUiThread { viewPdf(f) }
        }

        @JavascriptInterface
        fun openAsset(path: String) {
            if (!path.startsWith("library/") || path.contains("..")) return
            Thread {
                try {
                    val out = File(cacheDir, File(path).name)
                    assets.open("www/$path").use { input ->
                        out.outputStream().use { input.copyTo(it) }
                    }
                    runOnUiThread { viewPdf(out) }
                } catch (e: Exception) {
                    runOnUiThread {
                        Toast.makeText(this@MainActivity, "File not found / الملف غير موجود", Toast.LENGTH_SHORT).show()
                    }
                }
            }.start()
        }

        @JavascriptInterface
        fun deleteUser(file: String) {
            File(libraryDir, File(file).name).delete()
        }

        @JavascriptInterface
        fun vibrate(ms: Int) {
            try {
                val v = getSystemService(VIBRATOR_SERVICE) as Vibrator
                if (Build.VERSION.SDK_INT >= 26) {
                    v.vibrate(VibrationEffect.createOneShot(ms.toLong(), VibrationEffect.DEFAULT_AMPLITUDE))
                } else {
                    @Suppress("DEPRECATION")
                    v.vibrate(ms.toLong())
                }
            } catch (e: Exception) {
            }
        }

        @JavascriptInterface
        fun keepAwake(on: Boolean) {
            runOnUiThread {
                if (on) window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
                else window.clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
            }
        }
    }
}
