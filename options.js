// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
var init = function () {
    searchBaseUrlInStorage.then(value => {
        console.log(value);
        document.getElementById('baseUrl').value = value;
    }).catch(reason => {
        searchBaseUrlInHistory.then(value => {
            console.log(value);

            document.getElementById('baseUrl').value = value;
        })
    })
};

var searchBaseUrlInStorage = new Promise((resolve, reject) => {
    chrome.storage.sync.get(['baseUrl'], function (value) {
        if (value) resolve(value.baseUrl)
        else reject();
    });
});

var searchBaseUrlInHistory = new Promise((resolve, reject) => {
    chrome.history.search({text: 'https://*.atlassian.net/*', maxResults: 1}, function (data) {
        if (data) resolve(new URL(data[0].url).origin);
        else reject();
    });
});

var savePreferences = function () {
    chrome.storage.sync.set({baseUrl: document.getElementById('baseUrl').value}, function () {
        alert('Preferences Updated!');
    })
};
window.onload = function () {
    document.getElementById('baseUrlBtn').addEventListener('click', savePreferences);
    document.getElementById('scanHistory').addEventListener('click', function () {
        searchBaseUrlInHistory.then(value => document.getElementById('baseUrl').value = value)
    })
};

init();