// This is from https://cdn.statuspage.io/se-v2.js

StatusPage = typeof StatusPage == "undefined" ? {} : StatusPage, StatusPage.page = function(e) {
    e = e || {};
    if (!e.page) throw new Error("A pageId is required to initialize.");
    this.apiKey = e.apiKey || null, this.error = e.error || this.error, this.format = e.format || "json", this.pageId = e.page, this.version = e.version || "v2", this.secure = "secure" in e ? e.secure : !0, this.protocol = this.secure ? "https" : "http", this.host = e.host || "hosted.statuspage.io", this.host_with_port_and_protocol = e.test ? "" : this.protocol + "://" + this.host
}, StatusPage.page.prototype.serialize = function(e, t) {
    var n = [],
        r = {
            sms: "email_sms",
            webhook: "endpoint"
        };
    for (var i in e) {
        if (i === "to_sentence") continue;
        var s = i;
        i = i in r ? r[i] : i;
        var o = t ? t + "[" + i + "]" : i,
            u = e[s];
        n.push(typeof u == "object" ? this.serialize(u, o) : encodeURIComponent(o) + "=" + encodeURIComponent(u))
    }
    return n.join("&")
}, StatusPage.page.prototype.createStatusPageCORSRequest = function(e, t) {
    var n = new XMLHttpRequest;
    return "withCredentials" in n ? n.open(e, t, !0) : typeof XDomainRequest != "undefined" ? (n = new XDomainRequest, n.open(e, t)) : n = null, n
}, StatusPage.page.prototype.executeRequestAndCallbackWithResponse = function(e) {
    if (!e.path) throw new Error("A path is required to make a request");
    var t = e.path,
        n = e.method || "GET",
        r = e.success || null,
        i = e.error || this.error,
        s = this.host_with_port_and_protocol.replace("hosted", this.pageId) + "/api/" + this.version + "/" + t + "." + this.format,
        o = this.createStatusPageCORSRequest(n, s);
    if (o) {
        this.apiKey && (console.log("!!! API KEY IN USE - REMOVE BEFORE DEPLOYING TO PRODUCTION !!!"), console.log("!!! API KEY IN USE - REMOVE BEFORE DEPLOYING TO PRODUCTION !!!"), console.log("!!! API KEY IN USE - REMOVE BEFORE DEPLOYING TO PRODUCTION !!!"), o.setRequestHeader("Authorization", "OAuth " + this.apiKey)), o.onload = function() {
            var e = JSON.parse(o.responseText);
            r && r(e)
        }, o.error = i;
        if (n === "POST" || n === "DELETE") {
            var u = e.data || {};
            o.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), o.send(this.serialize(u))
        } else o.send()
    }
}, StatusPage.page.prototype.get = function(e, t) {
    t = t || {};
    if (!e) throw new Error("Path is required.");
    if (!t.success) throw new Error("Success Callback is required.");
    var n = t.success || {},
        r = t.error || {};
    this.executeRequestAndCallbackWithResponse({
        path: e,
        success: n,
        error: r,
        method: "GET"
    })
}, StatusPage.page.prototype.post = function(e, t) {
    t = t || {};
    if (!e) throw new Error("Path is required.");
    var n = {};
    if (e === "subscribers") {
        if (!t.subscriber) throw new Error("Subscriber is required to post.");
        n.subscriber = t.subscriber
    } else {
        if (!t.data) throw new Error("Data is required to post.");
        n = t.data
    }
    var r = t.success || {},
        i = t.error || {};
    this.executeRequestAndCallbackWithResponse({
        data: n,
        path: e,
        success: r,
        error: i,
        method: "POST"
    })
}, StatusPage.page.prototype.delete = function(e, t) {
    t = t || {};
    if (!e) throw new Error("Path is required.");
    if (!t.subscriber) throw new Error("Data is required to delete.");
    var n = {};
    e === "subscribers" ? n.subscriber = t.subscriber : n = t.data;
    var r = t.success || {},
        i = t.error || {};
    this.executeRequestAndCallbackWithResponse({
        data: n,
        path: e,
        success: r,
        error: i,
        method: "DELETE"
    })
}, StatusPage.page.prototype.error = function(e) {
    console.log("There was an error with your request")
}, StatusPage.page.prototype.summary = function(e) {
    this.get("summary", e)
}, StatusPage.page.prototype.status = function(e) {
    this.get("status", e)
}, StatusPage.page.prototype.components = function(e) {
    this.get("components", e)
}, StatusPage.page.prototype.incidents = function(e) {
    switch (e.filter) {
        case "unresolved":
            this.get("incidents/unresolved", e);
            break;
        case "resolved":
            this.get("incidents/resolved", e);
            break;
        default:
            this.get("incidents", e)
    }
}, StatusPage.page.prototype.scheduled_maintenances = function(e) {
    switch (e.filter) {
        case "active":
            this.get("scheduled-maintenances/active", e);
            break;
        case "upcoming":
            this.get("scheduled-maintenances/upcoming", e);
            break;
        default:
            this.get("scheduled-maintenances", e)
    }
}, StatusPage.page.prototype.subscribe = function(e) {
    if (!e || !e.subscriber) throw new Error("A subscriber object is required.");
    this.post("subscribers", e)
}, StatusPage.page.prototype.unsubscribe = function(e) {
    if (!e || !e.subscriber) throw new Error("A subscriber object is required.");
    if (!e.subscriber.id) throw new Error("You must supply a subscriber.id in order to cancel a subscription.");
    this.delete("subscribers", e)
};
