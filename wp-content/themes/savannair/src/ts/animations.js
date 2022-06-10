import 'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js';

addEventListener('load', () => {
    const contactBannersContainer = document.querySelector('.contact__banners__container');

    let resizeId;

    contactBannersAnimations();

    addEventListener('resize', () => {
        clearTimeout(resizeId);
        resizeId = setTimeout(doneResizing, 500);
    })

    function doneResizing() {
        contactBannersAnimations();
    }

    function contactBannersAnimations() {
        let contactBannersScrollTimeline = new ScrollTimeline({
            scrollOffsets: [
                new CSSUnitValue(document.querySelector('#contact').offsetTop - innerHeight, 'px'),
                new CSSUnitValue(100, 'percent'),
            ]
        })

        if (innerWidth > 800) {
            contactBannersContainer.animate(
                {
                    left: [
                        "-10",
                        "-60vw",
                        "-100vw",
                    ]
                },
                {
                    easing: 'linear',
                    fill: 'both',
                    timeline: contactBannersScrollTimeline,
                }
            )
        } else {
            contactBannersContainer.animate(
                {
                    left: [
                        "0",
                        "0",
                    ]
                },
                {
                    easing: 'linear',
                    fill: 'both',
                    timeline: contactBannersScrollTimeline,
                }
            )
        }
    }
})