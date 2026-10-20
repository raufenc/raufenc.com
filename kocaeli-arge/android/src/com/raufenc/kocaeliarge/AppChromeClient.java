package com.raufenc.kocaeliarge;
import android.content.ActivityNotFoundException;
import android.net.Uri;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.widget.FrameLayout;
public class AppChromeClient extends WebChromeClient {
    private final MainActivity act;
    View customView;
    CustomViewCallback customCallback;
    ValueCallback<Uri[]> fileCallback;
    public AppChromeClient(MainActivity a) { act = a; }
    @Override public void onShowCustomView(View view, CustomViewCallback callback) { // tam ekran video
        if (customView != null) { callback.onCustomViewHidden(); return; }
        customView = view; customCallback = callback;
        act.fullscreen.addView(view, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        act.fullscreen.setVisibility(View.VISIBLE); act.web.setVisibility(View.GONE);
        act.getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
    }
    @Override public void onHideCustomView() {
        if (customView == null) return;
        act.fullscreen.removeView(customView); act.fullscreen.setVisibility(View.GONE); act.web.setVisibility(View.VISIBLE);
        customView = null; if (customCallback != null) customCallback.onCustomViewHidden();
        act.getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE);
    }
    @Override public boolean onShowFileChooser(WebView v, ValueCallback<Uri[]> cb, FileChooserParams params) { // fotoğraf seçimi
        if (fileCallback != null) fileCallback.onReceiveValue(null);
        fileCallback = cb;
        try { act.startActivityForResult(params.createIntent(), MainActivity.FILE_CHOOSER); } catch (ActivityNotFoundException e) { fileCallback = null; return false; }
        return true;
    }
}
