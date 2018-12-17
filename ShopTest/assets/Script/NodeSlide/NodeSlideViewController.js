const directValue = cc.Enum({
    DIR_LEFT: 0,
    DIR_CENTER: 1,
    DIR_RIGHT: 2,
});

cc.Class({
    extends: cc.Component,

    properties: {

        _imageList: [],
        m_preBustPic: cc.Node,
        m_curBustPic: cc.Node,
        m_nextBustPic: cc.Node,

        m_preIndex: 0,
        m_curIndex: 0,
        m_nextIndex: 0,
        _isSlideDirection: cc.Enum,


        pageView: cc.PageView,


        // ...
    },

    // use this for initialization
    onLoad: function () {

        // cc.find('touchNode', this.node).on('LEFT', (event) => {
        //     console.log("[NodeSlideView]------------->左滑动");
        //     this._isSlideDirection = directValue.DIR_LEFT;
        // });
        //
        // cc.find('touchNode', this.node).on('RIGHT', (event) => {
        //     console.log("[NodeSlideView]------------->右滑动");
        //     this._isSlideDirection = directValue.DIR_RIGHT;
        // });
        //
        // cc.find('touchNode', this.node).on('CENTER', (event) => {
        //     console.log("[NodeSlideView]------------->无滑动");
        //     this._isSlideDirection = directValue.DIR_CENTER;
        // });

        this.node.on('LEFT', (event) => {
            console.log("[NodeSlideView]------------->左滑动");
            this._isSlideDirection = directValue.DIR_LEFT;
            let count = this._imageList.length;
            this.m_curIndex = this.m_preIndex;
            this.m_preIndex = (this.m_curIndex + count - 1) % count;
            this.m_nextIndex = (this.m_curIndex + count + 1) % count;

            this._scrollBannerView(this._isSlideDirection);

        });

        this.node.on('RIGHT', (event) => {
            console.log("[NodeSlideView]------------->右滑动");
            this._isSlideDirection = directValue.DIR_RIGHT;

            let count = this._imageList.length;
            this.m_curIndex = this.m_preIndex;
            this.m_preIndex = (this.m_curIndex + count - 1) % count;
            this.m_nextIndex = (this.m_curIndex + count + 1) % count;

            this._scrollBannerView(this._isSlideDirection);


        });


        // cc.find('pageView', this.node).on('LEFT', (event) => {
        //     console.log("[NodeSlideView]------------->左滑动");
        //     this._isSlideDirection = directValue.DIR_LEFT;
        //     let count = this._imageList.length;
        //     this.m_curIndex = this.m_preIndex;
        //     this.m_preIndex = (this.m_curIndex + count - 1) % count;
        //     this.m_nextIndex = (this.m_curIndex + count + 1) % count;
        //
        //     // this._scrollBannerView(this._isSlideDirection);
        //
        //     this.pageView.scrollToPage(this.m_nextIndex,0.5);
        //
        // });
        //
        // cc.find('pageView', this.node).on('RIGHT', (event) => {
        //     console.log("[NodeSlideView]------------->右滑动");
        //     this._isSlideDirection = directValue.DIR_RIGHT;
        //
        //     let count = this._imageList.length;
        //     this.m_curIndex = this.m_preIndex;
        //     this.m_preIndex = (this.m_curIndex + count - 1) % count;
        //     this.m_nextIndex = (this.m_curIndex + count + 1) % count;
        //
        //     this.pageView.scrollToPage(this.m_preIndex,0.5);
        //
        //
        // });
        //
        // cc.find('pageView', this.node).on('CENTER', (event) => {
        //     console.log("[NodeSlideView]------------->无滑动");
        // });


        this._initImageList();
        this._initUI();

    },

    _initUI: function () {

        this._constWidth = cc.find('touchNode', this.node).width;
        let count = this._imageList.length;
        this.m_curIndex = 0;
        this.m_preIndex = (this.m_curIndex + count - 1) % count;
        this.m_nextIndex = (this.m_curIndex + count + 1) % count;

        console.log("[NodeSlide]----上一个：" + this.m_preIndex + "  当前： " + this.m_curIndex + "  下一个： " + this.m_nextIndex);


        this.m_preBustPic.removeAllChildren(true);
        // this.m_preBustPic.setAnchorPoint(cc.v2(0.5,0));
        let preSp = this._imageList[this.m_preIndex];
        this.m_preBustPic.addChild(preSp);

        this.m_curBustPic.removeAllChildren(true);
        // this.m_curBustPic.setAnchorPoint(cc.v2(0.5,0));
        let curSp = this._imageList[this.m_curIndex];
        this.m_curBustPic.addChild(curSp);

        this.m_nextBustPic.removeAllChildren(true);
        // this.m_nextBustPic.setAnchorPoint(cc.v2(0.5,0));
        let nextSp = this._imageList[this.m_nextIndex];
        this.m_nextBustPic.addChild(nextSp);


        // this.pageView.removeAllPages();
        // let pagepreSp = this._imageList[this.m_preIndex];
        // this.pageView.addPage(pagepreSp);
        // let pagecurSp = this._imageList[this.m_curIndex];
        // this.pageView.addPage(pagecurSp);
        // let pagenextSp = this._imageList[this.m_nextIndex];
        // this.pageView.addPage(pagenextSp);
        // this.pageView.scrollToPage(this.m_curIndex);


    },

    _initImageList: function () {

        for (let i = 0; i < 5; i++) {
            let name = "slide" + i;
            let spNode = new cc.Node(name);
            spNode.addComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/img/scrollBackground/bg" + (i + 1) + ".png"));
            this._imageList.push(spNode);
        }

    },

    _scrollBannerView: function (direction) {

        let winSize = cc.director.getWinSize();
        let max_dt = 0.2;
        if (this._isSlideDirection === directValue.DIR_LEFT) {


            this.m_nextBustPic.stopAllActions();
            this.m_curBustPic.stopAllActions();
            let dt = max_dt * Math.abs(this.m_nextBustPic.x - winSize.width / 2.0) / (winSize.width / 2.0 + this._constWidth / 2);
            let moveTo = cc.moveTo(dt, cc.p(0, this.m_curBustPic.y));
            let moveTo2 = cc.moveTo(dt, cc.p(-this._constWidth / 2 - winSize.width / 2, this.m_curBustPic.y));
            this.m_nextBustPic.runAction(moveTo);
            this.m_curBustPic.runAction(cc.sequence(moveTo2, cc.callFunc(() => {
                this._updateBannerImage(this.m_curIndex);
            })));


        } else if (this._isSlideDirection === directValue.DIR_RIGHT) {

            this.m_preBustPic.stopAllActions();
            this.m_curBustPic.stopAllActions();
            let dt = max_dt * Math.abs(this.m_preBustPic.x - winSize.width / 2.0) / (winSize.width / 2.0 + this._constWidth / 2);
            let moveTo = cc.moveTo(dt, cc.p(0, this.m_curBustPic.y));
            let moveTo2 = cc.moveTo(dt, cc.p(this._constWidth / 2 + winSize.width / 2, this.m_curBustPic.y));
            this.m_preBustPic.runAction(moveTo);
            this.m_curBustPic.runAction(cc.sequence(moveTo2, cc.callFunc(() => {
                this._updateBannerImage(this.m_curIndex);
            })));

        } else {

        }
    },


    _updateBannerImage: function (currentIndex) {
        this.m_preBustPic.removeAllChildren(true);
        // this.m_preBustPic.setAnchorPoint(cc.v2(0.5,0));
        let preSp = this._imageList[this.m_preIndex];
        this.m_preBustPic.addChild(preSp);

        this.m_curBustPic.removeAllChildren(true);
        // this.m_curBustPic.setAnchorPoint(cc.v2(0.5,0));
        let curSp = this._imageList[this.m_curIndex];
        this.m_curBustPic.addChild(curSp);

        this.m_nextBustPic.removeAllChildren(true);
        // this.m_nextBustPic.setAnchorPoint(cc.v2(0.5,0));
        let nextSp = this._imageList[this.m_nextIndex];
        this.m_nextBustPic.addChild(nextSp);

    },


    pageViewEvent: function (event, customData) {
        let count = this._imageList.length;
        this.m_curIndex = this.m_preIndex;
        this.m_preIndex = (this.m_curIndex + count - 1) % count;
        this.m_nextIndex = (this.m_curIndex + count + 1) % count;
        this.pageView.removeAllPages();
        let preSp = this._imageList[this.m_preIndex];
        this.pageView.addPage(preSp);
        let curSp = this._imageList[this.m_curIndex];
        this.pageView.addPage(curSp);
        let nextSp = this._imageList[this.m_nextIndex];
        this.pageView.addPage(nextSp);

    },


    onDestroy: function () {

    }


});
