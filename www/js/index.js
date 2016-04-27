/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app;
app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('onCleverTapProfileSync', this.onCleverTapProfileSync, false); // optional: to be notified of CleverTap user profile synchronization updates 
        document.addEventListener('onDeepLink', this.onDeepLink, false); // example: optional, register your own custom listener to handle deep links passed from your native code.
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        // Enable to debug issues.
        // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

        var notificationOpenedCallback = function(jsonData) {
            console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
            // console.log(jsonData.additionalData.id);
            amplitude.logEvent('callbackrecieved');
        };

        window.plugins.OneSignal.init("14b57213-fb0b-48f2-a294-40fc59dd036b", { googleProjectNumber: "711621241954" , autoRegister: true}, notificationOpenedCallback);

        // Show an alert box if a notification comes in when the user is in your app.
        window.plugins.OneSignal.enableInAppAlertNotification(true);
        window.plugins.OneSignal.promptLocation();

        amplitude.logEvent('deviceready');

        CleverTap.setDebugLevel(1);
        CleverTap.enablePersonalization();
        CleverTap.registerPush();
        CleverTap.profileSet({"Identity":"3100601855039", "DOB":"1980-07-28", "custom":1.3 , "Firstname":"Kritsada", "Lastname":"Tavarasumida" , "Email":"kritsada.tavarasumida@gmail.com" , "FBID":"100006058871422" , "Phone":0809011110});
        CleverTap.recordEventWithName("Test custom event");
    },

    onCleverTapProfileSync: function(e) {
        console.log(e.updates);
    },

    // example deep link handling
    onDeepLink: function(e) {
        console.log(e.deeplink);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
