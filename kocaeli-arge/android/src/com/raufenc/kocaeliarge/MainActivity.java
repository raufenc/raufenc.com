package com.raufenc.kocaeliarge;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.webkit.CookieManager;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.FrameLayout;
import android.widget.Toast;

/** Kocaeli MEM AR-GE Portalı — yerel kabuk (WebView). Web uygulamasını tam ekran, uygulama gibi açar. */
public class MainActivity extends Activity {
    public static final String APP_URL = "https://raufenc.com/kocaeli-arge/";
    public static final int FILE_CHOOSER = 101;
    WebView web;
    View offline;
    FrameLayout fullscreen;
    AppChromeClient chrome;

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setTheme(R.style.AppTheme);
        setContentView(R.layout.activity_main);
        web = (WebView) findViewById(R.id.web);
        offline = findViewById(R.id.offline);
        fullscreen = (FrameLayout) findViewById(R.id.fullscreen);
        findViewById(R.id.retry).setOnClickListener(new RetryClick(this));

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setAllowFileAccess(false);
        s.setLoadWithOverviewMode(true);
        s.setUseWideViewPort(true);
        s.setSupportMultipleWindows(false);
        s.setCacheMode(WebSettings.LOAD_DEFAULT);
        s.setUserAgentString(s.getUserAgentString() + " KocaeliArgeApp/1.2");
        CookieManager.getInstance().setAcceptCookie(true);
        CookieManager.getInstance().setAcceptThirdPartyCookies(web, true);
        web.addJavascriptInterface(new Bridge(this), "AndroidBridge");
        web.setWebViewClient(new AppWebViewClient(this));
        chrome = new AppChromeClient(this);
        web.setWebChromeClient(chrome);
        load();
    }

    void load() { offline.setVisibility(View.GONE); web.loadUrl(APP_URL); }

    boolean isOnline() {
        ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo n = cm == null ? null : cm.getActiveNetworkInfo();
        return n != null && n.isConnected();
    }

    void openExternal(String url) {
        try { startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url))); }
        catch (ActivityNotFoundException e) { Toast.makeText(this, "Açılamadı", Toast.LENGTH_SHORT).show(); }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == FILE_CHOOSER && chrome.fileCallback != null) {
            chrome.fileCallback.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(resultCode, data));
            chrome.fileCallback = null;
        }
        super.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public void onBackPressed() {
        if (chrome.customView != null) { chrome.onHideCustomView(); return; }
        if (web.canGoBack()) web.goBack(); else super.onBackPressed();
    }
    @Override protected void onResume() { super.onResume(); web.onResume(); }
    @Override protected void onPause() { web.onPause(); super.onPause(); }
}
