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
                new CSSUnitValue(document.body.offsetHeight - document.querySelector('.footer__main').offsetHeight - innerHeight - 400, 'px'),
                new CSSUnitValue(100, 'percent'),
            ]
        })

        if (innerWidth > 800) {
            contactBannersContainer.animate(
                {
                    position: [
                        'fixed'
                    ],
                    left: [
                        "100vw",
                        "0vw",
                        "-100vw",
                    ],
                    top: [
                        innerHeight - contactBannersContainer.offsetHeight + 400 + "px",
                        innerHeight - document.querySelector('.footer__main').offsetHeight - contactBannersContainer.offsetHeight + "px",
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
                    position: [
                        'relative',
                    ],
                    left: [
                        '-20vw',
                        '-20vw',
                        '-20vw',
                    ],
                    top: [
                        '0',
                        '0',
                    ],

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