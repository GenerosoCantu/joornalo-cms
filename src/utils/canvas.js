export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })

export async function getCroppedImg(
  imageSrc,
  pixelCrop
) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return null
  }

  const imageWidth = 1280
  canvas.width = imageWidth
  canvas.height = pixelCrop.height / pixelCrop.width * imageWidth

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    canvas.width,
    canvas.height
  )

  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      file.name = 'image.jpeg';
      file.lastModified = new Date();
      return resolve(file)
    }, 'image/jpeg')
  })
}
