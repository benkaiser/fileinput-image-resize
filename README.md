## File Input Image Resize

Automatically resize images input by users before forms are submitted!
No javascript code to write, no server processing, easy peasy!

### Usage

1. Reference the CDN script

```html
<script src="https://cdn.jsdelivr.net/gh/benkaiser/file-input-image-resize/dist/bundle.min.js"></script>
```

2. Add a couple attributes to a form image input

```html
<input type="file" data-max-width="500" data-max-height="500" data-quality="90" data-format="webp" />
```

3. That's it! Your file will be submitted to the server with the correct format, quality, and size!

### Options

| Attribute | Description | Default |
| --------- | ----------- | ------- |
| data-max-width | The maximum width of the image | 500 |
| data-max-height | The maximum height of the image | 500 |
| data-quality | The quality of the image (0-100), only applies to webp and jpeg | 80 |
| data-format | The format of the image (webp, jpeg, png) | webp |
| data-fit | If an image should be resized to fit (preserve aspect ratio) or to crop (to fill exact max dimensions) | fit |
| data-preview | The query selector of an image element to preview the image before submission | null |

### Notes

- If the browser does not support the format, it will default to jpeg (since it is supported by all browsers)
- You will need to server-side validate (i.e. reject if the image does not meet your requirements) the image as well, since the user can bypass the client-side validation by disabling javascript
- The image will be resized to fit within the max width and height, while maintaining the aspect ratio. For example, if the image is 1000x1000 and the max width and height are 500, the image will be resized to 500x500. If the image is 1000x500 and the max width and height are 500, the image will be resized to 500x250.

### Development

1. Clone the repo
2. Run `npm install`
3. Run `npm run dev` to run the server in dev mode
4. Open the demo page by dragging `demo/index.html` into your browser

### License

MIT
