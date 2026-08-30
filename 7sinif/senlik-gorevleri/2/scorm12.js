(function (root) {
  "use strict";

  var VALID_STATUS = {
    "passed": true,
    "completed": true,
    "failed": true,
    "incomplete": true,
    "browsed": true,
    "not attempted": true
  };

  function isTrue(value) {
    return value === true || String(value).toLowerCase() === "true";
  }

  function pad(value, size) {
    var text = String(value);
    while (text.length < size) text = "0" + text;
    return text;
  }

  function formatSessionTime(milliseconds) {
    var ms = Number(milliseconds);
    if (!isFinite(ms) || ms < 0) {
      throw new RangeError("Session time must be a non-negative number.");
    }

    var centiseconds = Math.floor(ms / 10);
    var maximum = (9999 * 360000) + (59 * 6000) + (59 * 100) + 99;
    if (centiseconds > maximum) centiseconds = maximum;

    var hours = Math.floor(centiseconds / 360000);
    centiseconds -= hours * 360000;
    var minutes = Math.floor(centiseconds / 6000);
    centiseconds -= minutes * 6000;
    var seconds = Math.floor(centiseconds / 100);
    var hundredths = centiseconds - (seconds * 100);

    return pad(hours, 4) + ":" + pad(minutes, 2) + ":" +
      pad(seconds, 2) + "." + pad(hundredths, 2);
  }

  function normalizeSessionTime(value) {
    if (typeof value !== "string") return formatSessionTime(value);
    var match = /^(\d{2,4}):([0-5]\d):([0-5]\d)(?:\.(\d{1,2}))?$/.exec(value);
    if (!match) throw new RangeError("Session time must look like HHHH:MM:SS.SS.");
    var fraction = (match[4] || "0") + "0";
    return pad(parseInt(match[1], 10), 4) + ":" + match[2] + ":" +
      match[3] + "." + fraction.slice(0, 2);
  }

  function asciiJson(value) {
    var text = JSON.stringify(value);
    if (typeof text !== "string") return "";
    return text.replace(/[\u007f-\uffff]/g, function (character) {
      return "\\u" + pad(character.charCodeAt(0).toString(16), 4);
    });
  }

  function create(options) {
    options = options || {};
    var storageKey = options.storageKey || "tr.eba.scorm12.v1";
    var maxApiHops = options.maxApiHops || 50;
    var debug = options.debug === true;
    var api = null;
    var mode = "uninitialized";
    var initialized = false;
    var finished = false;
    var startedAt = 0;
    var storage = null;
    var localState = { version: 1, values: {}, totalMs: 0, updatedAt: "" };

    function warn(message) {
      if (root.console && root.console.warn) root.console.warn(message);
    }

    function info(message) {
      if (debug && root.console && root.console.info) root.console.info(message);
    }

    function scanWindowChain(startWindow) {
      var current = startWindow;
      var lastReachable = startWindow;
      var hops = 0;

      while (current && hops < maxApiHops) {
        hops += 1;
        lastReachable = current;
        try {
          if (current.API) return { api: current.API, lastReachable: current };
          if (!current.parent || current.parent === current) break;
          current = current.parent;
        } catch (error) {
          break;
        }
      }
      return { api: null, lastReachable: lastReachable };
    }

    function discoverApi() {
      var parentResult = scanWindowChain(root);
      if (parentResult.api) return parentResult.api;
      var opener = null;
      try {
        opener = parentResult.lastReachable && parentResult.lastReachable.opener;
      } catch (error) {
        opener = null;
      }
      if (!opener) {
        try { opener = root.opener; } catch (error2) { opener = null; }
      }
      return opener ? scanWindowChain(opener).api : null;
    }

    function callApi(method, first, second) {
      try {
        switch (method) {
          case "LMSInitialize": return api.LMSInitialize(first);
          case "LMSFinish": return api.LMSFinish(first);
          case "LMSGetValue": return api.LMSGetValue(first);
          case "LMSSetValue": return api.LMSSetValue(first, second);
          case "LMSCommit": return api.LMSCommit(first);
          case "LMSGetLastError": return api.LMSGetLastError();
          case "LMSGetErrorString": return api.LMSGetErrorString(first);
          case "LMSGetDiagnostic": return api.LMSGetDiagnostic(first);
          default: return null;
        }
      } catch (error) {
        warn("[SCORM 1.2] " + method + " exception: " + error.message);
        return null;
      }
    }

    function reportLmsError(action, element) {
      var code = callApi("LMSGetLastError");
      var message = callApi("LMSGetErrorString", code);
      var diagnostic = callApi("LMSGetDiagnostic", code);
      warn("[SCORM 1.2] " + action + (element ? " (" + element + ")" : "") +
        " failed; code=" + String(code) +
        (message ? ", message=" + String(message) : "") +
        (diagnostic ? ", diagnostic=" + String(diagnostic) : ""));
    }

    function openStorage() {
      try {
        var candidate = root.localStorage;
        var probeKey = storageKey + ".__probe";
        candidate.setItem(probeKey, "1");
        candidate.removeItem(probeKey);
        return candidate;
      } catch (error) {
        return null;
      }
    }

    function loadFallback() {
      storage = openStorage();
      if (!storage) {
        mode = "memory";
        warn("[SCORM 1.2] LMS and localStorage unavailable; using memory fallback.");
        return;
      }
      mode = "localStorage";
      try {
        var raw = storage.getItem(storageKey);
        if (!raw) return;
        var parsed = JSON.parse(raw);
        if (parsed && parsed.values && typeof parsed.values === "object") {
          localState.values = parsed.values;
          localState.totalMs = isFinite(Number(parsed.totalMs)) ? Number(parsed.totalMs) : 0;
          localState.updatedAt = parsed.updatedAt || "";
        }
      } catch (error) {
        warn("[SCORM 1.2] Stored state is invalid; starting empty.");
      }
    }

    function persistFallback() {
      localState.updatedAt = new Date().toISOString();
      if (!storage) return true;
      try {
        storage.setItem(storageKey, JSON.stringify(localState));
        return true;
      } catch (error) {
        storage = null;
        mode = "memory";
        warn("[SCORM 1.2] localStorage write failed; using memory only.");
        return false;
      }
    }

    function active() {
      return initialized && !finished;
    }

    function initialize() {
      if (initialized && !finished) return true;
      if (finished) return false;
      api = discoverApi();
      startedAt = Date.now();

      if (api) {
        mode = "lms";
        var result = callApi("LMSInitialize", "");
        if (!isTrue(result)) {
          mode = "lms-error";
          reportLmsError("LMSInitialize");
          return false;
        }
        initialized = true;
        info("[SCORM 1.2] Running with LMS API.");
        return true;
      }

      loadFallback();
      initialized = true;
      info("[SCORM 1.2] Running in " + mode + " mode.");
      return true;
    }

    function getValue(element) {
      if (!active()) return "";
      if (!api) {
        return Object.prototype.hasOwnProperty.call(localState.values, element)
          ? String(localState.values[element]) : "";
      }
      var value = callApi("LMSGetValue", element);
      var errorCode = callApi("LMSGetLastError");
      if (errorCode !== null && String(errorCode) !== "0") {
        reportLmsError("LMSGetValue", element);
        return "";
      }
      return value === null || value === undefined ? "" : String(value);
    }

    function setValue(element, value) {
      if (!active()) return false;
      var text = value === null || value === undefined ? "" : String(value);
      if (api) {
        var result = callApi("LMSSetValue", element, text);
        if (!isTrue(result)) {
          reportLmsError("LMSSetValue", element);
          return false;
        }
        return true;
      }
      localState.values[element] = text;
      return persistFallback();
    }

    function setLessonStatus(value) {
      var status = String(value).toLowerCase().replace(/_/g, " ")
        .replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
      if (!VALID_STATUS[status]) throw new RangeError("Invalid lesson_status.");
      return setValue("cmi.core.lesson_status", status);
    }

    function scoreNumber(value, label) {
      var number = Number(value);
      if (!isFinite(number)) throw new TypeError(label + " must be numeric.");
      return number;
    }

    function scoreText(value) {
      return String(Math.round(value * 100) / 100);
    }

    function setScore(raw, minimum, maximum) {
      var rawNumber = scoreNumber(raw, "raw score");
      var minNumber = minimum === undefined ? 0 : scoreNumber(minimum, "minimum score");
      var maxNumber = maximum === undefined ? 100 : scoreNumber(maximum, "maximum score");
      if (maxNumber <= minNumber) throw new RangeError("Maximum score must exceed minimum.");
      if (rawNumber < minNumber || rawNumber > maxNumber) {
        throw new RangeError("Raw score is outside min/max range.");
      }
      var rawOk = setValue("cmi.core.score.raw", scoreText(rawNumber));
      var minOk = setValue("cmi.core.score.min", scoreText(minNumber));
      var maxOk = setValue("cmi.core.score.max", scoreText(maxNumber));
      return rawOk && minOk && maxOk;
    }

    function setLocation(value) {
      var text = String(value);
      if (/[^\x20-\x7e]/.test(text)) throw new RangeError("lesson_location must be ASCII.");
      if (text.length > 255) throw new RangeError("lesson_location exceeds 255 characters.");
      return setValue("cmi.core.lesson_location", text);
    }

    function setSuspendData(value) {
      var text = typeof value === "string" ? value : asciiJson(value);
      if (/[^\x20-\x7e]/.test(text)) throw new RangeError("suspend_data must be ASCII-safe.");
      if (text.length > 4096) throw new RangeError("suspend_data exceeds 4096 bytes.");
      return setValue("cmi.suspend_data", text);
    }

    function setSessionTime(value) {
      if (!active()) return false;
      var elapsed = value === undefined || value === null ? Date.now() - startedAt : value;
      return setValue("cmi.core.session_time", normalizeSessionTime(elapsed));
    }

    function commit() {
      if (!active()) return false;
      if (!api) return persistFallback();
      var result = callApi("LMSCommit", "");
      if (!isTrue(result)) {
        reportLmsError("LMSCommit");
        return false;
      }
      return true;
    }

    function finish(finishOptions) {
      if (!active()) return false;
      finishOptions = finishOptions || {};
      var elapsedMs = finishOptions.sessionTimeMs === undefined ||
        finishOptions.sessionTimeMs === null
        ? Date.now() - startedAt : Number(finishOptions.sessionTimeMs);
      if (!isFinite(elapsedMs) || elapsedMs < 0) throw new RangeError("Invalid sessionTimeMs.");

      var shouldSuspend = finishOptions.suspend !== false;
      var timeOk = setSessionTime(elapsedMs);
      var exitOk = setValue("cmi.core.exit", shouldSuspend ? "suspend" : "");
      var commitOk = commit();
      var finishOk = true;
      var finalSaveOk = true;

      if (api) {
        finishOk = isTrue(callApi("LMSFinish", ""));
        if (!finishOk) reportLmsError("LMSFinish");
      } else {
        localState.totalMs += elapsedMs;
        localState.values["cmi.core.total_time"] = formatSessionTime(localState.totalMs);
        finalSaveOk = persistFallback();
      }

      if (!api || finishOk) {
        finished = true;
        initialized = false;
      }
      return timeOk && exitOk && commitOk && finishOk && finalSaveOk;
    }

    return {
      initialize: initialize,
      getValue: getValue,
      setValue: setValue,
      setLessonStatus: setLessonStatus,
      setScore: setScore,
      setLocation: setLocation,
      setSuspendData: setSuspendData,
      setSessionTime: setSessionTime,
      commit: commit,
      finish: finish,
      getMode: function () { return mode; },
      isLms: function () { return mode === "lms"; },
      isActive: active
    };
  }

  root.Scorm12 = { create: create, formatSessionTime: formatSessionTime };
}(window));
