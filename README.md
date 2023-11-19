## File Input Image Resize

Automatically resize images input by users before forms are submitted!
No javascript code to write, no server processing, easy peasy!

### Usage

1. Reference the CDN script

```html
<script src="https://cdn.jsdelivr.net/gh/benkaiser/fileinput-image-resize@1.0.0/dist/bundle.js"></script>
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
| data-quality | The quality of the image (0-100), only applies to webp and jpeg | 90 |
| data-format | The format of the image (webp, jpeg, png) | webp |
| data-fit | If an image should be resized to fit (preserve aspect ratio) or to crop (to fill exact max dimensions, chopping off the overflow) | fit |
| data-preview | The query selector of an image element to preview the image before submission | null |

### Notes

- If the browser does not support the format, it will default to jpeg (since it is supported by all browsers)
- You will need to server-side validate (i.e. reject if the image does not meet your requirements) the image as well, since the user can bypass the client-side validation by disabling javascript

### Development

1. Clone the repo
2. Run `npm install`
3. Run `npm run dev` to run esbuild in watch mode (building the library)
4. Run the demo server in a separate terminal with `npm run demo`, visit http://localhost:8777/ in your browser to test out an upload.

### License

MIT
