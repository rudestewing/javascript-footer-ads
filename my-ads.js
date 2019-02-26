var ads = {
    allowed: null,
    text: 'SAMPLE TEXT HERE', // text buat di tampilkan di ads
    backgroundUrl: '', // ads background url...
    redirectUrl: '', // redirect url
    config: {
        containerId: 'my-ads-container', // ID untuk container ads bisa di ganti sesuai keinginan.
        height: 35,
    }
};

var eventListeners = [
    'mousedown',
    'mousemove'
    // Bisa tambahin event listener disini...
];

function closeAds() {
    ads.allowed = false;
    var el = document.getElementById(ads.config.containerId);
    el.remove();
}

function task() {
    ads.allowed = true;
    var adsContainer = document.createElement('a');
    adsContainer.setAttribute('id', ads.config.containerId);
    adsContainer.innerHTML = ads.text;
    adsContainer.setAttribute('href', ads.redirectUrl);
    adsContainer.setAttribute('target', '_blank');
    adsContainer.setAttribute('style', `
        text-decoration: none;
        color: white;
        font-size: 12pt;
        border-radius: 5px 5px 0px 0px;
        display: inline-block;
        left: 50%;
        transform: translateX(-50%);
        margin: auto;
        min-width: `+((window.innerWidth) -40)+`px;
        max-width: 1040px;
        padding: 6px 0 10px 20px;
        position: relative;
        height: `+ads.config.height+`px;
        position: fixed;
        z-index: 10000000;
        bottom: 0;
        background-color: #2886ca;
        background-image: url(`+ads.backgroundUrl+`);
        background-position: center;
        background-size: contain;
    `);
    adsContainer.addEventListener('click', function(e) {
        e.target.remove();
    });
    
    var adsClose = document.createElement('span');
    adsClose.innerHTML = 'x';
    adsContainer.appendChild(adsClose);
    adsClose.setAttribute('style', `
        font-size: 10pt;
        display: inline-block;
        height: 20px;
        width: 20px;
        position: absolute;
        top: 0;
        right: 0px;
        padding-left: 7px;
        margin-top: -10px;
        cursor: pointer;
        background-color: red;
        color: white;
        border-radius: 10px;
    `);
    adsClose.addEventListener('click', closeAds);

    var body = document.getElementsByTagName('html')[0];
    body.appendChild(adsContainer);
};

for (let i = 0; i < eventListeners.length; i++) {
    var element = eventListeners[i];
    window.addEventListener(eventListeners[i], function() {
        if(ads.allowed == null) {
            task();
        }
    });
}