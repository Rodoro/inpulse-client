import * as THREE from 'three';

export class Drawer {
	public texture
	public aspect

	private _ctx
	private readonly _margin = 130
	private readonly _mh = 35

	constructor(private _text1: string, private _text2: string, private _text3: string) {
		const canvas = document.createElement('canvas')
		canvas.width = 1024
		canvas.height = canvas.width / 2.2
		this._ctx = canvas.getContext('2d')!
		this.aspect = canvas.width / canvas.height
		this.texture = new THREE.CanvasTexture(canvas)
	}

	draw = () => {
		const ctx = this._ctx
		const { width, height } = this._ctx.canvas

		ctx.clearRect(0, 0, width, height)

		const fontSize = window.innerWidth <= 512 ? 24 : 62

		ctx.textAlign = 'left'
		ctx.textBaseline = 'hanging'

		ctx.font = `bold ${fontSize}px Unbounded`
		ctx.fillStyle = '#fff'

		const text1Metrics = ctx.measureText(this._text1)
		const text2Metrics = ctx.measureText(this._text2)
		const text3Metrics = ctx.measureText(this._text3)
		if (window.innerWidth <= 512) {
			console.log(width, text2Metrics.width)
			ctx.fillText(this._text1, (width - text1Metrics.width) / 2, this._margin)
			ctx.fillText(this._text2, (width - text2Metrics.width) / 2, this._margin + fontSize + this._mh)
			ctx.fillText(this._text3, (width - text3Metrics.width) / 2, this._margin + (fontSize + this._mh) * 2)
		} else {
			ctx.fillText(this._text1, (this._margin) / 2 + 20, this._margin)
			ctx.fillText(this._text2, (width - text2Metrics.width) / 2, this._margin + fontSize + this._mh)
			ctx.fillText(this._text3, width - text3Metrics.width - this._margin, this._margin + (fontSize + this._mh) * 2)
		}

		// ctx.lineWidth = 3
		// ctx.strokeStyle = '#f00'
		// ctx.strokeRect(0, 0, width, height)
	}
}
