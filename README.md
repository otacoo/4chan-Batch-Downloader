# 4chan-Multi-Image-Downloader ![icon48](https://github.com/user-attachments/assets/b53cb537-c3d6-48a9-bdef-d71433f34228)

Batch download images and videos from 4chan with ease.  
Select images by ALT+CLICK (or your chosen modifier), then download them all at once with a single click.


## Features

- **Batch select images** by modifier+click (configurable: Alt, Ctrl, Shift, Meta).
- **Download selected images**:
  - Instantly
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

1. Download `4chan-multi-image-downloader-chrome.zip` from [Releases](https://github.com/otacoo/4chan-Batch-Downloader/releases/latest) or the `dist` folder
2. Drag & drop the zip into the Extensions page to install

Alternatively,

2. Unzip the file and press `Load unpacked` then browse to the unzipped folder

### Firefox

`¯\_(ツ)_/¯` Wait for the addon to be approved...

1. Download `4chan-multi-image-downloader-firefox.zip` from [Releases](https://github.com/otacoo/4chan-Batch-Downloader/releases/latest) or the `dist` folder
2. Go into Firefox's Addons page, click the gear icon and select Debug Addons or browse to `about:debugging`
3. Select `This Firefox` on the left
4. Click `Load Temporary Addon...` and browse to the zip file


## Usage

1. **Go to a 4chan thread**
2. **ALT+CLICK** (or your configured modifier) on image thumbnails to select/unselect them.
3. When images are selected, floating download buttons will appear:
   - **Download Selected Images**: Download each file (with dialog).
   - **Download All (No Dialog)**: Download each file directly (no dialog, see note below).
   - **Download as ZIP**: Download all as a single ZIP archive.
5. **Cancel**: While downloading, the button turns red and can be clicked to cancel.
6. **Options**: Click the extension icon and choose "Options" to configure all settings.


## Troubleshooting

**No dialog download prompts for every file:**

Disable "Ask where to save each file before downloading" in your browser’s settings.

**Original filenames not used:**

Make sure the option is enabled in the Options page.


## Credits

- [JSZip](https://stuk.github.io/jszip/) for ZIP functionality.
- 4chan


## Contributing

Pull requests and suggestions are welcome!
