/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
$(window).scroll(function () {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-custom").addClass("top-nav-collapse");
    } else {
        $(".navbar-custom").removeClass("top-nav-collapse");
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function () {
    $('.navbar-toggle:visible').click();
});

// remove the focused state after click,
// otherwise bootstrap will still highlight the link
$("a").mouseup(function () {
    $(this).blur();
})

let modeData = [
    ["the", "we are the"],
    "biggest happiest narrowest shallowest smallest".split(" "),
    "alaskan arap celestial dead electric ex fighting glass greek japanese london tame".split(" "),
    "death them twin two us".split(" "),
    "animals bells boys cars castles cops doors dreams foxes girls hands mice monsters pilots shoes sounds twins".split(" "),
    ["& sons", "for cutie", "of dead", "of foresty", "of men", "of rhythm", "of sound", "of tomorrow"],
    "castle cinema club country day grammar jacket kingdom man motel mother mouse park play ring road strap taxi tragedy twin wizard".split(" "),
    "alive known".split(" "),
]

let modes = [
    [1, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 1, 0, 0],
    [1, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 1],
]

function assignIndex(index, length) {
    return index == null || index < 0 || index >= length ? randomIndexFor(length) : index
}

function randomIndexFor(number) {
    return Math.round((number - 1) * Math.random())
}

function nameBand(modeReq = null, indexesReq = null) {
    const mode = assignIndex(modeReq, modes.length)
    const modeArray = modes[mode]
    let out = ""
    let resultIndexes = [mode, []]
    let indexEnabled = 0

    modeArray.forEach(function (enabled, index) {
        if (!enabled) return

        const wordIndex = assignIndex(indexesReq && indexesReq.length > indexEnabled ? indexesReq[indexEnabled] : -1, modeData[index].length)
        const word = modeData[index][wordIndex]

        if (out.length > 0) out += " "
        out += word

        resultIndexes[1][indexEnabled] = wordIndex
        indexEnabled++
    })

    return { out, resultIndexes }
}

function showFor(modeRequested = null, indexes = null) {
    const { out, resultIndexes } = nameBand(modeRequested, indexes)
    let url = location.protocol + "//" + location.host + location.pathname + "#shared_" + resultIndexes[0]
    let bandName = $("#bandName")
    let copySharingLink = $("#copySharingLink")

    resultIndexes[1].forEach(function (wordIndex) {
        url += "_" + wordIndex
    }) 
    bandName.text(out)
    bandName.show()
    copySharingLink.attr("href", url)
    copySharingLink.show()

    let startTitle = $("#letsStartTitle")
    startTitle.html("Your Band's Name Is")
    startTitle.addClass("font-weight-light")
    $("#letsStartHelp").hide()

    let generateNameButton = $("#generateName")
    
    generateNameButton.css({"font-size": ""})
    generateNameButton.children("span").html("Find Another Name")
}

$("#generateName").on("click", function (event) {
    event.preventDefault()
    showFor()
})

$(function () {
    let hash = window.location.hash
    if (hash && hash.startsWith("#shared") && hash.includes("_")) {
        hash = hash.substring(1)
    } else {
        return
    }

    const hashes = hash.split("_")
    const mode = hashes[1]
    const wordIndexes = hashes.slice(2)
    
    showFor(mode, wordIndexes)
    document.getElementById("letsStart").scrollIntoView({ behavior: "smooth" });
})

$("#copySharingLink").on('click', function(event) {
    event.preventDefault()
    let a = $(this)
    let copy = a.attr("href")
    let copyPromise = navigator.clipboard.writeText(copy);

    let status = a.children("span")

    copyPromise.then(function () {
        status.html("Copied to Clipboard")
    }, function() {
        status.html("Failed to copy")
    })
})