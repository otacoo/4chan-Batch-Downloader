# 4chan-Multi-Image-Downloader

Batch download images and videos from 4chan with ease.  
Select images by ALT+CLICK (or your chosen modifier), then download them all at once with a single click.


## Features

- **Batch select images** by modifier+click (configurable: Alt, Ctrl, Shift, Meta).
- **Download selected images**:
  - Individually (with or without dialog)
  - As a ZIP archive
- **Download with original filenames** (if available)
- **Per-board and default download folders**
- **Download throttling** (set threshold and timeout to avoid rate limits)
- **Customizable button position**
- **Cancel downloads in progress**
- **Options page** for all settings
- **Cross-browser:** Chrome (Manifest V3) and Firefox supported

## Installation

### Chrome

#### TODO

### Firefox

#### TODO

## Usage

1. **Go to a 4chan thread** (or compatible imageboard).
2. **ALT+CLICK** (or your configured modifier) on image thumbnails to select/unselect them.
3. When images are selected, floating download buttons will appear:
   - **Download Selected Images**: Download each file (with dialog).
   - **Download All (No Dialog)**: Download each file directly (no dialog, see note below).
   - **Download as ZIP**: Download all as a single ZIP archive.
4. **Cancel**: While downloading, the button turns red and can be clicked to cancel.
5. **Options**: Click the extension icon and choose "Options" to configure all settings.


## Development

### Build

- **Chrome:** `npm run build:chrome`
- **Firefox:** `npm run build:firefox`
- **Both:** `npm run build`

## Troubleshooting

- **No dialog download prompts for every file:**  
  Disable "Ask where to save each file before downloading" in your browser’s settings.
- **Original filenames not used:**  
  Make sure the option is enabled in the Options page.


## License

MIT License


## Credits

- [JSZip](https://stuk.github.io/jszip/) for ZIP functionality.
- 4chan and other imageboards for their open APIs and HTML structure.


## Contributing

Pull requests and suggestions are welcome!