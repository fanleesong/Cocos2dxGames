/// <reference path="GObjectPool.ts" />

namespace fgui {

    export class GLoader extends GObject {
        public _content: MovieClip;

        private _url: string;
        private _align: AlignType;
        private _verticalAlign: VertAlignType;
        private _autoSize: boolean;
        private _fill: LoaderFillType;
        private _shrinkOnly: boolean;
        private _showErrorSign: boolean;
        private _playing: boolean;
        private _frame: number = 0;
        private _color: cc.Color;

        private _contentItem: PackageItem;
        private _contentSourceWidth: number = 0;
        private _contentSourceHeight: number = 0;
        private _contentWidth: number = 0;
        private _contentHeight: number = 0;

        private _container: cc.Node;
        private _errorSign: GObject;
        private _content2: GComponent;

        private _updatingLayout: boolean;

        private static _errorSignPool: GObjectPool = new GObjectPool();

        public constructor() {
            super();

            this._node.name = "GLoader";
            this._playing = true;
            this._url = "";
            this._fill = LoaderFillType.None;
            this._align = AlignType.Left;
            this._verticalAlign = VertAlignType.Top;
            this._showErrorSign = true;
            this._color = cc.Color.WHITE;

            this._container = new cc.PrivateNode("Image");
            this._node.addChild(this._container);

            this._content = this._container.addComponent(MovieClip);
        }

        public dispose(): void {
            if (this._contentItem == null) {
                if (this._content.spriteFrame != null)
                    this.freeExternal(this._content.spriteFrame);
            }
            if (this._content2 != null)
                this._content2.dispose();
            super.dispose();
        }

        public get url(): string {
            return this._url;
        }

        public set url(value: string) {
            if (this._url == value)
                return;

            this._url = value;
            this.loadContent();
            this.updateGear(7);
        }

        public get icon(): string {
            return this._url;
        }

        public set icon(value: string) {
            this.url = value;
        }

        public get align(): AlignType {
            return this._align;
        }

        public set align(value: AlignType) {
            if (this._align != value) {
                this._align = value;
                this.updateLayout();
            }
        }

        public get verticalAlign(): VertAlignType {
            return this._verticalAlign;
        }

        public set verticalAlign(value: VertAlignType) {
            if (this._verticalAlign != value) {
                this._verticalAlign = value;
                this.updateLayout();
            }
        }

        public get fill(): LoaderFillType {
            return this._fill;
        }

        public set fill(value: LoaderFillType) {
            if (this._fill != value) {
                this._fill = value;
                this.updateLayout();
            }
        }

        public get shrinkOnly(): boolean {
            return this._shrinkOnly;
        }

        public set shrinkOnly(value: boolean) {
            if (this._shrinkOnly != value) {
                this._shrinkOnly = value;
                this.updateLayout();
            }
        }

        public get autoSize(): boolean {
            return this._autoSize;
        }

        public set autoSize(value: boolean) {
            if (this._autoSize != value) {
                this._autoSize = value;
                this.updateLayout();
            }
        }

        public get playing(): boolean {
            return this._playing;
        }

        public set playing(value: boolean) {
            if (this._playing != value) {
                this._playing = value;
                if (this._content instanceof MovieClip)
                    (<MovieClip>this._content).playing = value;
                this.updateGear(5);
            }
        }

        public get frame(): number {
            return this._frame;
        }

        public set frame(value: number) {
            if (this._frame != value) {
                this._frame = value;
                if (this._content instanceof MovieClip)
                    (<MovieClip>this._content).frame = value;
                this.updateGear(5);
            }
        }

        public get timeScale(): number {
            if (this._content instanceof MovieClip)
                return (<MovieClip>this._content).timeScale;
            else
                return 1;
        }

        public set timeScale(value: number) {
            if (this._content instanceof MovieClip)
                (<MovieClip>this._content).timeScale = value;
        }

        public advance(timeInMiniseconds: number): void {
            if (this._content instanceof MovieClip)
                (<MovieClip>this._content).advance(timeInMiniseconds);
        }

        public get color(): cc.Color {
            return this._color;
        }

        public set color(value: cc.Color) {
            if (this._color != value) {
                this._color = value;
                this.updateGear(4);
                this._container.color = value;
            }
        }

        public get fillMethod(): FillMethod {
            return this._content.fillMethod;
        }

        public set fillMethod(value: FillMethod) {
            this._content.fillMethod = value;
        }

        public get fillOrigin(): FillOrigin {
            return this._content.fillOrigin;
        }

        public set fillOrigin(value: FillOrigin) {
            this._content.fillOrigin = value;
        }

        public get fillClockwise(): boolean {
            return this._content.fillClockwise;
        }

        public set fillClockwise(value: boolean) {
            this._content.fillClockwise = value;
        }

        public get fillAmount(): number {
            return this._content.fillAmount;
        }

        public set fillAmount(value: number) {
            this._content.fillAmount = value;
        }

        public get showErrorSign(): boolean {
            return this._showErrorSign;
        }

        public set showErrorSign(value: boolean) {
            this._showErrorSign = value;
        }

        public get component(): GComponent {
            return this._content2;
        }

        public get texture(): cc.SpriteFrame {
            return this._content.spriteFrame;
        }

        public set texture(value: cc.SpriteFrame) {
            this.url = null;

            this._content.spriteFrame = value;
            this._content.type = cc.Sprite.Type.SIMPLE;
            if (value != null) {
                this._contentSourceWidth = value.getRect().width;
                this._contentSourceHeight = value.getRect().height;
            }
            else {
                this._contentSourceWidth = this._contentHeight = 0;
            }

            this.updateLayout();
        }

        protected loadContent(): void {
            this.clearContent();

            if (!this._url)
                return;

            if (ToolSet.startsWith(this._url, "ui://"))
                this.loadFromPackage(this._url);
            else
                this.loadExternal();
        }

        protected loadFromPackage(itemURL: string) {
            this._contentItem = UIPackage.getItemByURL(itemURL);
            if (this._contentItem != null) {
                this._contentItem.load();

                if (this._autoSize)
                    this.setSize(this._contentItem.width, this._contentItem.height);

                if (this._contentItem.type == PackageItemType.Image) {
                    if (!this._contentItem.asset) {
                        this.setErrorState();
                    }
                    else {
                        this._content.spriteFrame = <cc.SpriteFrame>this._contentItem.asset;
                        if (this._contentItem.scale9Grid)
                            this._content.type = cc.Sprite.Type.SLICED;
                        else if (this._contentItem.scaleByTile)
                            this._content.type = cc.Sprite.Type.TILED;
                        else
                            this._content.type = cc.Sprite.Type.SIMPLE;
                        this._contentSourceWidth = this._contentItem.width;
                        this._contentSourceHeight = this._contentItem.height;
                        this.updateLayout();
                    }
                }
                else if (this._contentItem.type == PackageItemType.MovieClip) {
                    this._contentSourceWidth = this._contentItem.width;
                    this._contentSourceHeight = this._contentItem.height;
                    this._content.interval = this._contentItem.interval;
                    this._content.swing = this._contentItem.swing;
                    this._content.repeatDelay = this._contentItem.repeatDelay;
                    this._content.frames = this._contentItem.frames;
                    this.updateLayout();
                }
                else if (this._contentItem.type == PackageItemType.Component) {
                    var obj: GObject = UIPackage.createObjectFromURL(itemURL);
                    if (!obj)
                        this.setErrorState();
                    else if (!(obj instanceof GComponent)) {
                        obj.dispose();
                        this.setErrorState();
                    }
                    else {
                        this._content2 = obj.asCom;
                        this._container.addChild(this._content2.node);
                        this._contentSourceWidth = this._contentItem.width;
                        this._contentSourceHeight = this._contentItem.height;
                        this.updateLayout();
                    }
                }
                else
                    this.setErrorState();
            }
            else
                this.setErrorState();
        }

        protected loadExternal(): void {
            cc.loader.loadRes(this._url, cc.Asset, this.onLoaded.bind(this));
        }

        private onLoaded(err, asset): void {
            //因为是异步返回的，而这时可能url已经被改变，所以不能直接用返回的结果

            if (!this._url || !cc.isValid(this._node))
                return;

            asset = cc.loader.getRes(this._url);
            if (!asset)
                return;

            if (asset instanceof cc.SpriteFrame)
                this.onExternalLoadSuccess(<cc.SpriteFrame>asset);
            else if (asset instanceof cc.Texture2D)
                this.onExternalLoadSuccess(new cc.SpriteFrame(asset));
        }

        protected freeExternal(texture: cc.SpriteFrame): void {
        }

        protected onExternalLoadSuccess(texture: cc.SpriteFrame): void {
            this._content.spriteFrame = texture;
            this._content.type = cc.Sprite.Type.SIMPLE;
            this._contentSourceWidth = texture.getRect().width;
            this._contentSourceHeight = texture.getRect().height;
            this.updateLayout();
        }

        protected onExternalLoadFailed(): void {
            this.setErrorState();
        }

        private setErrorState(): void {
            if (!this._showErrorSign)
                return;

            if (this._errorSign == null) {
                if (UIConfig.loaderErrorSign != null) {
                    this._errorSign = GLoader._errorSignPool.getObject(UIConfig.loaderErrorSign);
                }
            }

            if (this._errorSign != null) {
                this._errorSign.setSize(this.width, this.height);
                this._container.addChild(this._errorSign.node);
            }
        }

        private clearErrorState(): void {
            if (this._errorSign != null) {
                this._container.removeChild(this._errorSign.node);
                GLoader._errorSignPool.returnObject(this._errorSign);
                this._errorSign = null;
            }
        }

        private updateLayout(): void {
            if (this._content2 == null && this._content == null) {
                if (this._autoSize) {
                    this._updatingLayout = true;
                    this.setSize(50, 30);
                    this._updatingLayout = false;
                }
                return;
            }

            this._contentWidth = this._contentSourceWidth;
            this._contentHeight = this._contentSourceHeight;

            if (this._autoSize) {
                this._updatingLayout = true;
                if (this._contentWidth == 0)
                    this._contentWidth = 50;
                if (this._contentHeight == 0)
                    this._contentHeight = 30;

                this.setSize(this._contentWidth, this._contentHeight);
                this._updatingLayout = false;

                this._container.setContentSize(this._width, this._height);
                if (this._content2 != null)
                    this._content2.setPosition(0, -this._height);

                if (this._contentWidth == this._width && this._contentHeight == this._height)
                    return;
            }

            var sx: number = 1, sy: number = 1;
            if (this._fill != LoaderFillType.None) {
                sx = this.width / this._contentSourceWidth;
                sy = this.height / this._contentSourceHeight;

                if (sx != 1 || sy != 1) {
                    if (this._fill == LoaderFillType.ScaleMatchHeight)
                        sx = sy;
                    else if (this._fill == LoaderFillType.ScaleMatchWidth)
                        sy = sx;
                    else if (this._fill == LoaderFillType.Scale) {
                        if (sx > sy)
                            sx = sy;
                        else
                            sy = sx;
                    }
                    else if (this._fill == LoaderFillType.ScaleNoBorder) {
                        if (sx > sy)
                            sy = sx;
                        else
                            sx = sy;
                    }
                    if (this._shrinkOnly) {
                        if (sx > 1)
                            sx = 1;
                        if (sy > 1)
                            sy = 1;
                    }
                    this._contentWidth = this._contentSourceWidth * sx;
                    this._contentHeight = this._contentSourceHeight * sy;
                }
            }

            this._container.setContentSize(this._contentWidth, this._contentHeight);
            if (this._content2 != null)
                this._content2.setScale(sx, sy);

            var nx: number, ny: number;
            if (this._align == AlignType.Center)
                nx = 0;
            else if (this._align == AlignType.Right)
                nx = Math.floor((this.width - this._contentWidth) / 2);
            else
                nx = -Math.floor((this.width - this._contentWidth) / 2);

            if (this._verticalAlign == VertAlignType.Middle)
                ny = 0;
            else if (this._verticalAlign == VertAlignType.Bottom)
                ny = -Math.floor((this._height - this._contentHeight) / 2);
            else
                ny = Math.floor((this._height - this._contentHeight) / 2);

            this._container.setPosition(nx, ny);
        }

        private clearContent(): void {
            this.clearErrorState();

            if (this._contentItem == null) {
                var texture: cc.SpriteFrame = this._content.spriteFrame;
                if (texture != null)
                    this.freeExternal(texture);
            }
            if (this._content2 != null) {
                this._container.removeChild(this._content2.node);
                this._content2.dispose();
                this._content2 = null;
            }
            this._contentItem = null;
        }

        protected handleSizeChanged(): void {
            super.handleSizeChanged();

            if (!this._updatingLayout)
                this.updateLayout();
        }

        protected handleGrayedChanged(): void {
            this._content.setState(this._grayed ? cc.Sprite.State.GRAY : cc.Sprite.State.NORMAL);
        }

        public setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void {
            super.setup_beforeAdd(buffer, beginPos);

            buffer.seek(beginPos, 5);

            this._url = buffer.readS();
            this._align = buffer.readByte();
            this._verticalAlign = buffer.readByte();
            this._fill = buffer.readByte();
            this._shrinkOnly = buffer.readBool();
            this._autoSize = buffer.readBool();
            this._showErrorSign = buffer.readBool();
            this._playing = buffer.readBool();
            this._frame = buffer.readInt();

            if (buffer.readBool())
                this.color = buffer.readColor();
            this._content.fillMethod = buffer.readByte();
            if (this._content.fillMethod != 0) {

                this._content.fillOrigin = buffer.readByte();
                this._content.fillClockwise = buffer.readBool();
                this._content.fillAmount = buffer.readFloat();
            }

            if (this._url)
                this.loadContent();
        }
    }
}