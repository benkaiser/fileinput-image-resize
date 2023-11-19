/**
 * The goal of this file is to process these input tags:
 * <input type="file" data-max-width="500" data-max-height="500" data-quality="90" data-format="webp" />
 * by listening to the file change and processing the image on the client.
 */

const load = (url: string): Promise<HTMLImageElement> => {
  return new Promise<HTMLImageElement>((fulfill, _reject) => {
    let imageObj = new Image();

    imageObj.onload = () => fulfill(imageObj);
    imageObj.src = url;
  });
};

function onChangeImage(input: HTMLInputElement, event: Event) {
  const maxWidth = input.dataset.maxWidth ? parseInt(input.dataset.maxWidth) : 500;
  const maxHeight = input.dataset.maxHeight ? parseInt(input.dataset.maxHeight) : 500;
  const quality = input.dataset.quality ? parseInt(input.dataset.quality) : 90;
  const format = input.dataset.format ? input.dataset.format : 'webp';
  const fit = input.dataset.fit ? input.dataset.fit : 'fit';
  const preview = input.dataset.preview;
  const previewElement = preview ? document.querySelector(preview) as HTMLImageElement : null;
  const reader = new FileReader();
  reader.onload = event => {
    Promise.all([
      load(event.target!.result as string)
    ]).then(images => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d')!;
      if (fit === 'fit') {
        const originalWidth = images[0].width;
        const originalHeight = images[0].height;
        // fit the image in the maxWidth and maxHeight
        let imageWidth = originalWidth;
        let imageHeight = originalHeight;
        if (originalWidth > maxWidth) {
          imageWidth = maxWidth;
          imageHeight = originalHeight * maxWidth / originalWidth;
        }
        if (imageHeight > maxHeight) {
          imageHeight = maxHeight;
          imageWidth = originalWidth * maxHeight / originalHeight;
        }
        canvas.width = imageWidth;
        canvas.height = imageHeight;
        context.drawImage(images[0], 0, 0, imageWidth, imageHeight);
      } else {
        canvas.width = maxWidth;
        canvas.height = maxHeight;
        // let the image fill the maxWidth and maxHeight and crop the rest
        const ratio = Math.max(maxWidth / images[0].width, maxHeight / images[0].height);
        const newWidth = images[0].width * ratio;
        const newHeight = images[0].height * ratio;
        const offsetX = (newWidth - maxWidth) / 2;
        const offsetY = (newHeight - maxHeight) / 2;
        context.drawImage(images[0], -offsetX, -offsetY, newWidth, newHeight);
      }
      // convert the canvas to a blob
      function processBlob(blob: Blob) {
        if (previewElement) {
          const url = URL.createObjectURL(blob);
          previewElement.src = url;
        }
        // create a new file from the blob
        const file = new File([blob], 'image.' + blob.type?.replace('image/', '') || 'jpg', {
          type: blob.type,
          lastModified: Date.now()
        });
        // replace the file in the input
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input.files = dataTransfer.files;
      }
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error('Failed to create blob for image');
        }
        // fallback to jpeg if we requested webp and got a png
        if (blob.type === 'image/png' && format === 'webp') {
          canvas.toBlob((blob) => {
            if (!blob) {
              throw new Error('Failed to create blob for image');
            }
            processBlob(blob);
          }, 'image/jpeg', quality / 100);
        }
        processBlob(blob);
      }, `image/${format}`, quality / 100);
    })
  }

  reader.readAsDataURL(input.files![0]);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input[data-format], input[data-max-width], input[data-max-height], input[data-quality]').forEach((input) => {
    input.addEventListener('change', (event) => {
      onChangeImage(input as HTMLInputElement, event);
    });
  });
});

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      // check if the added node is an input
      if (mutation.addedNodes[0].nodeName === 'INPUT') {
        const input = mutation.addedNodes[0] as HTMLInputElement;
        if (input.dataset.format || input.dataset.maxWidth || input.dataset.maxHeight || input.dataset.quality) {
          input.addEventListener('change', (event) => {
            onChangeImage(input, event);
          });
        }
      }
    }
  });
});