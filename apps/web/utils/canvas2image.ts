const ImageType = {
   PNG: 'image/png',
} as const

type ImageTypeValue = (typeof ImageType)[keyof typeof ImageType]

interface Parameters {
   canvas: HTMLCanvasElement
   scale?: number // Optional, defaults to 1 if not provided
   imageType?: ImageTypeValue // Optional, defaults to PNG
   name?: string // Optional, defaults to 'canvas_image'
}

export function canvas2scale(
   canvas: HTMLCanvasElement,
   scale = 1
): HTMLCanvasElement {
   const newCanvas = document.createElement('canvas')
   const newCtx = newCanvas.getContext('2d')

   if (!newCtx) throw new Error('Unable to get canvas context')

   newCanvas.width = canvas.width * scale
   newCanvas.height = canvas.height * scale

   newCtx.scale(scale, scale)
   newCtx.drawImage(canvas, 0, 0)

   return newCanvas
}

export function canvas2image({
   canvas,
   scale = 1,
   imageType = ImageType.PNG,
   name = 'canvas_image',
}: Parameters): void {
   const newCanvas = canvas2scale(canvas, scale)

   const link = document.createElement('a')
   link.download = `${name}.${imageType.split('/')[1]}`
   link.href = newCanvas.toDataURL(imageType)
   link.click()
   link.remove()

   newCanvas.remove()
}
