# 4chan-Batch-Downloader ![icon48](https://github.com/user-attachments/assets/b53cb537-c3d6-48a9-bdef-d71433f34228)

Browser addon to batch download images and videos from 4chan with ease.  
Select images by ALT+CLICK (or your chosen modifier), then download them all at once with a single click.

Need a userscript instead?
Check out: [@3nly's](https://gist.github.com/3nly/907b94181d75a39c5effb622266360df) userscript


## Features

- **Batch select images:**
  - Modifier (configurable: <kbd>Alt</kbd>, <kbd>Ctrl</kbd>, <kbd>Shift</kbd>, <kbd>Meta</kbd>) + Click
- **Download selected images:**
  - Instantly
  - Individually (with Save as... dialog)
  - As a ZIP archive
  
- **Download with original filenames**
- **Per-board and default download folders**
- **Download throttling:**
  - Sets a threshold and timeout to avoid rate limits (recommended)
- **Customizable button position:**
  - Top Right, Middle, Bottom Right
- **Cancel downloads in progress**
- **Options page**
- **Cross-browser:**
  - Chrome (Manifest V3) and Firefox supported

## Installation

### Chrome

1. Download `4chan-batch-downloader-chrome.zip` from [Releases](https://github.com/otacoo/4chan-Batch-Downloader/releases/latest)
2. Drag & drop the zip into the Extensions page to install

Alternatively,

2. Unzip the file and press `Load unpacked` then browse to the unzipped folder

### Firefox

1. Download the signed `4chan-batch-downloader-firefox.xpi` from [Releases](https://github.com/otacoo/4chan-Batch-Downloader/releases/latest)
2. Go into Firefox's Addons page
3. Drag & drop the `.xpi` file to install

## Usage

1. Browse to any 4chan thread
2. Press <kbd>Alt</kbd> (or your configured modifier key) + `Click` to select images
3. Press any of the buttons to download

## Troubleshooting

**No dialog download prompts for every file:**

You must disable `Ask where to save each file before downloading` in your browser’s settings.

**Original filenames not used:**

Make sure the option is enabled in the Options page.


## Credits
- Inspired by @3nly in (https://github.com/3nly/StyleChan/issues/17#issuecomment-2890742407)
- [JSZip](https://stuk.github.io/jszip/) for ZIP functionality.
- 4chan


## Contributing

Pull requests and suggestions are welcome!

