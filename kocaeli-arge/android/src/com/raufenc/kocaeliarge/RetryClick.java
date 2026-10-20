package com.raufenc.kocaeliarge;
import android.view.View;
public class RetryClick implements View.OnClickListener {
    private final MainActivity act;
    public RetryClick(MainActivity a) { act = a; }
    @Override public void onClick(View v) { act.load(); }
}
