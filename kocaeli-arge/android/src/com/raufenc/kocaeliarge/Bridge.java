package com.raufenc.kocaeliarge;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.provider.CalendarContract;
import android.webkit.JavascriptInterface;
import android.widget.Toast;
/** JavaScript köprüsü: window.AndroidBridge */
public class Bridge {
    private final MainActivity act;
    public Bridge(MainActivity a) { act = a; }
    @JavascriptInterface public void share(String title, String text, String url) {
        Intent i = new Intent(Intent.ACTION_SEND); i.setType("text/plain");
        i.putExtra(Intent.EXTRA_SUBJECT, title);
        i.putExtra(Intent.EXTRA_TEXT, (text == null || text.length() == 0 ? "" : text + "\n") + (url == null ? "" : url));
        act.startActivity(Intent.createChooser(i, "Paylaş"));
    }
    @JavascriptInterface public void addEvent(String title, long startMs, long endMs, String location, String description) {
        Intent i = new Intent(Intent.ACTION_INSERT).setData(CalendarContract.Events.CONTENT_URI)
            .putExtra(CalendarContract.Events.TITLE, title).putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, startMs)
            .putExtra(CalendarContract.EXTRA_EVENT_END_TIME, endMs).putExtra(CalendarContract.Events.EVENT_LOCATION, location)
            .putExtra(CalendarContract.Events.DESCRIPTION, description);
        try { act.startActivity(i); } catch (ActivityNotFoundException e) { Toast.makeText(act, "Takvim uygulaması bulunamadı", Toast.LENGTH_SHORT).show(); }
    }
    @JavascriptInterface public void openExternal(String url) { act.openExternal(url); }
    @JavascriptInterface public String platform() { return "android-webview"; }
    @JavascriptInterface public void toast(String msg) { Toast.makeText(act, msg, Toast.LENGTH_SHORT).show(); }
}
