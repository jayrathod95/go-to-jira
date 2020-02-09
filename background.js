// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({color: '#3aa757'}, function () {
        console.log('The color is green.');
        chrome.runtime.openOptionsPage();
    });
});

chrome.omnibox.onInputEntered.addListener((text, disposition) => {
    console.log(text);
    getBaseUrl.then(value => {
      chrome.tabs.create({
        url: value+'/secure/QuickSearch.jspa?searchString='+text,
        active: true
      })
    }).catch(reason => chrome.runtime.openOptionsPage());
});

var getBaseUrl = new Promise((resolve, reject) => {
    chrome.storage.sync.get(['baseUrl'], function (data) {
        if (data)
            resolve(data.baseUrl);
        else reject();
    })
});
