function Banner() {
    this.banner = $('#banner');
    this.ul = $('.img-list');
    this.imgWidth = this.ul.children().eq(0).width();
    this.dots = $('.dots li');
    this.num = this.dots.length;
    this.leftBtn = $('.left-btn');
    this.rightBtn = $('.right-btn');
    this.index = 0;
    this.init();
    this.leftBtnClick();
    this.rightBtnClick();
    this.toggle();
    this.autoPlay();
    this.bannerEnter();
    this.bannerLeave();
}

$.extend(Banner.prototype, {
    init: function() {
        this.ul.children().eq(0).clone().appendTo(this.ul);
    },
    slide: function() {
        this.ul.animate({left: -this.index * this.imgWidth});
        if (this.index == 5) {
            this.dots.eq(0).addClass('active');
            this.dots.eq(4).removeClass('active');
        } else {
            this.dots.eq(this.index).addClass('active').siblings().removeClass('active');
        }
    },
    leftBtnClick: function() {
        this.leftBtn.click($.proxy(this.handleLeftBtnClick, this));
    },
    handleLeftBtnClick: function() {
        --this.index;
        if (this.index == -1) {
            this.ul.css('left', -this.num * this.imgWidth + 'px');
            this.index = this.num - 1;
        }
        this.slide();
    },
    rightBtnClick: function() {
        this.rightBtn.click($.proxy(this.handleRightBtnClick, this));
    },
    handleRightBtnClick: function() {
        ++this.index;
        if (this.index == this.num + 1) {
            this.ul.css('left', 0);
            this.index = 1;
        }
        this.slide();
    },
    toggle: function() {
        $.each(this.dots, $.proxy(this.handleEach, this));
    },
    handleEach: function(i) {
        this.dots.eq(i).on('mouseenter', i, $.proxy(this.handleDotsEnter, this));
    },
    handleDotsEnter: function(e) {
        var indexA = e.data;
        this.index = indexA;
        this.slide();
    },
    autoPlay: function() {
        this.timer = setInterval($.proxy(this.handleAutoPlay, this), 3000);
    },
    handleAutoPlay: function() {
        ++this.index;
        if (this.index == this.num + 1) {
            this.ul.css('left', 0);
            this.index = 1;
        }
        this.slide();
    },
    bannerEnter: function() {
        this.banner.mouseenter($.proxy(this.handleBannerEnter, this));
    },
    handleBannerEnter: function() {
        clearInterval(this.timer);
    },
    bannerLeave: function() {
        this.banner.mouseleave($.proxy(this.handleBannerLeave, this));
    },
    handleBannerLeave: function() {
        this.autoPlay();
    }
});

new Banner();