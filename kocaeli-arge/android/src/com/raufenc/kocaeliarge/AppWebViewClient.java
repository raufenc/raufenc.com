package com.raufenc.kocaeliarge;
import android.net.Uri;
import android.view.View;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;
public class AppWebViewClient extends WebViewClient {
    private final MainActivity act;
    public AppWebViewClient(MainActivity a) { act = a; }
    @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest req) {
        Uri u = req.getUrl(); String url = u.toString(); String scheme = u.getScheme() == null ? "" : u.getScheme(); String host = u.getHost() == null ? "" : u.getHost();
        String appHost = Uri.parse(MainActivity.APP_URL).getHost(); if (appHost == null) appHost = "";
        if (url.startsWith(MainActivity.APP_URL)) return false;
        if (scheme.equals("tel") || scheme.equals("mailto") || scheme.equals("intent") || scheme.equals("geo")
                || url.contains("youtube.com") || url.contains("youtu.be") || url.contains("google.com/maps")
                || url.contains("accounts.google.com") || (scheme.startsWith("http") && !host.equals(appHost) && !host.endsWith("." + appHost))) {
            act.openExternal(url); return true;
        }
        return false;
    }
    @Override public void onPageFinished(WebView view, String url) { act.offline.setVisibility(View.GONE); }
    @Override public void onReceivedError(WebView view, WebResourceRequest req, WebResourceError err) {
        if (req.isForMainFrame() && !act.isOnline()) act.offline.setVisibility(View.VISIBLE);
    }
}
