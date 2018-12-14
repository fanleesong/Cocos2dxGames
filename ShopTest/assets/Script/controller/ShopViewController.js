const JsonAdItem = require('jsonItem');
cc.Class({
    extends: cc.Component,

    properties: {

        _listenerId: -1,
        _itemData: null,
        itemPrefab: cc.Prefab,
        _itemArray: [],
        pageView: cc.PageView,
        scrollView: cc.ScrollView,
        _positionAll: [],
        pageControlRedNode: cc.Texture2D,
        pageControlYellowNode: cc.Texture2D,
        _curScrollViewPosition: cc.v2(0, 0),
        _pagePosAllArr: [],
        _isLeftToRight: true,
        _lastPageIndex: 0,
        _currentPageIndex: 0,

    },

    // use this for initialization
    onLoad: function () {

        this._registerTouchEvent();
        this._initItemData();
        this._initUIBtn();
        this._initScrollView();
        this._initPageView();


        this._autoChangePageView();
        this._scrollViewAutoChangePage();


    },

    _initUIBtn: function () {

        let btn01 = cc.find("buttonNode/btn01", this.node);
        let btn02 = cc.find("buttonNode/btn02", this.node);
        let btn03 = cc.find("buttonNode/btn03", this.node);

        btn01.on('click', (ev) => {
            console.log("......btn01.....");
            this._clickRecommendBtnEvent();
        });

        btn02.on('click', (ev) => {
            console.log("......btn02.....");
            this._clickLittlerHouseBtnEvent();
        });

        btn03.on('click', (ev) => {
            console.log("......btn03.....");
            this._clickMedalCollectBtnEvent();
        });

    },

    /****************************************************PageView自动翻页**********************************************************************/

    _initPageView: function () {

        this._pagePosAllArr = [];


        let pageView = cc.find("pageView", this.node);
        if (this._itemArray !== null) {
            for (let i = 0; i < this._itemArray.length; i++) {
                let pageViewContent = cc.instantiate(this.itemPrefab);
                pageViewContent.getComponent('ShopItem').initShopItemWithData(this._itemArray[i], i, () => {
                    console.log("下表是：" + i);
                });
                pageView.getComponent(cc.PageView).addPage(pageViewContent);
            }
        }
        let pageIndex = this.pageView.getComponent(cc.PageView).getCurrentPageIndex();
        cc.find('pageCode', this.node).getComponent(cc.Label).string = `PageView自动翻页>>>>第 ${pageIndex + 1} 页滚屏`;


    },

    /**
     * pageView 滑动翻页事件
     * @param event
     * @param custom
     */
    pageViewChangeEvent: function (event, custom) {
        let node = event.node;
        let pageIndex = node.getComponent(cc.PageView).getCurrentPageIndex();
        let count = this.pageView.getPages().length;
        console.log(`[ShopViewController]   page index:${pageIndex}` + "   \n" + cc.find("pageView/view/content", this.node).x);
        // if (pageIndex + 1 <= count) {
        //     cc.find('pageCode', this.node).getComponent(cc.Label).string = `PageView自动翻页>>>>第 ${pageIndex + 1} 页滚屏`;
        //     // console.log("[ShopViewController]---->第"+(pageIndex + 1)+"页: " + " x轴坐标： " + pageViewNode.x + " y轴坐标：" +pageViewNode.y);
        // }

    },

    _autoChangePageView: function () {

        // this.schedule(() => {
        //     let allPageCount = this.pageView.getPages().length;//一共多少页
        //     let index = this.pageView.getCurrentPageIndex();//取当前页下序号
        //     index = ((index < allPageCount) && (index + 1 !== allPageCount)) ? (index + 1) : 0;//为最后一页，index为0，否则+1
        //     this.pageView.setCurrentPageIndex(index);
        // }, 3);

        this._autoSlidePage();

    },

    _autoSlidePage: function () {

        this.schedule(() => {
            // let allPageCount = this.pageView.getPages().length;//一共多少页
            //             // let index = this.pageView.getCurrentPageIndex();//取当前页下序号
            //             // this._currentPageIndex = index;
            //             // console.log("---变换之前---index-->" + index + "    --> index+1 = " + (index + 1));
            //             // // index = ((index < allPageCount) && (index + 1 !== allPageCount)) ? (index + 1) : (index -1);//为最后一页，index为0，否则+1
            //             // this.pageView.setCurrentPageIndex(index);
            //             // this._lastPageIndex = index;
            //             // console.log("---变换之后---index-->" + index);


            // this._changeAddItem();

        }, 3);

    },

    _changeAddItem: function () {

        let allPageCount = this.pageView.getPages().length;//一共多少页
        this._currentPageIndex = this.pageView.getCurrentPageIndex();//取当前页下序号
        this._currentPageIndex++;
        this._controlAddFunc();

    },

    _controlAddFunc: function () {
        let allPageCount = this.pageView.getPages().length;//一共多少页
        if (this._currentPageIndex == allPageCount) {
            // this._currentPageIndex = 0;
            this._changeDelItem();
        }
        if (this._currentPageIndex == -1) {
            // this._currentPageIndex = allPageCount;
            this._changeAddItem();
        }
        this.pageView.setCurrentPageIndex(this._currentPageIndex);
    },

    _changeDelItem: function () {

        let allPageCount = this.pageView.getPages().length;//一共多少页
        this._currentPageIndex = this.pageView.getCurrentPageIndex();//取当前页下序号
        this._currentPageIndex--;
        this._controlDelFunc();

    },

    _controlDelFunc: function () {
        let allPageCount = this.pageView.getPages().length;//一共多少页
        if (this._currentPageIndex == allPageCount) {
            this._currentPageIndex = allPageCount - 1;
            this._changeDelItem();
        }
        if (this._currentPageIndex == -1) {
            this._currentPageIndex = 0;
            this._changeAddItem();
        }
        this.pageView.setCurrentPageIndex(this._currentPageIndex);
    },


    /****************************************************PageView自动翻页**********************************************************************/


    /****************************************************ScrollView自动翻页**********************************************************************/

    _initScrollView: function () {

        if (this._itemArray !== null) {
            for (let i = 0; i < this._itemArray.length; i++) {
                let pageViewContent = cc.instantiate(this.itemPrefab);
                pageViewContent.getComponent('ShopItem').initShopItemWithData(this._itemArray[i], i, () => {
                    console.log("下标为：" + i);
                });
                this.scrollView.content.addChild(pageViewContent);
            }

            let content = cc.find("scrollView/view/content", this.node);
            // let paddingValue = content.getComponent(cc.Layout).paddingLeft;
            let spacingX = content.getComponent(cc.Layout).spacingX;
            let itemWidth = content.children[0].getContentSize().width;
            let allWidth = (content.childrenCount * itemWidth + spacingX * (content.childrenCount + 1)) / 2;
            for (let index = 0; index < content.childrenCount; index++) {
                let posX = allWidth - ((itemWidth / 2) * (1 + 2 * index)) - (spacingX * (index + 1));
                this._positionAll.push(cc.v2(posX, 0));
            }
            content.setPosition(this._positionAll[0]);
//[{"x":1878,"y":0},{"x":1252,"y":0},{"x":626,"y":0},{"x":0,"y":0},{"x":-626,"y":0},{"x":-1252,"y":0},{"x":-1878,"y":0}]
            cc.find("scrollViewLabel", this.node).getComponent(cc.Label).string = "以下ScrollView自动翻页 >>> 第 1 页";
            console.log("子节点数：" + content.childrenCount + "   paddingValue:  " + spacingX + "  allWidth: " + allWidth + "\n->Position:   " + JSON.stringify(this._positionAll));

            this._addScrollViewPageControlNode();


        }

    }
    ,

//[{"x":1878,"y":0},{"x":1252,"y":0},{"x":626,"y":0},{"x":0,"y":0},{"x":-626,"y":0},{"x":-1252,"y":0},{"x":-1878,"y":0}]
    scrollViewChangeEvent: function (event, custom) {
        // let node = event.node;
        // let content = cc.find("scrollView/view/content", this.node);
        // console.log("[scrollViewChangeEvent]---->content  x轴坐标： " + content.x + " y轴坐标：" + content.y);
        // console.log("[scrollViewChangeEvent]---->位置数组：   " + JSON.stringify(this._positionAll));

    }
    ,


    _scrollViewAutoChangePage: function () {

        let allPageCount = this._positionAll.length;//一共多少页
        let index = this._findIndexByPosition(this.scrollView.getContentPosition());//取当前页下序号
        this.schedule(() => {
            // console.log("上一页为：" + (index+1) + " 页" + "  老坐标： " + JSON.stringify(this._findPositionByIndex(index)));
            index = ((index < allPageCount) && (index + 1 !== allPageCount)) ? (index + 1) : 0;//为最后一页，index为0，否则+1
            let finalPos = this._findPositionByIndex(index);
            // console.log("翻到第：" + (index+1) + " 页     自动切换到的坐标位置： " + JSON.stringify(finalPos));
            this.scrollView.content.runAction(cc.moveTo(0.5, finalPos));
            this._curScrollViewPosition = finalPos;
            this._setScrollViewPageLight(index);//底部pageControl 处理
            cc.find("scrollViewLabel", this.node).getComponent(cc.Label).string = "以下ScrollView自动翻页 >>> 第 " + (index + 1) + " 页";
        }, 3);

    }
    ,

    _findIndexByPosition: function (sourcePos) {
        for (let i = 0; i < this._positionAll.length; i++) {
            let m_pos = this._positionAll[i];
            return ((m_pos.x === sourcePos.x && m_pos.y === sourcePos) ? i : 0);
        }
    }
    ,

    _findPositionByIndex: function (index) {
        if (index >= 0 && index < this.scrollView.content.childrenCount) return this._positionAll[index];
        return cc.v2(0, 0);
    }
    ,


    _addScrollViewPageControlNode: function () {

        cc.find("scrollView/pageNode", this.node).removeAllChildren(true);
        let middleAlign = 10;
        let pageNode = cc.find("scrollView/pageNode", this.node);
        pageNode.setPositionX(0);
        let nodeWidth = 15;
        let nodeHeight = 15;
        let totalPagesNum = this.scrollView.content.childrenCount;
        let width = totalPagesNum * nodeWidth + (totalPagesNum - 1) * middleAlign;
        pageNode.setContentSize(cc.size(width, nodeHeight));
        for (let i = 0; i < totalPagesNum; i++) {
            // cc.loader.loadRes('img/page02', cc.SpriteFrame, function (err, spriteFrame) {
            //     let nodeName = 'page' + i;
            //     let node = new cc.Node(nodeName);
            //     const sprite = node.addComponent(cc.Sprite);
            //     sprite.spriteFrame = spriteFrame;
            //     let halfWidth = node.width / 2;
            //     let posX = middleAlign * i + (2 * i + 1) * halfWidth;
            //     node.setPosition(cc.p(posX, 0));
            //     pageNode.addChild(node);
            // });

            let nodeName = 'page' + i;
            let node = new cc.Node(nodeName);
            const sprite = node.addComponent(cc.Sprite);
            sprite.spriteFrame = new cc.SpriteFrame(this.pageControlYellowNode);
            let halfWidth = node.width / 2;
            let posX = middleAlign * i + (2 * i + 1) * halfWidth;
            node.setPosition(cc.p(posX, 0));
            pageNode.addChild(node);

        }
        pageNode.setPositionX(pageNode.getPositionX() - pageNode.width / 2);
        this._setScrollViewPageLight(0);


    }
    ,

    /** 
     * * 点亮pageNode小页签变为黄色
     * * @private 
     *
     * */
    _setScrollViewPageLight: function (currentIndex) {

        let pageNode = cc.find("scrollView/pageNode", this.node);
        if (currentIndex <= pageNode.childrenCount && currentIndex >= 0) {
            for (let i = 0; i < pageNode.childrenCount; i++) {
                if (currentIndex !== i) {
                    let tempNode = pageNode.children[i];
                    tempNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.pageControlYellowNode);
                }
            }
            pageNode.children[currentIndex].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.pageControlRedNode);
        }
        // cc.loader.loadRes("img/page01", cc.SpriteFrame, function (err, spFrame) {
        //     let node = pageNode.children[currentIndex];
        //     node.getComponent(cc.Sprite).spriteFrame = spFrame;
        // });

    }
    ,

    /****************************************************ScrollView自动翻页**********************************************************************/


    onDestroy: function () {

        cc.eventManager.removeListener(this._listenerId);

    }
    ,


    _clickRecommendBtnEvent: function () {

    }
    ,

    _clickLittlerHouseBtnEvent: function () {

    }
    ,

    _clickMedalCollectBtnEvent: function () {

    }
    ,

    _initItemData: function () {


        this._itemArray = JsonAdItem;

    }
    ,

    _registerTouchEvent: function () {

        let listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touches, event) {
                return true;
            },
            onTouchMoved: function (touches, event) {
            },
            onTouchEnded: function (touches, event) {

                //获取手指触摸结束时的位置
                let location = touches.getLocation();
                let real = cc.director.getScene().convertToNodeSpace(location);
                console.log("结束点location： " + JSON.stringify(location) + "    real:  " + real);


            }
        };

        this._listenerId = cc.eventManager.addListener(listener, this.node);
    }
    ,


})
;

/**
 *
 * 参考思路
 * https://blog.csdn.net/chenhezhuyan/article/details/52825414
 1)在UIScrollView上面添加3个UIImageView，分别为leftImageView,centerImageView,RightImageView
 2)UIScrollView初始化时，contentOffset停留在中间的UIImageView
 3)使用一个定时器，定时器触发是，把contentOffset从中间通过动画滑动到第三个UIImageView的位置
 4)滑动完成时候，要进行最关键的复位操作，就是迅速把contentOffset切换回第二个UIImageView的位置，
 但是切换前，先centerImageView.image = rightjImageView.image,注意，这里不适用动画，所以用户看不出来切换了
 5）下次定时器触发时，又把contentOffset从第二个位置通过动画滑动到第三个位置
 6）事实上2个UIImageView就可以实现，但是左边一直有一个提供用户手动向左滑动
 *
 */
