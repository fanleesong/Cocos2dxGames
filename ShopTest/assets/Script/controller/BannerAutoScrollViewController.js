const slideDirect = cc.Enum({
    LEFT: 0,
    RIGHT: 1,
    CENTER: 2,
});

cc.Class({
    extends: cc.Component,

    properties: {
        imageViewPrefab: cc.Prefab,
        scrollView: cc.ScrollView,
        scrollViewContent: cc.Node,
        pageView: cc.PageView,
        tempImage: cc.Texture2D,
        _scrollViewList: [cc.Prefab],
        _leftBannerPrefab: cc.Prefab,
        _centerBannerPrefab: cc.Prefab,
        _rightBannerPrefab: cc.Prefab,
        _currentPageIndex: 0,
        _bannerWith: 0,
        _isSlideDirection: cc.Enum,
    },

    onLoad: function () {

        cc.find('ScrollView', this.node).on('LEFT', (event) => {
            console.log("[BannerAutoScrollView]------------->左滑动");
            this._slideLeftDirection();
            // this._isSlideDirection = slideDirect.LEFT;
        });

        cc.find('ScrollView', this.node).on('RIGHT', (event) => {
            console.log("[BannerAutoScrollView]------------->右滑动");
            this._slideRightDirection();
            // this._isSlideDirection = slideDirect.RIGHT;
        });

        cc.find('ScrollView', this.node).on('CENTER', (event) => {
            console.log("[BannerAutoScrollView]------------->无滑动");
            this._isSlideDirection = slideDirect.CENTER;
        });

        this._initUI();
    },

    _initUI: function () {

        for (let i = 0; i < 4; i++) {
            let prefab = cc.instantiate(this.imageViewPrefab);
            prefab.getComponent('ImageView').initUIWithData(`数组中第 ${i + 1} 个元素`);
            this._scrollViewList.push(prefab);
        }
        this._bannerWith = cc.find('ScrollView/view', this.node).width;
        this._currentPageIndex = 0;
        this._leftBannerPrefab = this._getBannerAdPrefabBeforeIndex(this._currentPageIndex);
        this._centerBannerPrefab = this._getBannerAdPrefabAtIndex(this._currentPageIndex);
        this._rightBannerPrefab = this._getBannerAdPrefabAfterIndex(this._currentPageIndex);
        this.scrollViewContent.addChild(this._leftBannerPrefab);
        this.scrollViewContent.addChild(this._centerBannerPrefab);
        this.scrollViewContent.addChild(this._rightBannerPrefab);

        this.scheduleOnce(() => {

            this.scrollView.scrollToOffset(cc.v2(this._centerBannerPrefab.width, 0));
        }, 0);


        // this.schedule(()=>{
        //     this.node.runAction(cc.sequence(cc.callFunc(() => {
        //             console.log("------下标之前---" + this._currentPageIndex);
        //             this._currentPageIndex++;
        //             if (this._currentPageIndex == this._scrollViewList.length) {
        //                 this._currentPageIndex = 0;
        //             }
        //             console.log("------下标之后---" + this._currentPageIndex);
        //             this.scrollView.scrollToOffset(cc.v2(this._bannerWith * 2, 0),2);
        //         }),
        //         cc.callFunc(() => {
        //             ///滑动完成后，把当前现实的imageview重现移动回中间位置，此处不能使用动画，用户感觉不到
        //             ///移动前,先把中间imageview的image设置成当前现实的iamge
        //             this._leftBannerPrefab = this._centerBannerPrefab;
        //             this._centerBannerPrefab = this._rightBannerPrefab;
        //             this.scrollView.scrollToOffset(cc.v2(this._bannerWith * 1, 0));
        //             this._rightBannerPrefab = this._getBannerAdPrefabAfterIndex(this._currentPageIndex);
        //
        //             this.node.runAction(cc.sequence(cc.callFunc(() => {
        //                 this.scrollViewContent.removeAllChildren(true);
        //             }), cc.callFunc(() => {
        //                 this.scrollViewContent.addChild(this._leftBannerPrefab);
        //                 this.scrollViewContent.addChild(this._centerBannerPrefab);
        //                 this.scrollViewContent.addChild(this._rightBannerPrefab);
        //             })));
        //
        //         })));
        //
        // },3);

        let seq = cc.sequence(cc.delayTime(3),cc.callFunc(()=>{

            this._currentPageIndex++;
            if (this._currentPageIndex == this._scrollViewList.length) {
                this._currentPageIndex = 0;
            }
            console.log("------下标之后---" + this._currentPageIndex);
            this.scrollView.scrollToOffset(cc.v2(this._bannerWith * 2, 0),2);

        }),cc.callFunc(()=>{

            ///滑动完成后，把当前现实的imageview重现移动回中间位置，此处不能使用动画，用户感觉不到
            ///移动前,先把中间imageview的image设置成当前现实的iamge
            this._leftBannerPrefab = this._centerBannerPrefab;
            this._centerBannerPrefab = this._rightBannerPrefab;
            this.scrollView.scrollToOffset(cc.v2(this._bannerWith * 1, 0));
            this._rightBannerPrefab = this._getBannerAdPrefabAfterIndex(this._currentPageIndex);

            this.node.runAction(cc.sequence(cc.callFunc(() => {
                this.scrollViewContent.removeAllChildren(true);
            }), cc.callFunc(() => {
                this.scrollViewContent.addChild(this._leftBannerPrefab);
                this.scrollViewContent.addChild(this._centerBannerPrefab);
                this.scrollViewContent.addChild(this._rightBannerPrefab);
            })));

        }));

        this.node.runAction(cc.repeatForever(seq));

    },

    scrollViewFinishCallbackEvent: function (event, custom) {
        let node = event.node;
        // let pos = node.getComponent(cc.ScrollView).getContentPosition();
        // console.log("[scrollViewFinishCallbackEvent]---->坐标：" + JSON.stringify(pos) + "    自动定义：" + JSON.stringify(custom))

    },

    _slideLeftDirection: function () {
        this.node.runAction(cc.sequence(cc.callFunc(() => {
                this._currentPageIndex++;
                if (this._currentPageIndex == this._scrollViewList.length) {
                    this._currentPageIndex = 0;
                }
                this.scrollView.scrollToOffset(cc.v2(this._bannerWith * 2, 0),3);
            }),
            cc.callFunc(() => {
                ///滑动完成后，把当前现实的imageview重现移动回中间位置，此处不能使用动画，用户感觉不到
                ///移动前,先把中间imageview的image设置成当前现实的iamge
                this._leftBannerPrefab = this._centerBannerPrefab;
                this._centerBannerPrefab = this._rightBannerPrefab;
                this.scrollView.scrollToOffset(cc.v2(this._bannerWith * 1, 0));
                this._rightBannerPrefab = this._getBannerAdPrefabAfterIndex(this._currentPageIndex);

                this.node.runAction(cc.sequence(cc.callFunc(() => {
                    this.scrollViewContent.removeAllChildren(true);
                }), cc.callFunc(() => {
                    this.scrollViewContent.addChild(this._leftBannerPrefab);
                    this.scrollViewContent.addChild(this._centerBannerPrefab);
                    this.scrollViewContent.addChild(this._rightBannerPrefab);
                })));

            })));
    },

    _slideRightDirection: function () {
        //
        // this.node.runAction(cc.sequence(cc.callFunc(() => {
        //         this._currentPageIndex--;
        //         if (this._currentPageIndex < 0) {
        //             this._currentPageIndex = this._scrollViewList.length;
        //         }
        //         this.scrollView.scrollToOffset(cc.v2(this._bannerWith * 1, 0));
        //     }),
        //     cc.callFunc(() => {
        //         ///滑动完成后，把当前现实的imageview重现移动回中间位置，此处不能使用动画，用户感觉不到
        //         ///移动前,先把中间imageview的image设置成当前现实的iamge
        //         this._rightBannerPrefab = this._centerBannerPrefab;
        //         this._centerBannerPrefab = this._leftBannerPrefab;
        //         this.scrollView.scrollToOffset(cc.v2(this._bannerWith * 1, 0));
        //         this._leftBannerPrefab = this._getBannerAdPrefabBeforeIndex(this._currentPageIndex);
        //
        //         this.node.runAction(cc.sequence(cc.callFunc(() => {
        //             this.scrollViewContent.removeAllChildren(true);
        //         }), cc.callFunc(() => {
        //             this.scrollViewContent.removeAllChildren(true);
        //             this.scrollViewContent.addChild(this._leftBannerPrefab);
        //             this.scrollViewContent.addChild(this._centerBannerPrefab);
        //             this.scrollViewContent.addChild(this._rightBannerPrefab);
        //         })));
        //
        //     })));


    },

    _slideCenterDirection: function () {
        this.scrollView.scrollToOffset(this._getBannerCenterOffset());
    },

    _commonFuc: function () {
        // this.scrollView.stopAutoScroll();
        let index = this.scrollView.getScrollOffset().x / this._bannerWith;
        if (index == 0) {
            //向左滑动
            this._currentPageIndex--;
            console.log("[BannerAutoScrollView]------------->left-------" + this._currentPageIndex);
            if (this._currentPageIndex < 0) {
                this._currentPageIndex = this._scrollViewList.length;
            }
            this._rightBannerPrefab = this._centerBannerPrefab;
            this._centerBannerPrefab = this._leftBannerPrefab;
            this.scrollView.scrollToOffset(cc.v2(this._bannerWith * 1, 0));
            this._leftBannerPrefab = this._getBannerAdPrefabBeforeIndex(this._currentPageIndex);
        } else if (index == 2) {
            ///向右滑动
            this._currentPageIndex++;
            console.log("[BannerAutoScrollView]------------->right-------" + this._currentPageIndex);
            if (this._currentPageIndex == this._scrollViewList.length) {
                this._currentPageIndex = 0;
            }
            this._leftBannerPrefab = this._centerBannerPrefab;
            this._centerBannerPrefab = this._rightBannerPrefab;
            this.scrollView.scrollToOffset(cc.v2(this._bannerWith * 1, 0));
            this._rightBannerPrefab = this._getBannerAdPrefabAfterIndex(this._currentPageIndex);
        }
    },


    _getBannerLeftOffset: function (index) {
        if (index === 0) {
            return cc.v2(this._bannerWith * (this._scrollViewList.length - 1), 0);
        } else {
            return cc.v2(this._bannerWith * (index - 1), 0);
        }
    },

    _getBannerRightOffset: function (index) {

        if (index === (this._scrollViewList.length - 1)) {
            return cc.v2(this._bannerWith * 0, 0);
        } else {
            return cc.v2(this._bannerWith * (index + 1), 0);
        }
    },

    _getBannerCenterOffset: function (index) {
        if (index < 0 || index >= this._scrollViewList.length) {
            return cc.Vec2.ZERO;
        } else {
            return cc.v2(this._bannerWith * index, 0);
        }
    },


    _getBannerAdPrefabBeforeIndex: function (index) {
        if (index === 0) {
            return this._scrollViewList[this._scrollViewList.length - 1];
        } else {
            return this._scrollViewList[index - 1];
        }
    },

    _getBannerAdPrefabAtIndex: function (index) {
        if (index < 0 || index >= this._scrollViewList.length) {
            return null;
        } else {
            return this._scrollViewList[index];
        }
    },

    _getBannerAdPrefabAfterIndex: function (index) {
        if (index === (this._scrollViewList.length - 1)) {
            return this._scrollViewList[0];
        } else {
            return this._scrollViewList[index + 1];
        }
    },


});
